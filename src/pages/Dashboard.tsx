import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export default function Dashboard() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
          <div className="space-x-4">
            <Link
              to="/tasks/new"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              New Task
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <TaskList />
      </main>
    </div>
  );
}