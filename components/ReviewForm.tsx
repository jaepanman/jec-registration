import React from 'react';
import { RegistrationFormData, SignupType, Location, Course } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { calculateBaseFee } from '../App';

interface ReviewFormProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onSubmit, isSubmitting }) => {
  const feeInfo = calculateBaseFee(formData);

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">入力内容の最終確認</h2>
        <p className="text-slate-500">お申し込み内容にお間違いがないか、今一度ご確認ください。</p>
      </div>

      <div className="space-y-8 divide-y divide-slate-100">
        <section className="pt-4 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-slate-800 rounded-full" />
            <span>お申し込み種別・教室</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm bg-white p-6 rounded-2xl border border-slate-100">
            <div><p className="text-slate-400 mb-1">希望教室</p><p className="font-bold text-blue-600">{formData.location}</p></div>
            <div><p className="text-slate-400 mb-1">お申し込みの種類</p><p className="font-bold text-slate-700">{formData.signupType === SignupType.NEW ? '新規入会' : '継続受講'}</p></div>
          </div>
        </section>

        <section className="pt-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <span>初期費用見積り (概算)</span>
          </h3>
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <div className="space-y-1">
                <p className="text-lg font-bold">{feeInfo.name}</p>
                <p className="text-xs text-slate-400 leading-relaxed max-w-md">{feeInfo.note}</p>
              </div>
              <p className="text-2xl font-black">¥{feeInfo.amount.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">合計 (初期登録料)</p>
              <p className="text-4xl font-black text-blue-400">¥{feeInfo.amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl space-y-4">
            <h4 className="font-black text-blue-800 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>お支払いについてのお願い</span>
            </h4>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p className="font-bold">
                上記のお支払い合計金額を、本フォーム送信後
                <span className="text-red-600 underline decoration-2 mx-1 px-1 font-black bg-white rounded">
                  {feeInfo.deadline}まで
                </span>
                に以下の口座へお振込みください。
              </p>
              
              <div className="bg-white p-4 rounded-xl border border-blue-100 text-xs shadow-inner">
                <p className="font-bold mb-2 text-blue-600">【振込先情報】</p>
                <div className="grid grid-cols-[80px_1fr] gap-y-1">
                  <span className="text-slate-400">銀行名:</span> <span className="font-bold">埼玉りそな銀行</span>
                  <span className="text-slate-400">支店名:</span> <span className="font-bold">久喜支店</span>
                  <span className="text-slate-400">口座種別:</span> <span className="font-bold">普通</span>
                  <span className="text-slate-400">口座番号:</span> <span className="font-bold">5900502</span>
                  <span className="text-slate-400">口座名義:</span> <span className="font-bold">ジェイイーシーエイゴ イーマンジェシーアレン</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">※振込手数料はお客様負担となります。お振込みの際は、生徒様のお名前（ご兄弟の場合はお一人のお名前で可）でお願いいたします。</p>
            </div>
          </div>
        </section>

        {formData.students.map((student, idx) => (
          <section key={student.id} className="pt-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
              <span>受講者 {idx + 1}: {student.isSelf ? '保護者本人' : `${student.lastNameKanji} ${student.firstNameKanji}`}</span>
            </h3>
            <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><p className="text-slate-400 mb-1">学年</p><p className="font-bold">{student.grade}</p></div>
                <div><p className="text-slate-400 mb-1">学校名</p><p className="font-bold">{student.schoolName}</p></div>
                <div><p className="text-slate-400 mb-1">形式</p><p className="font-bold">{student.lessonType}</p></div>
                <div><p className="text-slate-400 mb-1">コース</p><p className="font-bold text-blue-600">{student.course} {student.eikenLevel && `(${student.eikenLevel})`}</p></div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">スケジュール</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {DAYS_OF_WEEK.map(day => {
                    const times = student.schedule[day] || [];
                    return (
                      <div key={day} className={`p-3 rounded-xl border ${times.length > 0 ? 'bg-white border-blue-100' : 'bg-slate-100/50'}`}>
                        <p className={`text-[10px] font-bold mb-1 ${times.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>{day}曜</p>
                        <p className="text-[11px] font-medium">{times.length > 0 ? times.join(', ') : '×'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={onBack} className="w-full sm:w-auto px-12 py-4 text-slate-500 font-bold border border-slate-200 rounded-2xl" disabled={isSubmitting}>戻る</button>
        <button onClick={onSubmit} disabled={isSubmitting} className={`w-full sm:w-auto px-20 py-4 rounded-2xl font-bold transition-all shadow-xl ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {isSubmitting ? '送信中...' : '内容を確認して送信する'}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;