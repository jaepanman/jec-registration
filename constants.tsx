
import React from 'react';
import { Course, Location } from './types';

export const DAYS_OF_WEEK = ['月', '火', '水', '木', '金', '土'];
export const KOSHIGAYA_DAYS = ['木'];

export const WEEKDAY_TIME_SLOTS = [
  '16:30', '17:00', '17:30', '18:00', '18:30', 
  '19:00', '19:30', '20:00', '20:30', '21:00'
];

export const SATURDAY_TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

export const GRADE_LEVELS = [
  '年少', '年中', '年長',
  '小学1年生', '小学2年生', '小学3年生', '小学4年生', '小学5年生', '小学6年生',
  '中学1年生', '中学2年生', '中学3年生',
  '高校1年生', '高校2年生', '高校3年生',
  '大学1年生', '大学2年生', '大学3年生', '大学4年生',
  '社会人/その他'
];

export const STUDY_YEARS = [
  '未経験/0年間', '1年間', '2年間', '3年間', '4年間', '5年間', 
  '6年間', '7年間', '8年間', '9年間', '10年間', '11年間', '12年間以上'
];

export const PREVIOUS_LEVELS = [
  '未設定', 'レベル1', 'レベル2', 'レベル3', 'レベル4', 'レベル5', 'レベル6'
];

export interface CourseDetail {
  target: string;
  duration: string;
  monthlyFee: string;
  materialFee: string;
  notes: string;
  description?: string[];
}

const KIDS_ENGLISH_DESC = [
  'レベル1/2: 身近な会話（動物・文房具等）、アルファベット、フォニックス、3文字単語の自力読解',
  'レベル3/4: 三人称、二文字子音・母音、短いコミックの読解、英検5級相当の内容学習',
  'レベル5/6: 世界の日常生活・職業、長文読解、正しい文章・段落の作成、英検4級相当の内容学習',
  '特長: ネイティブ講師による実践、フォニックスによる基礎、年齢に応じた段階的進化'
];

const PRIVATE_LESSON_DESC = [
  '生徒一人ひとりのニーズに合わせた完全オーダーメイド',
  '英会話から英検、定期テスト、高校受験対策まで対応',
  '学習内容の追加・変更は年度途中でも可能です',
  '【重要】学習内容1つ追加につき、月謝が500円加算されます',
  '追加項目には別途教材費が発生する場合があります。詳細はお問い合わせください'
];

const DIFFICULTY_NOTE = 'このコースはキッズ英語よりも難易度が高く、家庭での課題（宿題）に取り組む時間が必要な生徒向けです。';

export const KUKI_COURSE_METADATA: Record<string, CourseDetail | CourseDetail[]> = {
  [Course.KIDS]: [
    { 
      target: '小学生 0~3年', 
      duration: '50分', 
      monthlyFee: '6,500', 
      materialFee: '8,000', 
      notes: '2人クラス: 35分 / 3人クラス: 40分',
      description: KIDS_ENGLISH_DESC
    },
    { 
      target: '小学生 4~6年', 
      duration: '60分', 
      monthlyFee: '7,500', 
      materialFee: '8,000', 
      notes: '2人クラス: 40分 / 3人クラス: 50分',
      description: KIDS_ENGLISH_DESC
    }
  ],
  [Course.KIDS_CHAT]: { 
    target: '幼稚園児', 
    duration: '40分', 
    monthlyFee: '6,000', 
    materialFee: '8,000', 
    notes: '2人クラス: 30分 / 3人クラス: 40分',
    description: [
      '遊びや音楽を通じて英語に親しむ',
      '挨拶や身近な物の名前を楽しく習得',
      'リスニングの基礎を養う'
    ]
  },
  [Course.JUNIOR_HIGH_PREP]: { 
    target: '小学校6年生のみ', 
    duration: '60分', 
    monthlyFee: '8,000', 
    materialFee: '7,000', 
    notes: '2人クラス: 45分 / 3人クラス: 60分',
    description: [
      '中学英語へのスムーズな移行をサポート（6年生専用）',
      '文法・語彙・読解・英作文の基礎を習得',
      '中学の試験形式に慣れるための実戦対策'
    ]
  },
  [Course.JUNIOR_HIGH]: { 
    target: '中学生', 
    duration: '60分', 
    monthlyFee: '8,000', 
    materialFee: '8,000', 
    notes: '2人クラス: 45分 / 3人クラス: 60分',
    description: [
      '学校の教科書に準拠した文法・読解力の強化',
      '定期テスト対策と高校入試を見据えた学習'
    ]
  },
  [Course.EIKEN]: { 
    target: '全学年', 
    duration: '60分', 
    monthlyFee: '8,000', 
    materialFee: '7,000', 
    notes: '2人クラス: 45分 / 3人クラス: 60分',
    description: [
      '英検各級の合格を目指す特化カリキュラム',
      '単語・熟語・文法からリスニング・面接まで網羅'
    ]
  },
  [Course.STEAM]: { 
    target: '小学生〜中学生', 
    duration: '60分', 
    monthlyFee: '12,500 (1名) / 8,500 (2名〜)', 
    materialFee: '8,000 + 月々1,000', 
    notes: '1人: 45〜60分 / 2人: 45分 / 3人: 50分',
    description: [
      'ジェシー先生がカリキュラムをデザインしたコースです。',
      DIFFICULTY_NOTE,
      '理科・算数・芸術などをテーマにした体験型学習',
      'ネイティブ講師による英語での探究・実験活動'
    ]
  },
  [Course.TRAILBLAZERS]: { 
    target: '小学生〜中学生', 
    duration: '60分', 
    monthlyFee: '12,500 (1名) / 8,500 (2名〜)', 
    materialFee: '8,000', 
    notes: '1人: 45〜60分 / 2人: 45分 / 3人: 50分',
    description: [
      'レニ先生がカリキュラムをデザインしたコースです。',
      DIFFICULTY_NOTE,
      'ナショナルジオグラフィックの教材「Trailblazer」を使用',
      '世界の文化・環境への探究心と21世紀型スキルを育成'
    ]
  },
  [Course.PRIVATE_INDIVIDUAL]: {
    target: '全学年',
    duration: '30/45/60分',
    monthlyFee: '10,000〜19,500',
    materialFee: '8,000',
    notes: '30分: 10,000 / 45分: 12,500 / 60分: 19,500',
    description: PRIVATE_LESSON_DESC
  },
  [Course.JUNIOR_HIGH_CONV]: {
    target: '中学生',
    duration: '30/45/60分',
    monthlyFee: '10,000〜19,500',
    materialFee: '8,000',
    notes: '一人ひとりのレベルに合わせた会話重視のレッスン',
    description: PRIVATE_LESSON_DESC
  }
};

