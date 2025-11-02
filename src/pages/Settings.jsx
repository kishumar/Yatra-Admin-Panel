// 



import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Map, Globe, Settings as SettingsIcon } from "lucide-react";

export default function Setting() {
  const [settings, setSettings] = useState({
    dashboardTheme: "Light",
    mapTheme: "Standard",
    language: "English",
  });

  const dashboardThemes = [
    { label: "Light", icon: <Sun size={20} /> },
    { label: "Dark", icon: <Moon size={20} /> },
  ];

  const mapThemes = [
    { label: "Standard", icon: <Map size={20} /> },
    { label: "Satellite", icon: <Map size={20} /> },
    { label: "Dark", icon: <Moon size={20} /> },
  ];

  const languages = [
    { label: "English", icon: <Globe size={20} /> },
    { label: "Hindi", icon: <Globe size={20} /> },
    { label: "Spanish", icon: <Globe size={20} /> },
    { label: "French", icon: <Globe size={20} /> },
  ];

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    // Call backend API to save settings if needed
  };

  const renderOptions = (options, key) =>
    options.map((option) => (
      <motion.div
        key={option.label}
        whileHover={{ scale: 1.05 }}
        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
          settings[key] === option.label
            ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white shadow-md"
            : "bg-white/80 text-gray-800 border-gray-300"
        }`}
        onClick={() => handleChange(key, option.label)}
      >
        {option.icon} {option.label}
      </motion.div>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl max-w-2xl mx-auto flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text flex items-center gap-2">
        <SettingsIcon /> Settings
      </h2>

      {/* Dashboard Theme */}
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-700 font-medium">Dashboard Theme</h3>
        <div className="flex gap-3 flex-wrap">{renderOptions(dashboardThemes, "dashboardTheme")}</div>
      </div>

      {/* Map Theme */}
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-700 font-medium">Map Theme</h3>
        <div className="flex gap-3 flex-wrap">{renderOptions(mapThemes, "mapTheme")}</div>
      </div>

      {/* Language */}
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-700 font-medium">Language</h3>
        <div className="flex gap-3 flex-wrap">{renderOptions(languages, "language")}</div>
      </div>
    </motion.div>
  );
}
