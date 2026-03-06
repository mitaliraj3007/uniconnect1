import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api"; // <-- Import your API url

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // <-- Add password state
  const navigate = useNavigate();

  // Make this function async to handle the backend request
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password");
      return;
    }

    try {
      // 1. Send the login request to your backend
      // Note: check your backend routes to make sure "/auth/login" is the correct path!
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Check if login was successful
      if (response.ok) {
        // 3. Save the JWT token to localStorage so the browser remembers you
        localStorage.setItem("token", data.token); 
        
        // 4. Update the app state with the real user data from the database
        onLogin(data.user); 
        navigate("/select-college");
      } else {
        // If password is wrong or user doesn't exist
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong connecting to the server.");
    }
  };

  // ... (Keep your handleGuestLogin and handleAdminLogin the same for now)

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1 className="text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        UniConnect
      </motion.h1>

      <motion.div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center">
        <label className="w-full text-left mb-2 text-gray-300 font-medium">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
        />

        {/* ADDED PASSWORD INPUT HERE */}
        <label className="w-full text-left mb-2 text-gray-300 font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
        />

        <button
          onClick={handleLogin}
          className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>

        {/* ... (Keep your Guest and Admin buttons here) ... */}
      </motion.div>
    </motion.div>
  );
}