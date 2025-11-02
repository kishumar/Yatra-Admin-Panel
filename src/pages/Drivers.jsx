import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Edit, Ban, CheckCircle, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Drivers({ collapsed }) {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: "", license: "", contact: "" });
  const [editingDriver, setEditingDriver] = useState(null);
  const [editPayload, setEditPayload] = useState({ name: "", license: "", contact: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/drivers");
      setDrivers(res.data.drivers || []);
    } catch (err) {
      console.error("Error fetching drivers", err);
      toast.error("Unable to load drivers");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Add driver
  const addDriver = async (e) => {
    e.preventDefault();
    if (!newDriver.name || !newDriver.license || !newDriver.contact) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/drivers", newDriver);
      setDrivers((prev) => [...prev, res.data.driver]);
      toast.success("Driver added successfully!");
      setNewDriver({ name: "", license: "", contact: "" });
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding driver!");
    }
  };

  // Toggle status
  const toggleDriverStatus = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/drivers/${id}/status`);
      const updatedStatus = res.data.driver.status;
      setDrivers((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: updatedStatus } : d))
      );
      toast.success(`Driver ${updatedStatus === "active" ? "activated" : "blocked"}`);
    } catch (err) {
      console.error(err);
      toast.error("Error changing status!");
    }
  };

  // Edit modal
  const openEditModal = (driver) => {
    setEditingDriver(driver);
    setEditPayload({ name: driver.name, license: driver.license, contact: driver.contact });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingDriver) return;
    const { _id } = editingDriver;
    if (!editPayload.name || !editPayload.license || !editPayload.contact) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/drivers/${_id}`, editPayload);
      const updatedDriver = res.data.driver;
      setDrivers((prev) => prev.map((d) => (d._id === _id ? updatedDriver : d)));
      toast.success("Driver updated successfully!");
      setShowEditModal(false);
      setEditingDriver(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating driver");
    }
  };

  return (
    <div
      className={`p-6 mt-16 transition-all duration-300 ${
        collapsed ? "ml-20" : "ml-64"
      }`}
    >
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
            Driver Management
          </h2>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white px-4 py-2 rounded-lg shadow hover:scale-[1.03] transition"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} /> Add Driver
          </button>
        </div>

        {/* Driver Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-gray-700 border-b bg-emerald-50">
                <th className="p-3">Name</th>
                <th className="p-3">License No.</th>
                <th className="p-3">Contact</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr
                  key={driver._id}
                  className="border-b hover:bg-emerald-50/50 transition cursor-pointer"
                >
                  <td
                    className="p-3 font-medium text-emerald-700 hover:underline"
                    onClick={() => navigate(`/drivers/${driver._id}`)}
                  >
                    {driver.name}
                  </td>
                  <td className="p-3">{driver.license}</td>
                  <td className="p-3">{driver.contact}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      driver.status === "active"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {driver.status}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(driver)}
                      className="p-2 rounded-lg hover:bg-emerald-100"
                    >
                      <Edit size={18} className="text-emerald-600" />
                    </button>
                    <button
                      onClick={() => toggleDriverStatus(driver._id)}
                      className="p-2 rounded-lg hover:bg-emerald-100"
                    >
                      {driver.status === "active" ? (
                        <Ban size={18} className="text-red-500" />
                      ) : (
                        <CheckCircle size={18} className="text-emerald-600" />
                      )}
                    </button>
                    <button
                      onClick={() => navigate(`/drivers/${driver._id}`)}
                      className="p-2 rounded-lg hover:bg-emerald-100"
                    >
                      <Eye size={18} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Smooth Glassmorphic Modals */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-[90%] max-w-md"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setEditingDriver(null);
                }}
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
                {showAddModal ? "Add New Driver" : "Edit Driver"}
              </h3>

              <form
                onSubmit={showAddModal ? addDriver : handleEditSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Driver Name"
                  value={
                    showAddModal ? newDriver.name : editPayload.name || ""
                  }
                  onChange={(e) =>
                    showAddModal
                      ? setNewDriver({ ...newDriver, name: e.target.value })
                      : setEditPayload({ ...editPayload, name: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="License Number"
                  value={
                    showAddModal ? newDriver.license : editPayload.license || ""
                  }
                  onChange={(e) =>
                    showAddModal
                      ? setNewDriver({ ...newDriver, license: e.target.value })
                      : setEditPayload({ ...editPayload, license: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={
                    showAddModal ? newDriver.contact : editPayload.contact || ""
                  }
                  onChange={(e) =>
                    showAddModal
                      ? setNewDriver({ ...newDriver, contact: e.target.value })
                      : setEditPayload({ ...editPayload, contact: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#1FCC79] to-[#00A76F] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {showAddModal ? "Add" : "Save"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
