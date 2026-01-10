import React from 'react';
import { RegistrationFormData, SignupType, Location } from '../types';

interface SignupTypeFormProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
  onNext: () => void;
}

const START_MONTHS = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

const SignupTypeForm: React.FC<SignupTypeFormProps> = ({ formData, updateFormData, onNext }) => {
  const isFormValid = !!formData.location && !!formData.signupType && (formData.signupType === SignupType.CONTINUING || !!formData.desiredStartMonth);

  return (
    <div className="p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* English Translation Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl shadow-sm">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <div>
            <h4 className="text-blue-800 font-bold text-lg mb-1">For English Users</h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              If you need to view this form in English, please use your browser's built-in translation feature. 
              (e.g., In Google Chrome, right-click anywhere on the page and select <strong>"Translate to English"</strong>).
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-slate-800">JEC英語教室へようこそ</h2>
        <p className="text-slate-500">教室とお申し込みの種類を選択してください。</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">1. 教室を選択 (Location)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(Location).map((loc) => (
            <button
              key={loc}
              onClick={() => updateFormData({ location: loc })}
              className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
                formData.location === loc
                  ? 'border-blue-600 bg-blue-50 shadow-xl ring-4 ring-blue-100'
                  : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`font-bold text-lg ${formData.location === loc ? 'text-blue-800' : 'text-slate-800'}`}>{loc}</div>
                {formData.location === loc && (
                  <div className="bg-blue-600 text-white rounded-full p-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500">{loc === Location.KUKI ? '月〜土 受付中' : '木曜日のみ受付中'}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">2. 種別を選択 (Type)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => updateFormData({ signupType: SignupType.NEW })}
            className={`relative p-8 rounded-3xl border-2 text-left transition-all duration-300 group ${
              formData.signupType === SignupType.NEW
                ? 'border-blue-600 bg-blue-50 shadow-xl ring-4 ring-blue-100'
                : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl transition-colors ${formData.signupType === SignupType.NEW ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500'}`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              {formData.signupType === SignupType.NEW && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className={`text-xl font-bold transition-colors ${formData.signupType === SignupType.NEW ? 'text-blue-800' : 'text-slate-800'}`}>
              新規入会 (New Sign up)
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              初めて当教室にお申し込みされる方はこちらを選択してください。
            </p>
          </button>

          <button
            onClick={() => updateFormData({ signupType: SignupType.CONTINUING, referralName: '', desiredStartMonth: undefined })}
            className={`relative p-8 rounded-3xl border-2 text-left transition-all duration-300 group ${
              formData.signupType === SignupType.CONTINUING
                ? 'border-green-600 bg-green-50 shadow-xl ring-4 ring-green-100'
                : 'border-slate-100 bg-white hover:border-green-200 hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl transition-colors ${formData.signupType === SignupType.CONTINUING ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-green-100 group-hover:text-green-500'}`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              {formData.signupType === SignupType.CONTINUING && (
                <div className="bg-green-600 text-white rounded-full p-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className={`text-xl font-bold transition-colors ${formData.signupType === SignupType.CONTINUING ? 'text-green-800' : 'text-slate-800'}`}>
              継続受講 (Continuing)
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              昨年度より継続して受講される方はこちらを選択してください。
            </p>
          </button>
        </div>
      </section>

      {formData.signupType === SignupType.NEW && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">3. 受講開始希望月 (Desired Start Month)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {START_MONTHS.map(month => (
                <button
                  key={month}
                  onClick={() => updateFormData({ desiredStartMonth: month })}
                  className={`p-4 rounded-xl border-2 font-bold transition-all text-center ${
                    formData.desiredStartMonth === month
                      ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-md ring-2 ring-blue-100'
                      : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200'
                  }`}
                >
                  {month}月
                </button>
              ))}
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl shadow-sm">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="space-y-2">
                  <h4 className="text-red-800 font-bold text-lg">【重要】お申し込み・お支払い期限について</h4>
                  <p className="text-red-700 text-sm leading-relaxed">
                    受講開始を希望される月の<strong>前月20日まで</strong>に、本フォームの送信および入会金のお支払いを完了していただく必要があります。
                  </p>
                  <p className="bg-white/50 p-2 rounded-lg text-red-800 text-xs font-bold italic">
                    例：6月からの受講をご希望の場合、<strong>5月20日まで</strong>にお手続きを完了してください。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="animate-in fade-in zoom-in duration-300 p-6 bg-slate-800 rounded-3xl border border-slate-700 shadow-inner space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-500 p-2 rounded-xl text-white mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold">ご紹介キャンペーン実施中！</h4>
                <p className="text-slate-300 text-sm">
                  当教室をご紹介いただいた方の氏名をご入力ください。ご紹介者様に<span className="text-amber-400 font-bold">1,000円分のAmazonギフトカード</span>をプレゼントいたします。
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="ご紹介者様のお名前"
                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                value={formData.referralName || ''}
                onChange={(e) => updateFormData({ referralName: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 flex justify-center">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`
            w-full md:w-auto px-20 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl
            ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          次へ進む
        </button>
      </div>
    </div>
  );
};

export default SignupTypeForm;
