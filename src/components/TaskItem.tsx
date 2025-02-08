import { ITask } from '../types/types';
import { useAppDispatch } from '../app/hooks';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

interface Props {
  task: ITask;
}

export default function TaskItem({ task }: Props) {
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    const updatedTask = {
      ...task,
      status: task.status === 'pending' ? 'completed' : 'pending',
    };
    await dispatch(updateTask(updatedTask));
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(task._id));
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={handleToggle}
            className="h-4 w-4 text-blue-600"
          />
          <div>
            <h3
              className={`text-lg ${
                task.status === 'completed' ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm">{task.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to={`/tasks/${task._id}/edit`}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}