export const KOSHIGAYA_COURSE_METADATA: Record<string, CourseDetail | CourseDetail[]> = {
  [Course.KIDS]: [
    { 
      target: '経験 0~3年', 
      duration: '50分', 
      monthlyFee: '7,500', 
      materialFee: '8,000', 
      notes: '2名 35分/ 3名 40分/ 4名以上 50分',
      description: KIDS_ENGLISH_DESC
    },
    { 
      target: '経験 4~6年', 
      duration: '60分', 
      monthlyFee: '8,500', 
      materialFee: '8,000', 
      notes: '2名 40分/ 3名 50分/ 4名以上 60分',
      description: KIDS_ENGLISH_DESC
    }
  ],
  [Course.KIDS_CHAT]: { 
    target: '幼稚園児', 
    duration: '40分', 
    monthlyFee: '7,000', 
    materialFee: '8,000', 
    notes: '2名：30分 / 3名以上：40分',
    description: [
      '遊びや音楽を通じて英語に親しむ',
      '挨拶や身近な物の名前を楽しく習得',
      'リスニングの基礎を養う'
    ]
  },
  [Course.JUNIOR_HIGH_PREP]: { 
    target: '小学校6年生のみ', 
    duration: '60分', 
    monthlyFee: '9,500', 
    materialFee: '7,000', 
    notes: '2名：45分 / 3名以上：60分',
    description: [
      '中学英語へのスムーズな移行をサポート',
      '文法・語彙・読解・英作文の基礎を習得'
    ]
  },
  [Course.JUNIOR_HIGH]: { 
    target: '中学生', 
    duration: '60分', 
    monthlyFee: '9,500', 
    materialFee: '8,000', 
    notes: '2名：45分 / 3名以上：60分',
    description: [
      '学校の教科書に準拠した文法・読解力の強化',
      '定期テスト対策と高校入試を見据えた学習'
    ]
  },
  [Course.STEAM]: { 
    target: '小学生〜中学生', 
    duration: '60分', 
    monthlyFee: '13,500 (1名) / 9,500 (2名〜)', 
    materialFee: '8,000 + 月々1,000', 
    notes: '理科・算数・芸術などをテーマにした体験型学習',
    description: [
      DIFFICULTY_NOTE,
      'ネイティブ講師による英語での探究・実験活動'
    ]
  },
  [Course.TRAILBLAZERS]: { 
    target: '小学生〜中学生', 
    duration: '60分', 
    monthlyFee: '13,500 (1名) / 9,500 (2名〜)', 
    materialFee: '8,000', 
    notes: 'ナショナルジオグラフィックの教材「Trailblazer」を使用',
    description: [
      DIFFICULTY_NOTE,
      '世界の文化・環境への探究心と21世紀型スキルを育成'
    ]
  },
  [Course.PRIVATE_INDIVIDUAL]: {
    target: '全学年',
    duration: '30/45/60分',
    monthlyFee: '12,500〜19,500',
    materialFee: '別途お問い合わせ',
    notes: '30分: 12,500 / 45分: 16,500 / 60分: 19,500',
    description: PRIVATE_LESSON_DESC
  }
};

