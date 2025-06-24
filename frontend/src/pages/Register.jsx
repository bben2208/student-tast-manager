import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link added here
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", form);
      login(res.data); // ✅ save user to context
      navigate("/dashboard"); // ✅ redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">

        {/* LEFT SIDE */}
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">Assignment Tracker</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
          Sign up now to manage deadlines, track your progress, and stay ahead in your studies with Student Assignment Tracker.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account?</span>
            <Link to="/login" className="underline">Log in</Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Create Account</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">

            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm font-semibold text-gray-500">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
