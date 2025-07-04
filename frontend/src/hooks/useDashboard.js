import { useState, useEffect } from 'react';

const useDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280);
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Apply theme based on dark mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Toggle completed task
  const onToggleCompleted = (taskId, isChecked) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: isChecked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return {
    isSidebarOpen,
    setSidebarOpen,
    tasks,
    dark,
    setDark,
    onToggleCompleted
  };
};

export default useDashboard;
