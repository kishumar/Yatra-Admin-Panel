 


  
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Car,
  Map,
  AlertTriangle,
  BarChart3,
  Bell,
  Settings,
  User,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Drivers", icon: Users, path: "/drivers" },
  { name: "Vehicles", icon: Car, path: "/vehicles" },
  { name: "Routes", icon: Map, path: "/routes" },
  { name: "Live Map", icon: Map, path: "/map" },
  { name: "Incidents", icon: AlertTriangle, path: "/incidents" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Notifications", icon: Bell, path: "/notifications" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Profile", icon: User, path: "/profile" },
];

export default function Sidebar({ onToggle }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://yatra-backend-admin.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logout successful!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed!");
    }
  };

  return (
    <motion.div
      animate={{ width: collapsed ? "80px" : "256px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-white/70 backdrop-blur-xl shadow-xs flex flex-col border-r border-emerald-100 z-50"
    >
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between py-6 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-2xl font-extrabold bg-linear-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent whitespace-nowrap">
            Yatra
          </h1>
        )}
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg hover:bg-emerald-50 transition"
        >
          {collapsed ? (
            <ChevronLeft size={22} className="text-[#00A76F]" />
          ) : (
            <Menu size={22} className="text-[#00A76F]" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
        {navItems.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <motion.div
              key={name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={path}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3 px-5"
                } py-3 rounded-lg mx-3 transition-all ${
                  isActive
                    ? "bg-linear-to-r from-[#1FCC79] to-[#00A76F] text-white shadow-md"
                    : "text-gray-700 hover:bg-emerald-50"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span className="font-medium">{name}</span>}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3 px-5"
          } py-4 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all w-full`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}









 

 