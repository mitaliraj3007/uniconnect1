import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function Login({ onLogin }) {
  // --- STATE ---
  const [isLogin, setIsLogin] = useState(true); // True = Login mode, False = Sign Up mode
  const [username, setUsername] = useState(""); // Only used for Sign Up  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  // --- HANDLE FORM SUBMISSION ---
  const handleSubmit = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password");
      return;
    }
    if (!isLogin && !username.trim()) {
      alert("Please enter your name to sign up");
      return;
    }

    // Determine which API route to hit based on the mode
    // (Ensure your backend routes in server.js/authRoutes.js match these names!)
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    
    // Create the data object to send
    const payload = isLogin 
      ? { email, password } 
      : { username, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token and user data
        localStorage.setItem("token", data.token);
        
        // Use the user data from the backend, or fallback to a basic object
        onLogin(data.user || { name: name || email.split("@")[0], email }); 
        navigate("/select-college");
      } else {
        alert(data.message || `${isLogin ? "Login" : "Sign up"} failed. Please try again.`);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Something went wrong connecting to the server.");
    }
  };

  // --- GUEST & ADMIN LOGIN ---
  const handleGuestLogin = () => {
    onLogin({ name: "Guest User", email: "guest@gmail.com" });
    navigate("/select-college");
  };

  const handleAdminLogin = () => {
    onLogin({ name: "Admin", email: "admin@uniconnect.com", role: "admin" });
    navigate("/select-college");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        UniConnect
      </motion.h1>

      <motion.div
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* NAME INPUT (Only shows if isLogin is false) */}
        <AnimatePresence>
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full w-full overflow-hidden"
            >
              <label className="w-full text-left mb-2 text-gray-300 font-medium block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={username}
                onChang
                e={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              />
            </motion.div>
          )}
        </AnimatePresence>

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
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-purple-300 hover:text-white transition underline"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>

        <div className="my-4 text-gray-400 text-sm w-full text-center border-b border-gray-600 leading-[0.1em]">
          <span className="bg-[#1c1230] px-2 text-gray-400">OR</span>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Continue as Guest
        </button>
      </motion.div>

      <p className="mt-10 text-gray-400 text-sm">© 2025 UniConnect</p>
    </motion.div>
  );
}