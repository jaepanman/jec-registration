
export enum Location {
  KUKI = '久喜教室(英和舎内)',
  KOSHIGAYA = '越谷教室(藤原バレエ教室内)'
}

export enum LessonType {
  GROUP = 'グループレッスン',
  PRIVATE = 'プライベートレッスン',
  NO_PREFERENCE = 'どちらでも可'
}

export enum SignupType {
  NEW = '新規入会',
  CONTINUING = '継続受講（昨年度より継続）'
}

export enum Course {
  KIDS = '(A) キッズ英語',
  JUNIOR_HIGH_PREP = '(B) 中学校英語準備(小6のみ)',
  JUNIOR_HIGH = '(C) 中学英語',
  JUNIOR_HIGH_CONV = '(D) 中学生の英会話',
  KIDS_CHAT = '(E) 英語おしゃべりキッズ (幼稚園児対象コース)',
  EIKEN = '(F) 英検通年',
  STEAM = '(G) STEAM POWERED',
  TRAILBLAZERS = '(H) レニ先生のTRAILBLAZER 『知りたい』が世界へのパスポート。好奇心が育つ英語の冒険。',
  PRIVATE_INDIVIDUAL = '(I) ニーズに合わせた個人指導',
  ONLINE_CONV = '(J) オンライン英会話',
  GENERAL_PRIVATE = 'ニーズに合わせたプライベートレッスン'
}

export enum PhotoPrivacy {
  VISIBLE = '写真掲載に同意する（顔出し可）',
  BLURRED = '顔をぼかして掲載することを条件に同意する',
  NOT_ALLOWED = '写真撮影・掲載を希望しない'
}

export interface StudentData {
  id: string;
  lastNameKanji: string;
  firstNameKanji: string;
  lastNameFurigana: string;
  firstNameFurigana: string;
  isSelf: boolean;
  grade?: string;
  schoolName?: string;
  yearsStudied?: string;
  lastYearLevel?: string;
  lessonType?: LessonType;
  course?: Course;
  eikenLevel?: string;
  privateNeedsDescription?: string;
  privateLessonDuration?: '30分' | '45分' | '60分';
  privateLessonFrequency?: '週1回' | '月2回';
  schedule: Record<string, string[]>;
}

export interface RegistrationFormData {
  location?: Location;
  signupType?: SignupType;
  desiredStartMonth?: string;
  referralName?: string;
  lastNameKanji: string;
  firstNameKanji: string;
  lastNameFurigana: string;
  firstNameFurigana: string;
  phoneNumber: string;
  email: string;
  students: StudentData[];
  photoPrivacy: PhotoPrivacy;
  agreedToTerms: boolean;
}
