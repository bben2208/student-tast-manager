import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTask from './pages/AddTask';
import CompletedTasks from './pages/CompletedTasks';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
      <Route path="/completed-task" element={<PrivateRoute><CompletedTasks /></PrivateRoute>} />
    </Routes>
  );
}

export default App; 
