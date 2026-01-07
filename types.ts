
export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
  NA = 'N/A',
}

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  remarks: string;
  completionDate?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  tasks: Task[];
}
