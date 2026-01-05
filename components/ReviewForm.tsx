import React, { useState } from 'react';
import { RegistrationFormData, SignupType, Location, Course } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { calculateFeeSummary } from '../App';

interface ReviewFormProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onSubmit, isSubmitting }) => {
  const summary = calculateFeeSummary(formData);
  const [feeAgreed, setFeeAgreed] = useState(false);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div><p className="text-slate-400 mb-1">希望教室</p><p className="font-bold text-blue-600">{formData.location}</p></div>
            <div><p className="text-slate-400 mb-1">お申し込みの種類</p><p className="font-bold text-slate-700">{formData.signupType === SignupType.NEW ? '新規入会' : '継続受講'}</p></div>
          </div>
        </section>

        <section className="pt-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <span>初期費用内訳 (登録料)</span>
          </h3>
          
          <div className="bg-slate-900 text-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-800">
            <div className="px-8 py-6 bg-slate-800/50 border-b border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Mini Invoice</h4>
            </div>
            
            <div className="p-8 space-y-4">
              {summary.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-blue-400">{item.studentName}</p>
                    <p className="text-xs text-slate-400">{item.label}</p>
                  </div>
                  <p className="text-sm font-black whitespace-nowrap">¥{item.amount.toLocaleString()}</p>
                </div>
              ))}

              <div className="pt-6 border-t border-slate-800 flex justify-between items-baseline">
                <p className="text-xs font-bold text-slate-500 uppercase">Total Amount</p>
                <p className="text-3xl font-black text-white">¥{summary.totalAmount.toLocaleString()}</p>
              </div>
              
              {summary.globalNote && (
                <p className="text-[10px] text-slate-500 leading-relaxed italic pt-2">
                  {summary.globalNote}
                </p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-3xl space-y-6">
            <h4 className="font-black text-blue-800 flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>お支払いのご案内</span>
            </h4>
            
            <div className="space-y-4 text-sm text-slate-700">
              <p className="font-bold leading-relaxed">
                上記の合計金額を、<span className="text-red-600 underline decoration-2 font-black bg-white px-1 rounded">{summary.deadline}まで</span>に以下の口座へお振込みください。
              </p>
              
              <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-inner">
                <div className="grid grid-cols-[90px_1fr] gap-y-2 text-xs">
                  <span className="text-slate-400">銀行名:</span> <span className="font-bold">埼玉りそな銀行</span>
                  <span className="text-slate-400">支店名:</span> <span className="font-bold">久喜支店</span>
                  <span className="text-slate-400">口座種別:</span> <span className="font-bold">普通</span>
                  <span className="text-slate-400">口座番号:</span> <span className="font-bold">5900502</span>
                  <span className="text-slate-400">口座名義:</span> <span className="font-bold">ジェイイーシーエイゴ イーマンジェシーアレン</span>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-500 italic">
                ※振込手数料はお客様負担となります。お振込みの際は、生徒様のお名前（ご兄弟の場合はお一人のお名前で可）でお願いいたします。
              </p>

              <label className="flex items-start space-x-3 p-4 bg-white rounded-xl border-2 border-blue-600/20 cursor-pointer hover:border-blue-600 transition-all group">
                <input 
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={feeAgreed}
                  onChange={(e) => setFeeAgreed(e.target.checked)}
                />
                <span className="font-bold text-slate-800 text-sm leading-tight">
                  初期費用およびお振込み期限、振込先情報を確認しました。期限までに指定口座へお振込みすることを同意します。
                </span>
              </label>
            </div>
          </div>
        </section>

        {formData.students.map((student, idx) => (
          <section key={student.id} className="pt-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
              <span>受講者 {idx + 1}: {student.isSelf ? '保護者本人' : `${student.lastNameKanji} ${student.firstNameKanji}`}</span>
            </h3>
            <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><p className="text-slate-400 mb-1">学年</p><p className="font-bold">{student.grade}</p></div>
                <div><p className="text-slate-400 mb-1">学校名</p><p className="font-bold">{student.schoolName}</p></div>
                <div><p className="text-slate-400 mb-1">形式</p><p className="font-bold">{student.lessonType}</p></div>
                <div><p className="text-slate-400 mb-1">コース</p><p className="font-bold text-blue-600">{student.course} {student.eikenLevel && `(${student.eikenLevel})`}</p></div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">スケジュール希望</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {DAYS_OF_WEEK.map(day => {
                    const times = student.schedule[day] || [];
                    return (
                      <div key={day} className={`p-3 rounded-xl border ${times.length > 0 ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-100/50'}`}>
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
        <button onClick={onBack} className="w-full sm:w-auto px-12 py-4 text-slate-500 font-bold border border-slate-200 rounded-2xl hover:bg-white transition-colors" disabled={isSubmitting}>戻る</button>
        <button 
          onClick={onSubmit} 
          disabled={isSubmitting || !feeAgreed} 
          className={`w-full sm:w-auto px-20 py-4 rounded-2xl font-bold transition-all shadow-xl ${isSubmitting || !feeAgreed ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'}`}
        >
          {isSubmitting ? '送信中...' : '内容を確認して送信する'}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;