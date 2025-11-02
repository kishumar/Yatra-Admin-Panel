import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LogIn } from "lucide-react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://yatra-backend-admin.onrender.com/api/auth/login",
        
        { email, password },
        { withCredentials: true }
      );
      toast.success(`Welcome ${res.data.user.name}`);
      if (onLogin) onLogin(role);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative overflow-hidden "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/7f/ae/3f/7fae3f584612122595c6d272addd5d5a.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
    {/* Subtle Blur Overlay */}
<div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />


      {/* Main Content */}
      <div className="relative z-10 w-full flex items-center justify-center ">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-black/50 backdrop-blur-md rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)] flex overflow-hidden w-[900px] h-[480px] max-w-[95%] border border-white/10"
        >
          {/* Left Illustration */}
          <div className="hidden md:flex flex-col justify-end bg-linear-to-br from-[#00c27a]/10 to-[#004d39]/20 w-[45%] p-6 relative">
            <div className="absolute inset-4 flex items-center justify-center">
              <img
                src="/mp.gif"
                alt="login"
                className="w-full h-auto object-contain opacity-90 rounded-2xl"
              />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Yatra Admin
              </h2>
              <p className="text-gray-300 mt-1 text-xs">
                Manage routes, track buses, and monitor operations.
              </p>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="w-full md:w-[55%] bg-black/60 backdrop-blur-md p-8 flex flex-col justify-center rounded-r-3xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-400 mt-1 text-xs">
                Access your dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00c27a] transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-white w-full placeholder-gray-500 focus:outline-none focus:border-[#00c27a] transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right mt-1.5">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-gray-400 hover:text-[#00c27a] transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-1 bg-linear-to-r from-[#00c27a] to-[#00ffae] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00c27a]/30 transition-all"
                disabled={loading}
              >
                <LogIn size={18} />
                {loading ? "Logging in..." : "Login"}
              </motion.button>

              <p className="text-center text-gray-500 text-xs mt-2">
                Need to add a new admin?{" "}
                <Link
                  to="/register"
                  className="text-[#00c27a] font-medium hover:text-[#00ffae] transition-colors"
                >
                  Assign Admin
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
