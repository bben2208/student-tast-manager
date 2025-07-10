import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const useDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280);
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const { user } = useAuth();

  // Load tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/assignments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch tasks:", err);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  // Apply dark mode theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // PATCH: toggle task completed
  const onToggleCompleted = async (taskId, isChecked) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/api/assignments/${taskId}`, {
        completed: isChecked,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === taskId ? { ...task, completed: isChecked } : task
        )
      );
    } catch (err) {
      console.error("❌ Failed to update task status:", err);
    }
  };

  return {
    isSidebarOpen,
    setSidebarOpen,
    tasks,
    dark,
    setDark,
    onToggleCompleted,
  };
};

export default useDashboard;
