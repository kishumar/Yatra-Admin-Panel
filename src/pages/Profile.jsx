import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editField, setEditField] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("https://yatra-backend-admin.onrender.com/api/profile", {
          withCredentials: true,
        });

        const u = data.user;

        setProfile({
          name: u.name,
          email: u.email,
          phone: u.phone || "Not set",
          role: "Admin",
          lastLogin: new Date(u.updatedAt).toLocaleString(),
          password: "",
        });
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
    setTempValue(profile[field]);
  };

  const handleSave = async (field) => {
    try {
      if (field === "password") {
        await axios.put(
          "https://yatra-backend-admin.onrender.com/api/profile/password",
          { password: tempValue },
          { withCredentials: true }
        );
      } else {
        await axios.put(
          "https://yatra-backend-admin.onrender.com/api/profile",
          { [field]: tempValue },
          { withCredentials: true }
        );
      }

      setProfile({ ...profile, [field]: tempValue });
    } catch (error) {
      console.error("Update Error:", error);
    }

    setEditField("");
  };

  if (!profile) return <p className="mt-16 text-center">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xs max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
        Admin Profile
      </h2>

      <div className="flex flex-col gap-6">
        {[
          { label: "Full Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Phone", key: "phone" },
          { label: "Role", key: "role", editable: false },
          { label: "Last Login", key: "lastLogin", editable: false },
          { label: "Password", key: "password" },
        ].map(({ label, key, editable = true }) => (
          <div key={key} className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700 w-32">{label}:</span>

            {editField === key ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type={key === "password" && !showPassword ? "password" : "text"}
                  className="border rounded-lg px-3 py-1 flex-1 focus:ring-2 focus:ring-[#00A76F] outline-none"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />

                {key === "password" && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                )}

                <button
                  onClick={() => handleSave(key)}
                  className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white px-3 py-1 rounded-lg shadow hover:brightness-105 flex items-center gap-1"
                >
                  <Save size={16} /> Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between flex-1">
                <span className="text-gray-800 flex-1">{profile[key]}</span>
                {editable && (
                  <Edit2
                    size={18}
                    className="text-[#00A76F] cursor-pointer"
                    onClick={() => handleEditClick(key)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}