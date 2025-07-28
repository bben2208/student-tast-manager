import { useEffect, useState } from "react";
import api from "../services/api";

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(res.data)) {
          console.error("❌ Tasks data is corrupted or not an array:", res.data);
          setCompletedTasks([]);
          return;
        }

        const completedOnly = res.data.filter((task) => task.completed === true);
        setCompletedTasks(completedOnly);
      } catch (err) {
        console.error("❌ Failed to fetch completed tasks:", err);
        setCompletedTasks([]);
      }
    };

    fetchCompleted();
  }, [refreshTrigger]);

  const onToggleIncomplete = async (taskId, isChecked) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/assignments/${taskId}`, {
        completed: isChecked,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompletedTasks((prev) => prev.filter((task) => task._id !== taskId));
      setRefreshTrigger((prev) => !prev);
    } catch (err) {
      console.error("❌ Error toggling back to incomplete:", err);
    }
  };

  // ✅ ADD THIS FUNCTION
  const onDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/assignments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompletedTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
    }
  };

  return {
    completedTasks,
    onToggleIncomplete,
    onDeleteTask, // ✅ EXPORT IT
  };
};

export default useCompletedTasks;