export const KUKI_TERMS = (
  <div className="space-y-8 text-slate-700 leading-relaxed text-sm">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-50 p-4 rounded-xl border border-blue-100 gap-2">
      <p className="font-bold text-blue-800">JEC英語教室の規約とポリシーについて</p>
      <div className="text-xs">
        <span className="text-slate-500">お問い合わせ: </span>
        <span className="font-bold text-blue-600">admin@jec-eigo.com</span>
      </div>
    </div>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-blue-600 pb-1">入退会の手続き</h5>
      <ul className="space-y-2 list-disc pl-5">
        <li>学習開始の<b>前月２０日まで</b>に、オンライン申込書に記入の上、送信し、<span className="bg-yellow-100 px-1 font-bold">入会金(5000円)</span>を振り込んでください。</li>
        <li>更新の場合には、4月に<span className="text-blue-600 font-bold">1000円</span>が請求されます。</li>
        <li>途中でコースを変更する場合は、<b>前月２０日まで</b>にお申し出ください。</li>
        <li>退会する場合は、<span className="text-red-600 font-bold">前月２０日まで</span>にご連絡ください。</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-blue-600 pb-1">授業料お支払い</h5>
      <p>授業料お支払いは、埼玉りそな銀行指定口座あての振り込みをお願いしております。</p>
      <div className="bg-white p-4 rounded-xl border-2 border-blue-100 space-y-2">
        <p className="font-bold text-blue-800 underline">お支払い期限と遅延手数料</p>
        <p>毎月20日に翌月分のご請求書を発行いたします。お支払いは<b>月末まで</b>にお振込みをお願いいたします。</p>
        <p>なお、<span className="text-red-600 font-bold">翌月5日が最終お支払い期限</span>となります。6日以降のご入金は遅延扱いとなり、<span className="text-red-600 font-bold underline">1,000円の遅延手数料</span>を申し受けます。</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <p className="font-bold mb-1">【振込先情報】</p>
        <p>JEC 英語教室 / 埼玉りそな銀行 久喜支店 / 普通 5900502</p>
        <p className="font-bold">ジェイイーシーエイゴ イーマンジェシーアレン</p>
      </div>
    </section>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-blue-600 pb-1">その他</h5>
      <div className="grid grid-cols-1 gap-3 text-xs">
        <p>① すべての講座は、年間プログラムで行います。月3回遊んでも月5回でも月謝は同じです。</p>
        <p>② 原則として１年間同じ曜日と時間で行います。</p>
        <p>③ クラスの在籍人数が減少した場合は、料金表に基づき<span className="font-bold underline">レッスン時間も短縮されます</span>。</p>
        <p>④ 祝祭日、久喜市の提燈祭り、春・夏・冬休みは原則レッスンを行いません。</p>
        <div className="p-3 bg-red-50 rounded-lg border border-red-100 space-y-1">
          <p className="font-bold text-red-800 underline text-sm">各種諸費用について</p>
          <p>⑥ <b>管理費:</b> 年2回（9月と12月）に<span className="font-bold text-red-600">2,000円</span>を集金します。ご兄弟割引が適用されます。</p>
          <p>⑦ <b>イベント費:</b> 季節のイベント<span className="font-bold text-red-600">1,000〜1,500円</span>、発表会<span className="font-bold text-red-600">1,000円</span>を集めます。</p>
          <p>⑧ <b>絵本費用:</b> 発表会で使用する英語絵本の代金として、11月に<span className="font-bold text-red-600">1,000円</span>を請求いたします。</p>
          <p>⑨ <b>事業運営費用:</b> 月額<span className="font-bold text-blue-600">350円</span>が発生いたします。</p>
        </div>
      </div>
    </section>
  </div>
);

