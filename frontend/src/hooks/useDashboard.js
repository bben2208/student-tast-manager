// hooks/useDashboard.js
import { useState, useEffect } from "react";
import api from "../services/api";

const useDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1280);
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState(null); // null for loading state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(res.data)) {
          console.error("❌ Tasks data is corrupted or not an array:", res.data);
          setTasks([]);
          return;
        }

        setTasks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch tasks:", err);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  

  const onToggleCompleted = async (taskId, isChecked) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/assignments/${taskId}`, {
        completed: isChecked,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(prev =>
        prev.map((task) =>
          task._id === taskId ? { ...task, completed: isChecked } : task
        )
      );
    } catch (err) {
      console.error("❌ Error updating task completion:", err);
    }
  };

  const onDeleteTask = async (taskId) => {
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
    setTasks,
    dark,
    setDark,
    onToggleCompleted,
    onDeleteTask
  };
};

export default useDashboard;
