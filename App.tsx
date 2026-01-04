
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

/**
 * Configuration
 * Vite requires environment variables to be prefixed with VITE_ to be exposed to the client.
 */
// Fix: Use process.env to access environment variables instead of import.meta.env to resolve TypeScript 'ImportMeta' missing 'env' property error.
const GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || '';
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
      alert('エラー: Google Apps ScriptのURLが設定されていません。Vercelの環境変数に VITE_GOOGLE_SCRIPT_URL を追加してください。');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
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
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-12 text-center space-y-10">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-800">お申し込みが完了しました</h2>
            <p className="text-slate-500 font-medium">担当者が内容を確認し、3営業日以内にご連絡いたします。</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 space-y-6">
            <p className="text-blue-800 font-black text-xl">公式LINEへのご登録</p>
            <p className="text-sm text-blue-700">体験レッスンのご案内は、公式LINEを通じて行います。下のボタンより追加をお願いいたします。</p>
            <a href="https://lin.ee/F09wgIN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 px-10 py-5 bg-[#06C755] text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">
              <span>公式LINEを追加する</span>
            </a>
          </div>
          <button onClick={() => window.location.reload()} className="text-slate-400 font-bold hover:text-slate-600 underline">
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
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <div className="font-black text-3xl tracking-tighter flex items-center">
                <span className="text-[#98D8AA]">J</span>
                <span className="text-[#FFCC00]">E</span>
                <span className="text-[#F37335]">C</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">JEC英語教室</h1>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Online Enrollment</p>
            </div>
          </div>
          <StepIndicator currentStep={step} />
        </header>

        <main className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          {step === 1 && <SignupTypeForm formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
          {step === 2 && <GuardianForm formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && (
            <StudentPreferenceForm
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
        
        <footer className="text-center text-slate-300 text-xs py-10 italic">
          © {new Date().getFullYear()} JEC英語教室.
        </footer>
      </div>
    </div>
  );
};

export default App;