export const KOSHIGAYA_TERMS = (
  <div className="space-y-8 text-slate-700 leading-relaxed text-sm">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-pink-50 p-4 rounded-xl border border-pink-100 gap-2">
      <p className="font-bold text-pink-800">JEC英語教室の規約とポリシーについて (越谷教室)</p>
      <div className="text-xs">
        <span className="text-slate-500">お問い合わせ: </span>
        <span className="font-bold text-blue-600">admin@jec-eigo.com</span>
      </div>
    </div>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-pink-500 pb-1">１、入退会の手続き</h5>
      <ul className="space-y-2 list-disc pl-5">
        <li>学習開始の<b>前月２０日まで</b>に、オンライン申込書に記入の上、送信し、入会金(<span className="font-bold text-pink-600">5,000円</span>)を振り込んでください。</li>
        <li>更新の場合には、4月に<span className="font-bold text-pink-600">2,500円</span>が請求されます。</li>
        <li>途中でコースを変更する場合は、<b>前月２０日まで</b>にお申し出ください。</li>
        <li>退会する場合は、<b>前月２０日まで</b>にご連絡ください。</li>
        <li className="text-blue-600 font-bold italic">お申し込み完了後に表示されるURLより公式LINEアカウントを追加してください。退会時には同アカウントを削除してください。</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-pink-500 pb-1">２、授業料お支払い</h5>
      <p>授業料お支払いは、埼玉りそな銀行指定口座あての振り込みをお願いしております。</p>
      <div className="bg-white p-4 rounded-xl border-2 border-pink-100 space-y-2">
        <p className="font-bold text-pink-800 underline">お支払い期限と遅延手数料</p>
        <p>毎月20日に翌月分のご請求書を発行いたします。お支払いは<b>月末まで</b>にお振込みをお願いいたします。</p>
        <p>なお、<span className="text-red-600 font-bold">翌月5日が最終お支払い期限</span>となります。6日以降のご入金は遅延扱いとなり、<span className="text-red-600 font-bold underline">1,000円の遅延手数料</span>を申し受けますので、あらかじめご了承ください。</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <p className="font-bold mb-1">【振込先情報】</p>
        <p>JEC 英語教室 / 埼⽟りそな銀⾏ 久喜⽀店 / 普通 5900502</p>
        <p className="font-bold">ジェイイーシーエイゴ イーマンジェシーアレン</p>
      </div>
    </section>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-pink-500 pb-1">３、欠席・振替について</h5>
      <ul className="space-y-2 list-disc pl-5">
        <li>欠席の場合は、フォームでお知らせください。欠席フォームに返信する形で宿題をお知らせします。</li>
        <li>フォームよりオンラインでレッスンに参加していただけます。フォームを送信した後、講師のMeet URLをご自身でご確認ください。</li>
        <li><b>個人指導（プライベートなど）：</b> <span className="text-blue-600 font-bold">前日までに連絡</span>いただければ、レッスンを振り替えます。<span className="text-red-600 font-bold underline">当日のキャンセルの場合、振替レッスンはいたしません。</span>ご了承ください。</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h5 className="font-bold text-lg border-b-2 border-pink-500 pb-1">４、その他</h5>
      <div className="grid grid-cols-1 gap-4 text-xs">
        <p>① 英検短期講座を除くすべての講座は、年間プログラムでレッスンを行います。月3回でも月5回でも月謝は同じです。</p>
        <p>② 原則として１年間同じ曜日と時間で行います。</p>
        <p>③ すべてのコース・レベルにおいて、クラスの在籍人数が減少した場合は、料金表に記載されている人数別のレッスン時間に応じて、<span className="font-bold underline">レッスン時間も短縮されます</span>。</p>
        <p>④ 祝祭日、久喜市の提燈祭り、埼玉県民の日、春・夏・冬休みは原則レッスンを行いません。詳しい日程はレッスンカレンダーをご確認ください。</p>
        
        <div className="p-4 bg-pink-50 rounded-xl border border-pink-100 space-y-3">
          <p className="font-bold text-pink-800 underline text-sm">各種諸費用・規定</p>
          <div className="space-y-2">
            <p>⑥ <b>管理費:</b> 年2回、9月と12月に<span className="font-bold text-red-600 text-base">3,500円</span>を集金します。</p>
            <p>⑦ <b>イベント費:</b> 10月ハロウィン<span className="font-bold text-red-600">1,000円</span>、2月キッズフェスティバル（発表会）<span className="font-bold text-red-600">1,000円</span>を集めます。</p>
            <p>⑧ <b>絵本費用:</b> レベル4までのキッズ英語クラスでは、11月に<span className="font-bold text-red-600">1,000円</span>を請求いたします。</p>
            <p>⑨ <b>事業運営費用:</b> 月額<span className="font-bold text-blue-600">350円</span>が発生いたします。</p>
            <div className="p-2 bg-white rounded border border-pink-200">
              <p className="font-bold text-pink-700 underline">⑩ 再入会規定</p>
              <p>途中退会・休止後の再開に際し、データは最大1年間保管します。</p>
              <p>・1年以内の再入会: 再入会金 <span className="font-bold text-red-600">2,500円</span></p>
              <p>・1年以上経過後: 新規扱いとなり <span className="font-bold text-red-600">5,000円</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
