import { motion } from "framer-motion";

export default function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass p-5 bg-gray-200 rounded-xl shadow-sm flex items-center justify-between"
    >
      <div>
        <p className="text-gray-700 text-md font-semibold">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>
      <div className="text-gray/70">{icon}</div>
    </motion.div>
  );
}
