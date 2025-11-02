// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function ResetPassword() {
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email; // Get email from previous page
//   if (!email) {
//     toast.error("Email not provided");
//     navigate("/forgot-password");
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirm) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/reset-password", { email, otp, password });
//       toast.success(res.data.message);
//       navigate("/login"); // redirect to login
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
//         <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="border p-3 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-3 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           className="border p-3 rounded"
//           required
//         />
//         <button type="submit" className="bg-green-500 text-white p-3 rounded">Reset Password</button>
//       </form>
//     </div>
//   );
// }








import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Toaster position="top-right" />
      <motion.form
        onSubmit={handleReset}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-md shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1FCC79] to-[#00A76F] mb-4">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white p-3 rounded"
        >
          Reset Password
        </button>
      </motion.form>
    </div>
  );
}
