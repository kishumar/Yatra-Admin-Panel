import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email, securityAnswer }
      );
      toast.success(res.data.message);
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/47/6d/48/476d481b5468fef778f379d9c7b26278.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[380px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00ffae] to-[#00b87a] mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00c27a] transition-all"
            required
          />

          <input
            type="text"
            placeholder="Enter your security answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00c27a] transition-all"
            required
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 bg-gradient-to-r from-[#00ffae] to-[#00b87a] text-black font-semibold py-3 rounded-xl shadow-[0_0_20px_#00ffae60] hover:shadow-[#00ffae]/40 transition-all"
          >
            Verify Answer
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
