import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!securityQuestion || !securityAnswer) {
      toast.error("Please provide a security question and answer");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://yatra-backend-admin.onrender.com/api/auth/register", {
        name,
        email,
        password,
        // role,
        securityQuestion,
        securityAnswer,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-bg relative">
      <Toaster position="top-right" />
      <motion.div
        className="gradient-blur absolute w-full h-full top-0 left-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 relative z-10"
      >
        {/* Role Selector */}
        {/* <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              role === "admin"
                ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("superadmin")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              role === "superadmin"
                ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Super Admin
          </button>
        </div> */}

        <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1FCC79] to-[#00A76F] mb-6">
          {/* Create Your {role === "admin" ? "Admin" : "Super Admin"} Account */}
          Assign a New Admin
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Security Question */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Security Question
            </label>
            <input
              type="text"
              placeholder="E.g. What is your favorite color?"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79]"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              required
            />
          </div>

          {/* Security Answer */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Answer
            </label>
            <input
              type="text"
              placeholder="Enter your answer"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79]"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79] pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1FCC79]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-2.5 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-[#1FCC79] to-[#00A76F]"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already Assigned as Admin👉{" "}
          <Link
            to="/login"
            className="text-[#00A76F] font-medium hover:underline "
          >
            Admin Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
