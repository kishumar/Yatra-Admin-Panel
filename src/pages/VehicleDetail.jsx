import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Car, User, MapPin, CheckCircle, Ban } from "lucide-react";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data — replace with API data or context later
  const vehicle = {
    id,
    name: "Volvo Bus 220D",
    number: "DL04 9981",
    type: "Bus",
    capacity: "40",
    status: "active",
    assignedRoute: "Route A - City Center to Airport",
    assignedDriver: {
      name: "Ravi Kumar",
      contact: "+91 9876543210",
      license: "DL-0421-5678",
    },
  };

  return (
    <div className="p-6 mt-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xs p-8 w-[90%] max-w-3xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
            Vehicle Details
          </h2>
          <button
            onClick={() => navigate("/vehicles")}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft size={20} /> Back
          </button>
        </div>

        {/* Vehicle Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-[#1FCC79]/10 to-[#00A76F]/10 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-emerald-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Vehicle Information
              </h3>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {vehicle.name}
              </p>
              <p>
                <span className="font-semibold">Number:</span> {vehicle.number}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {vehicle.type}
              </p>
              <p>
                <span className="font-semibold">Capacity:</span> {vehicle.capacity}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>{" "}
                {vehicle.status === "active" ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle size={16} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <Ban size={16} /> Inactive
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Assigned Route */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-[#1FCC79]/10 to-[#00A76F]/10 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-emerald-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Assigned Route
              </h3>
            </div>

            <p className="text-gray-700">{vehicle.assignedRoute}</p>
          </motion.div>
        </div>

        {/* Driver Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-[#1FCC79]/10 to-[#00A76F]/10 p-6 rounded-xl shadow-md mt-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="text-emerald-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Assigned Driver
            </h3>
          </div>

          <div className="text-gray-700 space-y-2">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {vehicle.assignedDriver.name}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {vehicle.assignedDriver.contact}
            </p>
            <p>
              <span className="font-semibold">License No.:</span>{" "}
              {vehicle.assignedDriver.license}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
