import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const storedUser = localStorage.getItem('user');
const token = storedUser ? JSON.parse(storedUser).token : null;

const AddTask = () => {
  const [task, setTask] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    priority: 'Medium',
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
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      setMessage({ type: 'error', text: 'Due date must be today or in the future.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;
      
        await axios.post('http://localhost:5000/api/assignments', task, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed token source
          },
          withCredentials: true,
        });
      
        setMessage({ type: 'success', text: 'Task added successfully!' });
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (err) {
        setMessage({
          type: 'error',
          text: err.response?.data?.error || 'Failed to save task.',
        });
      }
      };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>

      {message && (
        <div
          className={`p-2 mb-4 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-4">
        <input type="text" name="title" placeholder="Title *" value={task.title} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="subject" placeholder="Subject *" value={task.subject} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="priority" value={task.priority} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
