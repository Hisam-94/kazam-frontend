import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../services/api';
import { ITask } from '../../types/types';

interface TaskState {
  tasks: ITask[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await API.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (taskData: Omit<ITask, '_id' | 'createdAt' | 'updatedAt' | 'user'>) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/update', async (task: ITask) => {
  const response = await API.put(`/tasks/${task._id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (taskId: string) => {
  await API.delete(`/tasks/${taskId}`);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;