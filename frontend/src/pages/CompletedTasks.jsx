import { Link } from "react-router-dom";
import useCompletedTasks from "../hooks/useCompletedTasks";

export default function CompletedTasks() {
  const { completedTasks, onToggleIncomplete } = useCompletedTasks();

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 p-4 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-white mb-4 text-center">
          ✅ Completed Tasks
        </h1>

        {completedTasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center">No completed tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <li
                key={task._id}
                className="p-4 bg-green-200 dark:bg-green-400 dark:bg-opacity-60 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{task.title}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">{task.subject}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    Teacher: {task.teacher || "—"}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-green-800 dark:text-green-200 font-semibold">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={(e) => onToggleIncomplete(task._id, e.target.checked)}
                  />
                  ✅ Done
                </label>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
