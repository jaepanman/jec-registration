import React, { useState } from 'react';
import { 
  RegistrationFormData, 
  StudentData, 
  Location, 
  LessonType, 
  Course, 
  PhotoPrivacy,
  SignupType
} from './types';
import SignupTypeForm from './components/SignupTypeForm';
import GuardianForm from './components/GuardianForm';
import StudentPreferenceForm from './components/StudentPreferenceForm';
import ConsentForm from './components/ConsentForm';
import ReviewForm from './components/ReviewForm';
import StepIndicator from './components/StepIndicator';

const GOOGLE_SCRIPT_URL = (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL || '';
const SECURITY_TOKEN = 'jec_secure_2024_access';

const INITIAL_FORM_DATA: RegistrationFormData = {
  lastNameKanji: '',
  firstNameKanji: '',
  lastNameFurigana: '',
  firstNameFurigana: '',
  phoneNumber: '',
  email: '',
  students: [{
    id: crypto.randomUUID(),
    lastNameKanji: '',
    firstNameKanji: '',
    lastNameFurigana: '',
    firstNameFurigana: '',
    isSelf: false,
    schedule: {}
  }],
  photoPrivacy: PhotoPrivacy.VISIBLE,
  agreedToTerms: false
};

// Centralized Fee Calculation with updated logic: Late fee starts March 2nd.
export const calculateBaseFee = (formData: RegistrationFormData) => {
  const today = new Date();
  const month = today.getMonth(); // 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr...
  const date = today.getDate();

  let amount = 0;
  let name = '';
  let note = '';
  let deadline = '';

  // 1. Determine Payment Deadline
  // If Jan(0), Feb(1), or Mar(2) -> March 31st. Otherwise -> 20th of month before lessons.
  if (month <= 2) {
    deadline = '3月31日';
  } else {
    deadline = '受講開始月の前月20日';
  }

  if (formData.signupType === SignupType.NEW) {
    // NEW REGISTRATION
    name = '初回入会金';
    amount = 5000;
    const siblingCount = formData.students.length;
    if (siblingCount > 1) {
      amount += (siblingCount - 1) * 3000;
      note = `(ご兄弟割引適用: 1人目¥5,000 + 2人目以降各¥3,000)`;
    } else {
      note = month >= 11 || month <= 2 
        ? '※12月以降の入会につき減額対象となる場合があります。' 
        : '※4月更新時に別途更新料が発生します。';
    }
  } else {
    // CONTINUING REGISTRATION
    if (month >= 3) {
      // April 1st or later: Becomes New Registration / Re-enrollment Fee
      name = '再入会金';
      amount = 5000 * formData.students.length;
      note = '※3月31日を過ぎたため、再入会（新規扱い）となります。';
    } else if (month === 2 && date >= 2) {
      // March 2nd to March 31st: Late Fee (+1,000)
      name = '更新料 (遅延手数料込)';
      const standard = formData.location === Location.KUKI ? 1000 : 2500;
      amount = (standard + 1000) * formData.students.length;
      note = '※3月1日の締切を過ぎたため、遅延手数料(1,000円/名)が加算されています。';
    } else {
      // Jan, Feb, or March 1st: Standard / Early Renewal
      name = '更新料';
      const standard = formData.location === Location.KUKI ? 1000 : 2500;
      amount = standard * formData.students.length;
      note = formData.location === Location.KUKI ? '※更新価格です。' : '※通常更新価格です。';
    }
  }

  return { name, amount, note, deadline };
};

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentPrefIndex, setStudentPrefIndex] = useState(0);

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateStudentData = (index: number, updates: Partial<StudentData>) => {
    const newStudents = [...formData.students];
    newStudents[index] = { ...newStudents[index], ...updates };
    setFormData(prev => ({ ...prev, students: newStudents }));
  };

  const handleNext = () => {
    if (step === 3) {
      if (studentPrefIndex < formData.students.length - 1) {
        setStudentPrefIndex(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        setStep(4);
        window.scrollTo(0, 0);
      }
    } else {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      if (studentPrefIndex > 0) {
        setStudentPrefIndex(prev => prev - 1);
        window.scrollTo(0, 0);
      } else {
        setStep(2);
        window.scrollTo(0, 0);
      }
    } else {
      setStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!GOOGLE_SCRIPT_URL) {
      alert('Error: Please configure the Google Script URL.');
      return;
    }

    setIsSubmitting(true);
    try {
      const feeInfo = calculateBaseFee(formData);
      
      const transformedStudents = formData.students.map(s => ({
        ...s,
        lastNameFurigana: s.lastNameFurigana || '',
        firstNameFurigana: s.firstNameFurigana || '',
        yearsStudied: s.yearsStudied || '-',
        lastYearLevel: s.lastYearLevel || '-',
        monday: (s.schedule['月'] || []).join(', '),
        tuesday: (s.schedule['火'] || []).join(', '),
        wednesday: (s.schedule['水'] || []).join(', '),
        thursday: (s.schedule['木'] || []).join(', '),
        friday: (s.schedule['金'] || []).join(', '),
        saturday: (s.schedule['土'] || []).join(', ')
      }));

      const payload = {
        ...formData,
        lastNameFurigana: formData.lastNameFurigana,
        firstNameFurigana: formData.firstNameFurigana,
        referralName: formData.referralName || '-',
        students: transformedStudents,
        totalFee: feeInfo.amount,
        token: SECURITY_TOKEN
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission error:', error);
      alert('送信中にエラーが発生しました。インターネット接続を確認し、もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-12 text-center space-y-10">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800">お申し込みが完了しました</h2>
          <div className="p-8 bg-blue-50 rounded-[2rem] space-y-4 border border-blue-100">
            <p className="font-bold text-blue-800">公式LINEの追加をお願いします</p>
            <p className="text-sm text-blue-600 mb-4">体験レッスンの日程調整などは公式LINEで行います。</p>
            <a href="https://lin.ee/F09wgIN" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 bg-[#06C755] text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-lg">
              公式LINEを追加する
            </a>
          </div>
          <button onClick={() => window.location.reload()} className="text-slate-400 font-bold underline hover:text-slate-600">
            トップへ戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-black text-3xl tracking-tighter">
              <span className="text-[#98D8AA]">J</span><span className="text-[#FFCC00]">E</span><span className="text-[#F37335]">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">JEC英語教室</h1>
              <p className="text-slate-400 text-sm font-bold uppercase">Online Enrollment</p>
            </div>
          </div>
          <StepIndicator currentStep={step} />
        </header>

        <main className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          {step === 1 && <SignupTypeForm formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
          {step === 2 && <GuardianForm formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && (
            <StudentPreferenceForm
              key={formData.students[studentPrefIndex].id}
              student={formData.students[studentPrefIndex]}
              studentIndex={studentPrefIndex}
              totalStudents={formData.students.length}
              globalLocation={formData.location}
              onUpdate={(updates) => updateStudentData(studentPrefIndex, updates)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && <ConsentForm formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />}
          {step === 5 && <ReviewForm formData={formData} onBack={handleBack} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </main>
      </div>
    </div>
  );
};

export default App;