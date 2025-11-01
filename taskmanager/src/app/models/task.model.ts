export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  title: string;
  due: string; // ISO date yyyy-mm-dd
  level: 'low' | 'medium' | 'high';
  desc?: string;
  status: TaskStatus;
}
