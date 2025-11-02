import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  TrendingUp,
  Car,
  DollarSign,
  Menu,
  Bell,
  Settings,
  Search,
} from "lucide-react";

const StatCard = ({ title, value, change, icon, gradient }) => (
  <div className="hover:scale-103 transition-transform duration-300">
    <div className={`p-5 rounded-2xl bg-gradient-to-r ${gradient} text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-2xl font-semibold">{value}</span>
      </div>
      <p className="mt-3 text-sm font-medium opacity-90">{title}</p>
      <div className="mt-2">
        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium">
          {change}
        </span>
      </div>
    </div>
  </div>
);

const STATS = [
  {
    title: "Total Drivers",
    value: "248",
    change: "+12%",
    icon: <Users size={28} />,
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Active Trips",
    value: "89",
    change: "+8%",
    icon: <Car size={28} />,
    gradient: "from-sky-400 to-sky-600",
  },
  {
    title: "Revenue",
    value: "$45.2K",
    change: "+23%",
    icon: <DollarSign size={28} />,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Growth",
    value: "18.5%",
    change: "+5%",
    icon: <TrendingUp size={28} />,
    gradient: "from-[#1FCC79] to-[#00A76F]",
  },
];

const RECENT_ACTIVITIES = [
  "🚗 Driver Rajesh Kumar completed trip to Airport",
  "⚙️ Maintenance scheduled for Vehicle #A234 at 2 PM",
  "👨‍✈️ New driver Priya Sharma onboarded successfully",
  "🚧 Route optimization completed for Zone 3",
];

export default function Dashboard({ collapsed }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentDrivers, setRecentDrivers] = useState([]);
  const userName = "Admin";

  // ✅ Fetch recent drivers
  useEffect(() => {
    const fetchRecentDrivers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/drivers?recent=true");
        setRecentDrivers(res.data.drivers || []);
      } catch (error) {
        console.error("Error fetching recent drivers:", error);
      }
    };

    fetchRecentDrivers();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .hover\\:scale-103:hover {
          transform: scale(1.03);
        }
      `}</style>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header
        className="fixed top-0 right-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300"
        style={{
          left: collapsed ? "80px" : "256px",
          transition: "left 0.3s ease",
        }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A76F] focus:border-transparent"
                />
              </div>
            </div>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1FCC79] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00A76F]"></span>
              </span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#1FCC79] to-[#00A76F] flex items-center justify-center text-white text-xs font-medium">
                {userName.charAt(0)}
              </div>
              <span className="hidden text-sm font-medium md:inline text-gray-700">
                Hi, {userName}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="p-6 space-y-6 overflow-y-auto transition-all duration-300"
        style={{
          marginLeft: collapsed ? "80px" : "256px",
          marginTop: "-40px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Welcome Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your drivers and monitor your fleet performance
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Recent Drivers */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-emerald-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Users className="text-[#00A76F]" size={20} />
                Recent Drivers
              </h3>
              <p className="text-sm text-gray-600">
                Latest driver activities and status
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-medium transition-colors text-gray-700">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentDrivers.length > 0 ? (
              recentDrivers.map((driver) => (
                <div
                  key={driver._id}
                  className="flex items-center justify-between bg-white/60 p-4 rounded-xl transition-all hover:bg-white/80 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1FCC79] to-[#00A76F] flex items-center justify-center text-white font-medium text-sm">
                      {driver.name?.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">{driver.name}</h4>
                      <p className="text-sm text-gray-600">{driver.license}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      driver.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {driver.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No new drivers added in the last 24 hours
              </p>
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-2xs border border-emerald-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Activities
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <li key={i} className="leading-relaxed">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
