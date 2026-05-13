export interface Task {
    id?: number;
    name: string;
    description?: string;
    date: string; 
    status: 'todo' | 'done';
  }
  