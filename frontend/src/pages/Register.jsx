// ✅ frontend/pages/Register.jsx (with error popup)
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", form);
      if (res.data) {
        login(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      console.error("❌ Register error:", msg);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">Assignment Tracker</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Sign up now to manage deadlines, track your progress, and stay ahead.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account?</span>
            <Link to="/login" className="underline">Log in</Link>
          </p>
        </div>

        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Create Account</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="px-4 py-2 border rounded" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="px-4 py-2 border rounded" required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="px-4 py-2 border rounded" required />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
