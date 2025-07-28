import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const useDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280);
  const [tasks, setTasks] = useState(null);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const { user } = useAuth();

  // Load tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/assignments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error("❌ Unexpected response: tasks is not an array", res.data);
          setTasks([]); // fallback to empty list to avoid crashes
        }
      } catch (err) {
        console.error("❌ Failed to fetch tasks:", err);
        setTasks([]);
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

  // ✅ PATCH: toggle task completed
  const onToggleCompleted = async (taskId, isChecked) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/assignments/${taskId}`, {
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

  // ✅ DELETE: remove task
  const onDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/assignments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
    }
  };

  return {
    isSidebarOpen,
    setSidebarOpen,
    tasks,
    dark,
    setDark,
    onToggleCompleted,
    onDeleteTask, // ✅ now properly returned
  };
};

export default useDashboard;
