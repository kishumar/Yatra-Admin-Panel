 


import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Send, Trash2 } from "lucide-react";

export default function Notification({ collapsed}) {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "public",
  });

  // Send Notification
  const sendNotification = () => {
    if (!newNotification.title || !newNotification.message) return;

    setNotifications([
      ...notifications,
      { ...newNotification, id: Date.now(), date: new Date().toLocaleString() },
    ]);

    setNewNotification({ title: "", message: "", type: "public" });
  };

  // Delete Notification
  const deleteNotification = (id) =>
    setNotifications(notifications.filter((n) => n.id !== id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xs transition-all duration-300 ${
        collapsed ? "ml-20" : "ml-64"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
        Notifications
      </h2>

      {/* New Notification Form */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border rounded-lg px-3 py-2 w-60 outline-none focus:ring-2 focus:ring-emerald-400"
          value={newNotification.title}
          onChange={(e) =>
            setNewNotification({ ...newNotification, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Message"
          className="border rounded-lg px-3 py-2 w-80 outline-none focus:ring-2 focus:ring-emerald-400"
          value={newNotification.message}
          onChange={(e) =>
            setNewNotification({ ...newNotification, message: e.target.value })
          }
        />
        <select
          className="border rounded-lg px-3 py-2 w-48 outline-none focus:ring-2 focus:ring-emerald-400"
          value={newNotification.type}
          onChange={(e) =>
            setNewNotification({ ...newNotification, type: e.target.value })
          }
        >
          <option value="public">Public</option>
          <option value="driver">Driver</option>
          <option value="passenger">Passenger</option>
        </select>
        <button
          onClick={sendNotification}
          className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 shadow-md hover:brightness-105 transition"
        >
          <Send size={16} /> Send
        </button>
      </div>

      {/* Notification List */}
      <div className="grid gap-4">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white/80 backdrop-blur-md border rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 text-[#00A76F]">
                  <Bell /> {n.title}
                </h3>
                <p className="text-gray-700">{n.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Type: {n.type.charAt(0).toUpperCase() + n.type.slice(1)} |{" "}
                  Date: {n.date}
                </p>
              </div>
              <button
                onClick={() => deleteNotification(n.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:brightness-110 transition"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No notifications sent yet.</p>
        )}
      </div>
    </motion.div>
  );
}

