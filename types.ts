
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Gender = 'male' | 'female';
export type MealPlanGoal = 'gain' | 'loss';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface FitnessTip {
  title: string;
  explanation: string;
}

export interface Meal {
  name: string;
  time: string;
  description: string;
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}
