import { useEffect, useState } from "react";
import api from "../services/api";

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // 🔄 trigger reload

  // Fetch completed tasks
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
  }, [refreshTrigger]); // ✅ re-run when toggled

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

      // ✅ Force refetch of tasks to stay in sync
      setRefreshTrigger((prev) => !prev);
    } catch (err) {
      console.error("❌ Error toggling back to incomplete:", err);
    }
  };

  return { completedTasks, onToggleIncomplete };
};

export default useCompletedTasks;
