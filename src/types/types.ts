export interface ITask {
    _id: string;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    user: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IUser {
    _id: string;
    name: string;
    email: string;
    tasks: string[];
  }