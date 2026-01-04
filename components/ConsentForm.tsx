import React from 'react';
import { RegistrationFormData, PhotoPrivacy, Location } from '../types';
import { KUKI_TERMS, KOSHIGAYA_TERMS } from '../constants';

interface ConsentFormProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const currentLocation = formData.location;
  const isFormValid = formData.agreedToTerms && formData.photoPrivacy;

  return (
    <div className="p-8 space-y-10">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">利用規約への同意</h2>
          <p className="text-sm text-slate-500 ml-4">教室運営を円滑に行うため、以下の規約を必ずお読みください。</p>
        </div>
        
        <div className="space-y-8">
          {currentLocation === Location.KUKI && (
            <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="px-5 py-3 bg-blue-600 text-white flex items-center justify-between">
                  <h4 className="font-bold">久喜教室(英和舎内) 利用規約</h4>
                  <span className="text-xs bg-blue-500 px-2 py-1 rounded">重要</span>
                </div>
                <div className="max-h-[500px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 text-slate-800">
                  {KUKI_TERMS}
                </div>
              </div>
            </div>
          )}
          
          {currentLocation === Location.KOSHIGAYA && (
            <div className="p-1 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="px-5 py-3 bg-pink-500 text-white flex items-center justify-between">
                  <h4 className="font-bold">越谷教室 利用規約</h4>
                  <span className="text-xs bg-pink-400 px-2 py-1 rounded">重要</span>
                </div>
                <div className="max-h-[500px] overflow-y-auto p-6 text-slate-800">
                  {KOSHIGAYA_TERMS}
                </div>
              </div>
            </div>
          )}
          
          <label className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 cursor-pointer group shadow-md transition-all hover:bg-blue-100 hover:border-blue-300">
            <input 
              type="checkbox"
              className="mt-1 w-7 h-7 text-blue-600 rounded-lg border-blue-300 focus:ring-blue-500 shadow-sm"
              checked={formData.agreedToTerms}
              onChange={(e) => updateFormData({ agreedToTerms: e.target.checked })}
            />
            <span className="text-slate-900 font-bold group-hover:text-blue-900 transition-colors pt-0.5 text-base leading-tight">
              上記の利用規約、お支払い期限、および各種諸費用について全ての内容を確認し、これに同意します。
            </span>
          </label>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">写真・動画の使用に関する同意</h2>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-inner">
          <p className="text-sm text-slate-700 leading-relaxed">
            当教室では、レッスンの様子やイベントの写真を、当教室のホームページ、Instagram、公式LINEアカウント、その他の広報・販促活動に使用させていただく場合がございます。お子様の成長を共有し、教室の活動をより多くの方に知っていただくための取り組みですので、ご理解とご協力をお願い申し上げます。
          </p>
          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">掲載に関するご希望を選択してください</p>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(PhotoPrivacy).map(privacy => (
                <button
                  key={privacy}
                  onClick={() => updateFormData({ photoPrivacy: privacy })}
                  className={`
                    p-5 rounded-xl border-2 text-sm font-bold transition-all text-left flex items-center justify-between
                    ${formData.photoPrivacy === privacy
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-100'
                      : 'border-white bg-white text-slate-600 hover:border-slate-200 shadow-sm'}
                  `}
                >
                  <span>{privacy}</span>
                  {formData.photoPrivacy === privacy && (
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pt-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors"
        >
          戻る
        </button>
        <button 
          onClick={onNext}
          disabled={!isFormValid}
          className={`
            px-12 py-4 rounded-2xl font-bold transition-all shadow-xl
            ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          確認画面へ
        </button>
      </div>
    </div>
  );
};

export default ConsentForm;