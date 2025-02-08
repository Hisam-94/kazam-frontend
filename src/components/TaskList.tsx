import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';

export default function TaskList() {
  const dispatch = useAppDispatch();
  const { tasks, status } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {status === 'loading' ? (
        <p className="text-center">Loading tasks...</p>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
}