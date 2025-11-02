 

 import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import axios from "axios";

export default function Navbar({ isCollapsed }) {
  const [userInitial, setUserInitial] = useState("?");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://yatra-backend-admin.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        const name = res.data?.user?.name || "A";
        setUserInitial(name.charAt(0).toUpperCase());
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const notifications = [
    { id: 1, text: "New user registered successfully." },
    { id: 2, text: "Server backup completed." },
    { id: 3, text: "New order placed by customer." },
  ];

  return (
    <motion.div
      className={`flex items-center justify-between p-6 bg-white/70 backdrop-blur-xl shadow-xs z-20 relative transition-all duration-300
      ${isCollapsed ? "ml-[80px] w-[calc(100%-80px)]" : "ml-[256px] w-[calc(100%-256px)]"}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl max-md:text-[17px] font-bold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Bell icon */}
        <button
          className="relative p-2 rounded-full bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white shadow"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Initial */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#1FCC79] to-[#00A76F] flex items-center justify-center text-white font-semibold">
          {userInitial}
        </div>

        {/* Notification dropdown */}
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-72 bg-white shadow-2xl rounded-xl p-4 border border-gray-100 z-50"
          >
            <h3 className="text-sm font-semibold mb-2 text-gray-700">
              Notifications
            </h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg hover:bg-gray-100"
                >
                  {n.text}
                </li>
              ))}
            </ul>
            {notifications.length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                No new notifications
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}








 