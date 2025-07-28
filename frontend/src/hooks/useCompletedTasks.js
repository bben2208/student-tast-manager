// hooks/useCompletedTasks.js
import { useEffect, useState } from "react";
import api from "../services/api";

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tasks = res.data;
        const completedOnly = tasks.filter((task) => task.completed === true);
        setCompletedTasks(completedOnly);
      } catch (err) {
        console.error("❌ Failed to fetch completed tasks:", err);
      }
    };

    fetchCompleted();
  }, []);

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

      setCompletedTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.error("❌ Error toggling back to incomplete:", err);
    }
  };

  return { completedTasks, onToggleIncomplete };
};

export default useCompletedTasks;
