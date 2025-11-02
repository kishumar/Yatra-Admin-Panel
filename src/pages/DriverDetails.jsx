// src/pages/DriverDetails.jsx
import { motion } from "framer-motion";
import { Car, User } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function DriverDetails({collapsed}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get(`https://yatra-backend-admin.onrender.com/api/drivers/${id}`);
        setDriver(res.data);
      } catch (error) {
        toast.error("Failed to load driver details");
        navigate("/drivers");
      }
    };
    fetchDriver();
  }, [id, navigate]);

  if (!driver)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading driver details...</p>
      </div>
    );

  return (
    <div
      className="p-6 mt-16 transition-all duration-300"
      // className={`p-6 mt-16 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}
      style={{ marginLeft: "260px" }} // Adjusts when sidebar is open
    >
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xs p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold bg-linear-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
          Driver Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Driver Info */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-br from-[#1FCC79]/10 to-[#00A76F]/10 shadow-xs"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User size={20} className="text-emerald-600" /> Driver Information
            </h3>
            <p>
              <span className="font-semibold">Name:</span> {driver.name}
            </p>
            <p>
              <span className="font-semibold">License No:</span>{" "}
              {driver.license}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {driver.contact}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  driver.status === "active"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {driver.status}
              </span>
            </p>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-br from-[#1FCC79]/10 to-[#00A76F]/10 shadow-xs"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Car size={20} className="text-emerald-600" /> Assigned Vehicle
            </h3>
            {driver.vehicle ? (
              <>
                <p>
                  <span className="font-semibold">Vehicle Number:</span>{" "}
                  {driver.vehicle.number}
                </p>
                <p>
                  <span className="font-semibold">Model:</span>{" "}
                  {driver.vehicle.model}
                </p>
                <p>
                  <span className="font-semibold">Route:</span>{" "}
                  {driver.vehicle.route}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No vehicle assigned yet.</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
