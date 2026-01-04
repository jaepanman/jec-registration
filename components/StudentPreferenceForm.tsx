
import React, { useState } from 'react';
import { StudentData, Location, LessonType, Course } from '../types';
import { DAYS_OF_WEEK, WEEKDAY_TIME_SLOTS, SATURDAY_TIME_SLOTS, KUKI_COURSE_METADATA, KOSHIGAYA_COURSE_METADATA } from '../constants';

interface StudentPreferenceFormProps {
  student: StudentData;
  studentIndex: number;
  totalStudents: number;
  globalLocation?: Location;
  onUpdate: (updates: Partial<StudentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EIKEN_LEVELS = ['5級', '4級', '3級', '準2級', '2級', '準1級', '1級'];

const StudentPreferenceForm: React.FC<StudentPreferenceFormProps> = ({ 
  student, 
  studentIndex, 
  totalStudents, 
  globalLocation,
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const [showError, setShowError] = useState(false);

  const toggleTime = (day: string, time: string) => {
    const currentDaySchedule = student.schedule[day] || [];
    let newDaySchedule;
    if (currentDaySchedule.includes(time)) {
      newDaySchedule = currentDaySchedule.filter(t => t !== time);
    } else {
      newDaySchedule = [...currentDaySchedule, time];
    }
    onUpdate({
      schedule: {
        ...student.schedule,
        [day]: newDaySchedule
      }
    });
  };

  const currentDay = internalStep >= 1 && internalStep <= 6 ? DAYS_OF_WEEK[Math.floor(internalStep) - 1] : null;
  const isSaturday = currentDay === '土';
  const isKoshigaya = globalLocation === Location.KOSHIGAYA;
  const isLockedDay = isKoshigaya && currentDay && currentDay !== '木';

  const activeMetadata = isKoshigaya ? KOSHIGAYA_COURSE_METADATA : KUKI_COURSE_METADATA;

  // Exact Pricing from User Requirements
  const PRIVATE_PRICING: Record<string, Record<string, Record<string, string>>> = {
    [Location.KUKI]: {
      '30分': { '週1回': '10,000', '月2回': '7,500' },
      '45分': { '週1回': '12,500', '月2回': '9,500' },
      '60分': { '週1回': '19,500', '月2回': '15,000' }
    },
    [Location.KOSHIGAYA]: {
      '30分': { '週1回': '13,000', '月2回': '9,500' },
      '45分': { '週1回': '16,500', '月2回': '12,500' },
      '60分': { '週1回': '19,500', '月2回': '15,500' }
    }
  };

  const getCourseDisplayName = (course: Course) => {
    if (isKoshigaya && course === Course.TRAILBLAZERS) {
      return course.replace('レニ先生の', '');
    }
    return course;
  };

  const getAvailableCourses = (): Course[] => {
    if (student.lessonType === LessonType.GROUP) {
      return [
        Course.KIDS, Course.JUNIOR_HIGH_PREP, Course.JUNIOR_HIGH,
        Course.KIDS_CHAT, Course.EIKEN,
        Course.STEAM, Course.TRAILBLAZERS
      ];
    }
    return [
      Course.KIDS, Course.JUNIOR_HIGH_PREP, Course.JUNIOR_HIGH,
      Course.JUNIOR_HIGH_CONV, Course.KIDS_CHAT, Course.EIKEN,
      Course.STEAM, Course.TRAILBLAZERS, Course.PRIVATE_INDIVIDUAL, Course.ONLINE_CONV
    ];
  };

  const handleNextInternal = () => {
    if (internalStep === 0) {
      if (student.course === Course.EIKEN && !student.eikenLevel) {
        setShowError(true);
        return;
      }

      const isPrivate = student.lessonType === LessonType.PRIVATE || 
                        student.course === Course.PRIVATE_INDIVIDUAL || 
                        student.course === Course.ONLINE_CONV || 
                        student.course === Course.GENERAL_PRIVATE ||
                        student.course === Course.JUNIOR_HIGH_CONV;

      if (isPrivate) {
        setInternalStep(0.5);
      } else {
        setInternalStep(1);
      }
      setShowError(false);
      window.scrollTo(0, 0);
    } else if (internalStep === 0.5) {
      const needsDesc = student.course === Course.PRIVATE_INDIVIDUAL || 
                        student.course === Course.GENERAL_PRIVATE ||
                        student.course === Course.JUNIOR_HIGH_CONV;
      const isComplete = 
        (!needsDesc || student.privateNeedsDescription?.trim()) && 
        student.privateLessonDuration && 
        student.privateLessonFrequency;

      if (!isComplete) {
        setShowError(true);
        return;
      }
      setShowError(false);
      setInternalStep(1);
      window.scrollTo(0, 0);
    } else if (internalStep < 6) {
      setInternalStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      const totalSlots = Object.values(student.schedule).flat().length;
      if (totalSlots === 0) {
        alert('最低1つ以上の通学可能時間を選択してください。');
        return;
      }
      onNext();
    }
  };

  const handleBackInternal = () => {
    if (internalStep === 1) {
      const isPrivate = student.lessonType === LessonType.PRIVATE || 
                        student.course === Course.PRIVATE_INDIVIDUAL || 
                        student.course === Course.ONLINE_CONV || 
                        student.course === Course.GENERAL_PRIVATE ||
                        student.course === Course.JUNIOR_HIGH_CONV;
      if (isPrivate) setInternalStep(0.5);
      else setInternalStep(0);
    } else if (internalStep === 0.5) {
      setInternalStep(0);
    } else if (internalStep > 1) {
      setInternalStep(prev => prev - 1);
    } else {
      onBack();
    }
    window.scrollTo(0, 0);
  };

  const skipDay = () => {
    if (currentDay) {
      onUpdate({ schedule: { ...student.schedule, [currentDay]: [] } });
      handleNextInternal();
    }
  };

  if (internalStep === 0) {
    const courses = getAvailableCourses();
    const isStep0Valid = student.lessonType && student.course && (student.course !== Course.EIKEN || student.eikenLevel);
    const currentMeta = student.course ? activeMetadata[student.course] : null;
    const isPrivateRequest = student.lessonType === LessonType.PRIVATE || student.course === Course.PRIVATE_INDIVIDUAL;

    return (
      <div className="p-8 space-y-10">
        <div className="space-y-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
              Student {studentIndex + 1} / {totalStudents}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {student.isSelf ? 'ご本人様' : `${student.lastNameKanji} ${student.firstNameKanji}様`} の希望
          </h2>
          <p className="text-slate-500">形式とコースを選択してください。</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-l-4 border-blue-600 pl-3">形式を選択</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.values(LessonType).map((type) => (
              <button
                key={type}
                onClick={() => onUpdate({ lessonType: type, course: undefined })}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${student.lessonType === type ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {student.lessonType && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-blue-600 pl-3">コースを選択</h3>
              {globalLocation && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{globalLocation}</span>}
            </div>
            
            <div className="grid grid-cols-1 gap-2 mt-4">
              {courses.map((course) => (
                <button
                  key={course}
                  onClick={() => onUpdate({ course: course })}
                  className={`p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${student.course === course ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-700 hover:border-slate-300'}`}
                >
                  <span className="font-medium text-sm md:text-base leading-tight">{getCourseDisplayName(course)}</span>
                </button>
              ))}
            </div>

            {student.course === Course.EIKEN && (
              <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-800 text-sm">目標とする級を選択してください</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">必須</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {EIKEN_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => onUpdate({ eikenLevel: level })}
                      className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${student.eikenLevel === level ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {showError && !student.eikenLevel && (
                  <p className="text-xs text-red-500 font-bold">級を選択してください。</p>
                )}
              </div>
            )}

            {student.course && (
              <div className="mt-6 p-6 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 animate-in zoom-in-95">
                <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <span>コース詳細・料金</span>
                </h4>
                
                <div className="space-y-6">
                  {isPrivateRequest ? (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 mb-2">※時間と頻度により料金が異なります（詳細は次の画面で表示されます）</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['30分', '45分', '60分'].map(dur => {
                          const prices = globalLocation ? PRIVATE_PRICING[globalLocation][dur] : PRIVATE_PRICING[Location.KUKI][dur];
                          return (
                            <div key={dur} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{dur}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">週1回:</span>
                                  <span className="font-black text-black">¥{prices['週1回']}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">月2回:</span>
                                  <span className="font-black text-slate-700">¥{prices['月2回']}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : currentMeta ? (
                    (Array.isArray(currentMeta) ? currentMeta : [currentMeta]).map((meta, i) => (
                      <div key={i} className={`space-y-4 ${i > 0 ? 'pt-6 border-t border-slate-100' : ''}`}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">対象</p>
                            <p className="text-sm font-bold text-black">{meta.target}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">標準時間</p>
                            <p className="text-sm font-bold text-black">{meta.duration}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-1">月謝</p>
                            <p className="text-base font-black text-blue-700">¥{meta.monthlyFee}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">教材費</p>
                            <p className="text-sm font-bold text-black">¥{meta.materialFee}</p>
                          </div>
                        </div>
                        {meta.description && (
                          <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                            <ul className="space-y-1.5">
                              {meta.description.map((line, idx) => (
                                <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                                  <span className="text-blue-500 mt-0.5">•</span>
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-500 italic">
                          備考: {meta.notes}
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            )}
          </section>
        )}

        <div className="pt-10 flex items-center justify-between">
          <button onClick={handleBackInternal} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors">戻る</button>
          <button 
            onClick={handleNextInternal} 
            disabled={!isStep0Valid}
            className={`px-12 py-4 rounded-2xl font-bold transition-all shadow-xl ${isStep0Valid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            次へ進む
          </button>
        </div>
      </div>
    );
  }

  if (internalStep === 0.5) {
    const isDescriptionEmpty = !student.privateNeedsDescription?.trim();
    const needsDesc = student.course === Course.PRIVATE_INDIVIDUAL || 
                      student.course === Course.GENERAL_PRIVATE ||
                      student.course === Course.JUNIOR_HIGH_CONV;
    
    const currentLocPrices = globalLocation ? PRIVATE_PRICING[globalLocation] : PRIVATE_PRICING[Location.KUKI];

    return (
      <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">プライベートレッスン設定</h2>
          <p className="text-slate-500">時間と頻度を選択してください。</p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-8">
          <section className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">1. レッスン時間を選択 <span className="text-red-600 text-[10px] ml-1">必須</span></h4>
              <div className="grid grid-cols-3 gap-3">
                {(['30分', '45分', '60分'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => onUpdate({ privateLessonDuration: d })}
                    className={`p-4 rounded-xl border-2 font-bold transition-all flex flex-col items-center ${
                      student.privateLessonDuration === d ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-lg">{d}</span>
                  </button>
                ))}
              </div>
            </div>

            {student.privateLessonDuration && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h4 className="font-bold text-slate-800">2. 受講頻度を選択 <span className="text-red-600 text-[10px] ml-1">必須</span></h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['週1回', '月2回'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => onUpdate({ privateLessonFrequency: f })}
                      className={`p-6 rounded-xl border-2 font-bold transition-all text-center ${
                        student.privateLessonFrequency === f ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{f}</div>
                      <div className="text-sm font-black text-blue-600">
                        月額: ¥{currentLocPrices[student.privateLessonDuration!][f]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {needsDesc && (
            <div className="space-y-2 pt-6 border-t border-slate-200">
              <label className="block text-sm font-bold text-slate-700">希望する学習内容 <span className="text-red-600 text-[10px] ml-1">必須</span></label>
              <textarea
                className="w-full h-32 px-4 py-3 bg-white rounded-xl border-2 border-slate-200 focus:border-blue-600 outline-none transition-all text-black font-medium"
                placeholder="英検対策を行いたい、など具体的にお知らせください。"
                value={student.privateNeedsDescription || ''}
                onChange={(e) => onUpdate({ privateNeedsDescription: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className="pt-8 flex items-center justify-between">
          <button onClick={handleBackInternal} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors">戻る</button>
          <button 
            onClick={handleNextInternal} 
            className={`px-12 py-4 rounded-2xl font-bold shadow-lg transition-all ${
              (needsDesc && isDescriptionEmpty) || !student.privateLessonDuration || !student.privateLessonFrequency 
              ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            日時選択へ進む
          </button>
        </div>
      </div>
    );
  }

  const currentSlots = isSaturday ? SATURDAY_TIME_SLOTS : WEEKDAY_TIME_SLOTS;

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-800">{currentDay}曜日の希望時間</h2>
        <p className="text-slate-500">通学可能なレッスン開始時間を選択してください。</p>
      </div>

      <section className="space-y-6">
        {isSaturday && (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-700 font-medium">土曜日のレッスンは、通常の受講料に加えて別途1,500円の追加料金がかかります。</p>
          </div>
        )}

        {isLockedDay ? (
          <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-slate-400 font-medium">越谷教室は木曜日のみ開講しております。</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentSlots.map(time => {
              const isSelected = student.schedule[currentDay!]?.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => toggleTime(currentDay!, time)}
                  className={`py-4 rounded-xl border-2 text-sm font-black transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
                >
                  {time}〜
                </button>
              );
            })}
          </div>
        )}
      </section>

      <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <button onClick={handleBackInternal} className="flex-1 md:flex-none px-8 py-4 text-slate-500 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">戻る</button>
          <button onClick={skipDay} className="flex-1 md:flex-none px-8 py-4 text-blue-600 font-bold border border-blue-100 rounded-2xl hover:bg-blue-50 transition-colors">スキップ</button>
        </div>
        <button 
          onClick={handleNextInternal} 
          className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all"
        >
          {internalStep === 6 ? '希望内容を保存' : '次の曜日へ'}
        </button>
      </div>
    </div>
  );
};

export default StudentPreferenceForm;
