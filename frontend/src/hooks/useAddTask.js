import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const useAddTask = () => {
  const [task, setTask] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    teacher: '',
    priority: 'Medium',
    status: 'Pending',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.subject || !task.dueDate) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const today = new Date();
    const due = new Date(task.dueDate);
    if (due < today.setHours(0, 0, 0, 0)) {
      setMessage({ type: 'error', text: 'Due date must be today or in the future.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      await api.post("/assignments", task, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: 'success', text: 'Task added successfully!' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error("Add task error:", err);
      setMessage({ type: 'error', text: 'Failed to save task to server.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    task,
    setTask,
    loading,
    message,
    handleChange,
    handleSubmit,
    setLoading,
  };
};

export default useAddTask;
