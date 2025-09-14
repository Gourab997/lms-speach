export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  duration_hours: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  milestone_id: string;
  title: string;
  description: string;
  order_index: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  description: string;
  order_index: number;
  content?: Content[];
}

export interface Content {
  id: string;
  lesson_id: string;
  title: string;
  type: 'text' | 'audio' | 'video' | 'quiz';
  content_data: any;
  order_index: number;
}

export interface Progress {
  id: string;
  user_id: string;
  content_id: string;
  completed: boolean;
  completion_date?: string;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  passing_score: number;
}