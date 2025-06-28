import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTask = () => {
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

  const handleSubmit = (e) => {
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

    // ✅ Save to localStorage
    try {
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const newTask = {
        ...task,
        id: Date.now(),
        completed: false,
      };

      localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));

      setMessage({ type: 'success', text: 'Task added successfully!' });

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save task locally.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Add a New Task</h2>

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
        <input type="text" name="teacher" placeholder="Teacher" value={task.teacher} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <select name="priority" value={task.priority} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input type="file" name="attachment" onChange={(e) => setTask({ ...task, fileName: e.target.files[0]?.name })} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Task'}
        </button>
      </form>

{/* ✅ Back to Dashboard Link */}
<div className="mt-4 text-center">
  <Link to="/dashboard" className="inline-flex items-center space-x-2 text-blue-600 hover:underline">
    <span>Back to Dashboard</span>
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </Link>
</div>

</div>

  
    
  );
};

export default AddTask;
