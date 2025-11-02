 



import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AddItemModal({ type, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dlNumber: "",
    vehicleNumber: "",
    vehicleType: "",
    routeName: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      if (file) data.append("image", file);

      const endpoint = {
        drivers: "/drivers",
        vehicles: "/vehicles",
        routes: "/routes",
      };

      const res = await api.post(endpoint[type], data);

      toast.success("Added Successfully!");
      onSuccess(res.data);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-lg text-gray-800">
            Add {type.slice(0, -1)}
          </h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* DRIVER */}
        {type === "drivers" && (
          <div className="space-y-3">
            <input placeholder="Driver Name" name="name" onChange={change} className="input" />
            <input placeholder="Phone" name="phone" onChange={change} className="input" />
            <input placeholder="DL Number" name="dlNumber" onChange={change} className="input" />
          </div>
        )}

        {/* VEHICLE */}
        {type === "vehicles" && (
          <div className="space-y-3">
            <input placeholder="Vehicle Name" name="name" onChange={change} className="input" />
            <input placeholder="Vehicle Number" name="vehicleNumber" onChange={change} className="input" />
            <input placeholder="Vehicle Type" name="vehicleType" onChange={change} className="input" />
          </div>
        )}

        {/* ROUTE */}
        {type === "routes" && (
          <div className="space-y-3">
            <input placeholder="Route Name" name="routeName" onChange={change} className="input" />
          </div>
        )}

        {/* File Upload */}
        <label className="block mt-3">
          <span className="text-sm font-black text-gray-700">Upload Image/Doc (optional)</span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 w-full"
          />
        </label>

        {/* Submit */}
        <button
          disabled={loading}
          onClick={submit}
          className="w-full mt-5 py-2 rounded-lg font-black text-white bg-gradient-to-r from-[#1FCC79] to-[#00A76F]"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </motion.div>
    </div>
  );
}
