
import React from 'react';
import { RegistrationFormData, StudentData, SignupType } from '../types';
import { GRADE_LEVELS, STUDY_YEARS, PREVIOUS_LEVELS } from '../constants';

interface GuardianFormProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const GuardianForm: React.FC<GuardianFormProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const addStudent = () => {
    const newStudents = [...formData.students, {
      id: crypto.randomUUID(),
      lastNameKanji: '',
      firstNameKanji: '',
      lastNameFurigana: '',
      firstNameFurigana: '',
      isSelf: false,
      schedule: {}
    }];
    updateFormData({ students: newStudents });
  };

  const removeStudent = (id: string) => {
    if (formData.students.length <= 1) return;
    const newStudents = formData.students.filter(s => s.id !== id);
    updateFormData({ students: newStudents });
  };

  const updateStudent = (id: string, updates: Partial<StudentData>) => {
    const newStudents = formData.students.map(s => 
      s.id === id ? { ...s, ...updates } : s
    );
    updateFormData({ students: newStudents });
  };

  const isFormValid = 
    formData.lastNameKanji && 
    formData.firstNameKanji && 
    formData.lastNameFurigana && 
    formData.firstNameFurigana && 
    formData.phoneNumber && 
    formData.email &&
    formData.students.every(s => 
      (s.isSelf || (s.lastNameKanji && s.firstNameKanji && s.lastNameFurigana && s.firstNameFurigana)) &&
      s.grade && 
      s.schoolName && 
      (formData.signupType === SignupType.NEW ? s.yearsStudied : s.lastYearLevel)
    );

  const darkInputClass = "w-full px-4 py-3 rounded-xl bg-slate-800 border-none text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner";
  const lightSelectClass = "w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black appearance-none font-medium";

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">保護者情報</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">お名前 (漢字)</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="姓"
                  className={darkInputClass}
                  value={formData.lastNameKanji}
                  onChange={(e) => updateFormData({ lastNameKanji: e.target.value })}
                />
                <input 
                  type="text"
                  placeholder="名"
                  className={darkInputClass}
                  value={formData.firstNameKanji}
                  onChange={(e) => updateFormData({ firstNameKanji: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">お名前 (ふりがな)</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="せい"
                  className={darkInputClass}
                  value={formData.lastNameFurigana}
                  onChange={(e) => updateFormData({ lastNameFurigana: e.target.value })}
                />
                <input 
                  type="text"
                  placeholder="めい"
                  className={darkInputClass}
                  value={formData.firstNameFurigana}
                  onChange={(e) => updateFormData({ firstNameFurigana: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">電話番号</label>
              <input 
                type="tel"
                placeholder="090-1234-5678"
                className={darkInputClass}
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">メールアドレス</label>
              <input 
                type="email"
                placeholder="example@email.com"
                className={darkInputClass}
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">受講者情報</h2>
          <p className="text-xs text-slate-400">ご兄弟の追加は下のボタンをクリックしてください</p>
        </div>
        
        <div className="space-y-6">
          {formData.students.map((student, index) => (
            <div key={student.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-6 relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeStudent(student.id)}
                  className="absolute top-4 right-4 p-2 bg-white text-slate-400 rounded-full border border-slate-200 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className="flex items-center justify-between pr-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">生徒 {index + 1}</span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                    checked={student.isSelf}
                    onChange={(e) => updateStudent(student.id, { 
                      isSelf: e.target.checked,
                      lastNameKanji: e.target.checked ? formData.lastNameKanji : '',
                      firstNameKanji: e.target.checked ? formData.firstNameKanji : '',
                      lastNameFurigana: e.target.checked ? formData.lastNameFurigana : '',
                      firstNameFurigana: e.target.checked ? formData.firstNameFurigana : '',
                    })}
                  />
                  <span className="text-sm text-slate-600 font-medium">保護者本人（本人）</span>
                </label>
              </div>
              
              {!student.isSelf && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">お名前 (漢字)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="姓"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                          value={student.lastNameKanji}
                          onChange={(e) => updateStudent(student.id, { lastNameKanji: e.target.value })}
                        />
                        <input 
                          type="text"
                          placeholder="名"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                          value={student.firstNameKanji}
                          onChange={(e) => updateStudent(student.id, { firstNameKanji: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">お名前 (ふりがな)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="せい"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                          value={student.lastNameFurigana}
                          onChange={(e) => updateStudent(student.id, { lastNameFurigana: e.target.value })}
                        />
                        <input 
                          type="text"
                          placeholder="めい"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                          value={student.firstNameFurigana}
                          onChange={(e) => updateStudent(student.id, { firstNameFurigana: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">学年 (Grade)</label>
                  <select 
                    className={lightSelectClass}
                    value={student.grade || ''}
                    onChange={(e) => updateStudent(student.id, { grade: e.target.value })}
                  >
                    <option value="">選択してください</option>
                    {GRADE_LEVELS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">学校名 (School Name)</label>
                  <input 
                    type="text"
                    placeholder="例: 久喜東小学校"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                    value={student.schoolName || ''}
                    onChange={(e) => updateStudent(student.id, { schoolName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 border-t border-slate-200">
                {formData.signupType === SignupType.NEW ? (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">英語学習歴 (学校教育を除く年数)</label>
                    <select 
                      className={lightSelectClass}
                      value={student.yearsStudied || ''}
                      onChange={(e) => updateStudent(student.id, { yearsStudied: e.target.value })}
                    >
                      <option value="">選択してください</option>
                      {STUDY_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">昨年度のレベル または 英語学習歴</label>
                    <select 
                      className={lightSelectClass}
                      value={student.lastYearLevel || ''}
                      onChange={(e) => updateStudent(student.id, { lastYearLevel: e.target.value })}
                    >
                      <option value="">選択してください</option>
                      <optgroup label="昨年度のレベル">
                        {PREVIOUS_LEVELS.filter(l => l !== '未設定').map(l => <option key={l} value={l}>{l}</option>)}
                      </optgroup>
                      <optgroup label="英語学習歴 (通算年数)">
                        {STUDY_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </optgroup>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button 
            type="button"
            onClick={addStudent}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center space-x-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>ご兄弟を追加する</span>
          </button>
        </div>
      </section>

      <div className="pt-8 flex items-center justify-between">
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
            px-12 py-4 rounded-2xl font-bold transition-all
            ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          次へ進む
        </button>
      </div>
    </div>
  );
};

export default GuardianForm;
