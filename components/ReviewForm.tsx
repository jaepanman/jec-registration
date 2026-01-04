
import React from 'react';
import { RegistrationFormData, SignupType, Location, Course } from '../types';
import { DAYS_OF_WEEK } from '../constants';

interface ReviewFormProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onSubmit, isSubmitting }) => {
  
  const calculateBaseFee = () => {
    const today = new Date();
    const month = today.getMonth(); // 0 = Jan, 11 = Dec
    const date = today.getDate();
    const isAfterDec = month === 11 || (month >= 0 && month <= 2); // Dec, Jan, Feb, Mar

    if (formData.signupType === SignupType.NEW) {
      let amount = 5000;
      let discountNote = '';
      
      // Sibling discount for simultaneous sign-up
      if (formData.students.length > 1) {
        discountNote = ' (同時入会によるご兄弟割引 ¥2,000 適用)';
        amount = 5000 - 2000;
      }

      return { 
        name: '初回入会金' + discountNote, 
        amount: amount, 
        note: isAfterDec ? '※12月以降の入会につき1,000円に減額対象となる場合がありますが、詳細は教室にご確認ください。4月更新時に正規の更新料が発生します。' : '※4月更新時に別途更新料が発生します。' 
      };
    } else {
      // Continuing
      if (formData.location === Location.KUKI) {
        if (month === 2 && date >= 1) { // After Mar 1 but before Apr 1
           return { name: '更新料 (遅延登録料込)', amount: 2000, note: '※3月1日以降の登録のため、遅延手数料1,000円が加算されています。' };
        } else if (month >= 3) { // Apr 1 or later
           return { name: '再入会金', amount: 5000, note: '※4月1日以降の申請のため、新規入会扱いとなります。' };
        }
        return { name: '更新料', amount: 1000, note: '※3月1日までの早期更新価格です。' };
      } else {
        // Koshigaya
        if (month === 2 && date >= 1) {
           return { name: '更新料 (遅延登録料込)', amount: 3500, note: '※3月1日以降の登録のため、遅延手数料1,000円が加算されています。' };
        } else if (month >= 3) {
           return { name: '再入会金', amount: 5000, note: '※4月1日以降の申請のため、新規入会扱いとなります。' };
        }
        return { name: '更新料', amount: 2500, note: '※3月1日までの更新価格です。' };
      }
    }
  };

  const feeInfo = calculateBaseFee();

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-2 text-center md:text-left">
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
            <div>
              <p className="text-slate-400 mb-1">希望教室</p>
              <p className="font-bold text-blue-600 text-base">{formData.location}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">お申し込みの種類</p>
              <p className="font-bold text-slate-700 text-base">{formData.signupType === SignupType.NEW ? '新規入会' : '継続受講'}</p>
            </div>
            {formData.referralName && (
              <div className="sm:col-span-2">
                <p className="text-slate-400 mb-1">ご紹介者様</p>
                <p className="font-bold text-amber-600 text-base">{formData.referralName}</p>
              </div>
            )}
          </div>
        </section>

        <section className="pt-8 space-y-4">
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
            <div className="flex justify-between items-end">
              <p className="text-sm text-slate-400 italic">※初月月謝・管理費・教材費は別途ご請求となります。</p>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">合計 (初期登録料)</p>
                <p className="text-4xl font-black text-blue-400">¥{feeInfo.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <span>保護者（代表者）情報</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div>
              <p className="text-slate-400 mb-1">お名前（漢字）</p>
              <p className="font-bold text-slate-700 text-base">{formData.lastNameKanji} {formData.firstNameKanji}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">お名前（ふりがな）</p>
              <p className="font-bold text-slate-700 text-base">{formData.lastNameFurigana} {formData.firstNameFurigana}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">電話番号</p>
              <p className="font-bold text-slate-700 text-base">{formData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">メールアドレス</p>
              <p className="font-bold text-slate-700 text-base">{formData.email}</p>
            </div>
          </div>
        </section>

        {formData.students.map((student, idx) => (
          <section key={student.id} className="pt-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
              <span>受講者 {idx + 1}: {student.isSelf ? '保護者本人' : `${student.lastNameKanji} ${student.firstNameKanji}`}</span>
            </h3>
            <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">学年</p>
                  <p className="font-bold text-slate-700">{student.grade}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">学校名</p>
                  <p className="font-bold text-slate-700">{student.schoolName}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">{formData.signupType === SignupType.NEW ? '英語学習歴' : '昨年度レベル / 学習歴'}</p>
                  <p className="font-bold text-slate-700">{formData.signupType === SignupType.NEW ? student.yearsStudied : student.lastYearLevel}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-4 border-t border-slate-200">
                <div>
                  <p className="text-slate-400 mb-1">受講形式</p>
                  <p className="font-bold text-slate-700">{student.lessonType}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">希望コース</p>
                  <p className="font-bold text-blue-600">
                    {student.course}
                    {student.course === Course.EIKEN && student.eikenLevel && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-black">
                        {student.eikenLevel}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">通学可能スケジュール</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {DAYS_OF_WEEK.map(day => {
                    const times = student.schedule[day] || [];
                    const hasSaturdaySurcharge = day === '土' && times.length > 0;
                    return (
                      <div key={day} className={`p-3 rounded-xl border ${times.length > 0 ? 'bg-white border-blue-100' : 'bg-slate-100/50 border-slate-100'}`}>
                        <p className={`text-xs font-bold mb-1 ${times.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>{day}曜日</p>
                        <div className="space-y-1">
                          {times.length > 0 ? (
                            times.map(t => <p key={t} className="text-[11px] font-medium text-slate-600 leading-none">{t}</p>)
                          ) : (
                            <p className="text-[11px] text-slate-300">×</p>
                          )}
                        </div>
                        {hasSaturdaySurcharge && (
                          <div className="mt-2 pt-1 border-t border-amber-100">
                            <p className="text-[8px] font-black text-amber-600 leading-tight">別途 1,500円<br/>追加料金</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="pt-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-slate-400 rounded-full" />
            <span>同意事項</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="sm:col-span-2">
              <p className="text-slate-400 mb-1">掲載ポリシー</p>
              <p className="font-bold text-slate-700">{formData.photoPrivacy}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="w-full sm:w-auto px-12 py-4 text-slate-500 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"
          disabled={isSubmitting}
        >
          内容を修正する
        </button>
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-20 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center min-w-[240px] ${isSubmitting ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {isSubmitting ? '送信中...' : 'お申し込みを確定する'}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
