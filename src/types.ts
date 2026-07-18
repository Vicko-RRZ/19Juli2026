export interface UserSession {
  authenticated: boolean;
  username?: string;
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  iconType: 'meet' | 'crush' | 'amusement' | 'hts' | 'break' | 'reunite' | 'indomaret' | 'official' | 'school' | 'celebrate';
  image?: string;
}

export interface RandomMessage {
  id: number;
  text: string;
}

export interface Reason {
  id: number;
  text: string;
}

export interface BagItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  detail: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Envelope {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
  featured: boolean;
  width: number;
  height: number;
  fallbackSrc?: string;
}

export interface BirthdayContent {
  profile: {
    fullName: string;
    nickname: string;
    birthDate: string;
    age: number;
    relationDate: string;
  };
  panggilan: string[];
  timeline: Milestone[];
  randomMessages: RandomMessage[];
  reasonsToLove: Reason[];
  quizQuestions: QuizQuestion[];
  envelopes: Envelope[];
  mainLetter: string;
  bagItems: BagItem[];
}
