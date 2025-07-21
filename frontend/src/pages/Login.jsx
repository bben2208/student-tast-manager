import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import api from "../services/api"; // ✅ add this


const Login = () => {
  const { login } = useAuth(); // ✅ use only this
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res =await api.post("/users/login", { email, password }); // ✅ No double /api

  
      if (res.data) {
        login({
          token: res.data.token,
          ...res.data.user,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login error:", err);
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
          With the Student Assignment Tracker, managing coursework has never been easier — stay organized, meet deadlines, and track progress effortlessly, all in one place!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="underline">Get Started!</Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
