 import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AssignRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState("");

  const handleAssign = (e) => {
    e.preventDefault();
    // Save assigned route logic here (API or state)
    alert(`Route "${route}" assigned to vehicle ID: ${id}`);
    navigate("/vehicles");
  };

  return (
    <div className="p-6 mt-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xs w-[90%] max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
          Assign Route to Vehicle #{id}
        </h2>

        <form onSubmit={handleAssign} className="flex flex-col gap-4">
          <select
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select Route</option>
            <option value="Route A">Route A</option>
            <option value="Route B">Route B</option>
            <option value="Route C">Route C</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/vehicles")}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#1FCC79] to-[#00A76F]"
            >
              Assign
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
