import { Link } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';

export default function Dashboard() {
  const {
    isSidebarOpen,
    setSidebarOpen,
    tasks,
    dark,
    setDark,
    onToggleCompleted,
  } = useDashboard();

  // If tasks is not ready yet, show loading screen
  if (!Array.isArray(tasks)) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-white">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 z-10 h-full overflow-hidden bottom-10 xl:static xl:z-auto transition-all ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="h-full p-4 bg-white dark:bg-gray-800 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="text-blue-600 dark:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {isSidebarOpen && <span className="font-bold text-blue-800 dark:text-white">STM</span>}
          </div>

          <nav>
            <ul className="space-y-4">
              <li><Link to="/" className="flex items-center gap-2 hover:text-blue-600"><span>🏠</span>{isSidebarOpen && <span>Dashboard</span>}</Link></li>
              <li><Link to="/add-task" className="flex items-center gap-2 hover:text-blue-600"><span>➕</span>{isSidebarOpen && <span>Add Task</span>}</Link></li>
              <li><Link to="/completed-task" className="flex items-center gap-2 hover:text-blue-600"><span>✅</span>{isSidebarOpen && <span>Completed</span>}</Link></li>
              <li><Link to="/login" className="flex items-center gap-2 hover:text-blue-600"><span>🔐</span>{isSidebarOpen && <span>Logout</span>}</Link></li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="sticky top-0 flex justify-between items-center p-4 bg-blue-50 dark:bg-gray-800 shadow">
          <h1 className="text-xl font-bold text-blue-800 dark:text-white">Student Task Manager</h1>
          <button
            onClick={() => setDark((prev) => !prev)}
            className="px-3 py-1 border rounded text-sm bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        <main className="p-4">
          <div className="bg-blue-500 dark:bg-blue-700 text-white p-4 rounded shadow text-center text-2xl font-semibold">
            Task List
          </div>

          <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
            {tasks.filter((t) => !t.completed).length === 0 ? (
              <p className="text-gray-400 dark:text-gray-300 text-center">No tasks yet...</p>
            ) : (
              <ul className="space-y-2">
                {tasks.filter((t) => !t.completed).map((task) => (
                  <li
                    key={task._id}
                    className={`p-3 rounded shadow flex justify-between items-center ${
                      task.priority === 'High'
                        ? 'bg-red-200'
                        : task.priority === 'Medium'
                        ? 'bg-yellow-200'
                        : 'bg-green-200'
                    } dark:bg-opacity-80`}
                  >
                    <div>
                      <div className="font-bold">{task.title}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-200">{task.subject}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Due: {task.dueDate}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Teacher: {task.teacher}</div>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed || false}
                        onChange={(e) => onToggleCompleted(task._id, e.target.checked)}
                      />
                      <span className="text-sm">
                        {task.completed ? "✅ Done" : "⏳"}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
