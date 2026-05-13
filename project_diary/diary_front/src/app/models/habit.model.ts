export interface Habit {
  id: number;
  name: string;
  frequency: string;
  completed: boolean;
}
export interface HabitLog {
  id: number;
  habit: number;
  date: string;
  completed: boolean;
}