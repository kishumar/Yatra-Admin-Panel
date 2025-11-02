import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, CheckCircle, Ban, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api.js";
import toast from "react-hot-toast";

export default function Vehicle({ collapsed }) {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const emptyVehicle = { number: "", type: "", capacity: "", image: "" };
  const [newVehicle, setNewVehicle] = useState(emptyVehicle);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/vehicles", { withCredentials: true });
      setVehicles(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kb9n4w2j"); // 🔁 Replace with your preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvmqxb8kd/image/upload", {
        method: "POST",
        body: data,
      });
      const uploaded = await res.json();
      setNewVehicle({ ...newVehicle, image: uploaded.secure_url });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Add / Edit Vehicle
  const addOrEditVehicle = async (e) => {
    e.preventDefault();
    try {
      if (!newVehicle.number) {
        toast.error("Vehicle number is required");
        return;
      }

      if (editId) {
        await axios.put(`/vehicles/${editId}`, newVehicle, { withCredentials: true });
        toast.success("Vehicle updated");
      } else {
        await axios.post("/vehicles", newVehicle, { withCredentials: true });
        toast.success("Vehicle added");
      }

      fetchVehicles();
      setNewVehicle(emptyVehicle);
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  // ✅ Toggle Status
  const toggleStatus = async (id, current) => {
    try {
      await axios.patch(
        `/vehicles/status/${id}`,
        { status: current === "active" ? "offline" : "active" },
        { withCredentials: true }
      );
      toast.success("Status changed");
      fetchVehicles();
    } catch {
      toast.error("Status change failed");
    }
  };

  // ✅ Delete Vehicle
  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`/vehicles/${id}`, { withCredentials: true });
      toast.success("Vehicle deleted");
      fetchVehicles();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ Open Edit Modal
  const openEditForm = (vehicle) => {
    setNewVehicle({
      number: vehicle.number,

      capacity: vehicle.capacity || "",
      image: vehicle.image || "",
    });
    setEditId(vehicle._id);
    setShowForm(true);
  };

  return (
    <div className={`p-6 mt-16 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xs p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent">
            Vehicle Management
          </h2>
          <button
            onClick={() => {
              setEditId(null);
              setNewVehicle(emptyVehicle);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <Plus size={18} /> Add Vehicle
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-gray-700 border-b bg-emerald-50">
                <th className="p-3">Image</th>
                <th className="p-3">Number</th>
           
                <th className="p-3">Capacity</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v._id} className="border-b hover:bg-emerald-50/50 transition">
                  <td className="p-3">
                    {v.image ? (
                      <img src={v.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        No Img
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{v.number}</td>
             
                  <td className="p-3">{v.capacity || "-"}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      v.status === "active" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {v.status}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button onClick={() => openEditForm(v)}>
                      <Edit size={18} className="text-emerald-600" />
                    </button>
                    <button onClick={() => toggleStatus(v._id, v.status)}>
                      {v.status === "active" ? (
                        <Ban size={18} className="text-red-500" />
                      ) : (
                        <CheckCircle size={18} className="text-emerald-600" />
                      )}
                    </button>
                    <button onClick={() => deleteVehicle(v._id)}>
                      <Trash2 size={18} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ✨ Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent">
                {editId ? "Edit Vehicle" : "Add Vehicle"}
              </h3>

              <form onSubmit={addOrEditVehicle} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  value={newVehicle.number}
                  onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
                  className="border rounded-lg p-2"
                  required
                />

             

                <input
                  type="text"
                  placeholder="Capacity"
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                  className="border rounded-lg p-2"
                />

                {/* Cloudinary Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Image</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="border rounded-lg p-2 flex-1"
                    />
                    {uploading ? (
                      <span className="text-sm text-gray-500">Uploading...</span>
                    ) : newVehicle.image ? (
                      <img src={newVehicle.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <Upload size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600"
                  >
                    {editId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
