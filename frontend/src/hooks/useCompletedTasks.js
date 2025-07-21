import { useEffect, useState } from "react";

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load completed tasks on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedOnly = savedTasks.filter(task => task.completed === true);
    setCompletedTasks(completedOnly);
  }, []);

  // Toggle back to incomplete
  const onToggleIncomplete = (taskId, isChecked) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = allTasks.map((task) =>
      task.id === taskId ? { ...task, completed: isChecked } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setCompletedTasks(updatedTasks.filter((task) => task.completed));
  };

  return { completedTasks, onToggleIncomplete };
};

export default useCompletedTasks;
