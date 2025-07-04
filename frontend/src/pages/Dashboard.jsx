import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(Boolean)



  // ✅ Load tasks from localStorage only
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const onToggleCompleted = (taskId, isChecked) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: isChecked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  


  return (
    <div className="relative flex h-screen bg-blue-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 z-10 flex-col flex-shrink-0 h-full overflow-hidden transition-all bg-transparent bottom-10 xl:static xl:z-auto ${isSidebarOpen ? "flex xl:w-64" : "hidden xl:flex xl:w-16"}`}
      >
        <div className="flex-shrink-0 hidden px-2 max-h-14 xl:items-center xl:justify-start xl:space-x-3 xl:flex xl:max-h-14 xl:h-full xl:px-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 text-blue-600 rounded-full hover:bg-blue-200"
            aria-label="Sidenav button"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="#" className="flex-shrink-0 text-2xl font-bold tracking-widest text-blue-800 uppercase">
            STM
          </a>
        </div>
        <div className="fixed left-0 flex flex-col flex-1 max-h-screen px-2 overflow-hidden right-3 top-16 bottom-10 xl:static xl:pt-2 xl:pl-4 xl:mb-4">
          <div className={`flex-1 max-h-full p-2 overflow-hidden bg-white rounded-md shadow-2xl lg:shadow-md hover:overflow-y-scroll ${isSidebarOpen ? "min-w-full xl:w-14" : ""}`}>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button className="flex items-center space-x-2">
                    <span>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </span>
                    {isSidebarOpen && <span>Dashboard</span>}
                  </button>
                </li>

                <li>
                  <Link to="/login" className="flex items-center space-x-2">
                    <span>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </span>
                    {isSidebarOpen && <span className="whitespace-nowrap">Login Page</span>}
                  </Link>
                </li>

                <li>
                  <Link to="/add-task" className="flex items-center space-x-2">
                    <span>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                    {isSidebarOpen && <span className="whitespace-nowrap">Add Task</span>}
                  </Link>
                </li>

                <li>
              <Link to="/completed-task" className="flex items-center space-x-2">
               
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
                </svg>

             
                {isSidebarOpen && <span className="whitespace-nowrap">Completed Tasks</span>}
              </Link>
            </li>

              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex flex-col flex-1 h-full max-h-full overflow-y-scroll">
        <header className="sticky top-0 flex items-center flex-shrink-0 w-full h-full bg-opacity-100 bg-blue-50 max-h-14">
          <div className="flex items-center flex-shrink-0 xl:hidden">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 text-blue-600 rounded-full hover:bg-blue-200"
              aria-label="Sidenav button"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between flex-1">
            <a href="#" className="flex-shrink-0 ml-2 text-2xl font-bold tracking-widest text-blue-800 uppercase">
              Student Task Manager
            </a>
          </div>
        </header>

        <div className="flex flex-col flex-1 max-h-full pl-2 pr-2 rounded-md xl:pr-4">
          <main className="flex-1 pt-2">
            <div className="p-4 text-white bg-blue-500 rounded-md shadow-md">
              <div className="flex items-center justify-center">
                <span className="text-3xl font-semibold tracking-wider uppercase">Task List</span>
              </div>
            </div>

            {/* ✅ Task List Section */}
            <div className="p-4 mt-4 bg-white rounded-md shadow-md">
              {tasks.length === 0 ? (
                <span className="text-gray-400">No tasks yet...</span>
              ) : (
                <ul className="space-y-2">
                  {tasks.filter((task) => !task.completed).map((task) => (
                    <li
                      key={task.id}
                      className={`p-3 rounded shadow-sm flex justify-between items-center ${
                        task.priority === 'High'
                          ? 'bg-red-200'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-200'
                          : 'bg-green-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{task.title}</div>
                        <div className="text-sm text-gray-700">{task.subject}</div>
                        <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                        <div className="text-xs text-gray-500">Teacher: {task.teacher}</div>
                      </div>
                      <span className="text-sm">
                        {task.completed ? "✅ Done" : "⏳ Pending"}
                      </span>
                     <label >
                      <input
                        type="checkbox"
                        checked={task.completed || false}
                        onChange={(e) => onToggleCompleted(task.id, e.target.checked)}
                      />
                    </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 text-center">
        <Link to="/add-task" className="inline-flex items-center space-x-2 text-blue-600 hover:underline">
          <span>Add Task</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
        </Link>
      </div>
      <div className="mt-6 text-center">
          <Link to="/completed-task" className="text-blue-600">
             Completed Tasks →
          </Link>
          </div>
          </main>

         
        </div>
      </div>
    </div>
    
  );
}
