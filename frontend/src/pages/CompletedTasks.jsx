import { Link } from "react-router-dom";
import useCompletedTasks from "../hooks/useCompletedTasks";

export default function CompletedTasks() {
  const { completedTasks, onToggleIncomplete } = useCompletedTasks();

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 text-center">✅ Completed Tasks</h1>

        {completedTasks.length === 0 ? (
          <p className="text-gray-600 text-center">No completed tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <li
                key={task.id}
                className="p-4 bg-green-200 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{task.title}</div>
                  <div className="text-sm text-gray-700">{task.subject}</div>
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                  <div className="text-xs text-gray-500">Teacher: {task.teacher}</div>
                </div>
                <label className="flex items-center gap-2 text-green-800 font-semibold">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={(e) => onToggleIncomplete(task.id, e.target.checked)}
                  />
                  ✅ Done
                </label>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
