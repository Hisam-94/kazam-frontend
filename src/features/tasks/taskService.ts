import API from '../../services/api';
import { ITask } from '../../types/types';

export const fetchTasks = async () => {
  const response = await API.get('/tasks');
  return response.data;
};

export const fetchTask = async (id: string) => {
  const response = await API.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: Omit<ITask, '_id'>) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (task: ITask) => {
  const response = await API.put(`/tasks/${task._id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await API.delete(`/tasks/${id}`);
  return id;
};