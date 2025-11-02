import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicle from "./pages/Vehicle";
import RoutePage from "./pages/RoutePage";
import LiveMap from "./pages/LiveMap";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AssignRoute from "./pages/AssignRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DriverDetails from "./pages/DriverDetails";
import VehicleDetails from "./pages/VehicleDetail";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <div className="gradient-bg text-gray-800">
      {!hideLayout && <Sidebar onToggle={setIsCollapsed} />}

      <div className="flex-1 flex flex-col transition-all duration-300">
        {!hideLayout && <Navbar isCollapsed={isCollapsed} />}

        <main
          className={`flex-1 overflow-y-auto relative z-10 ${
            hideLayout ? "p-0 mt-0" : "p-6 mt-16"
          }`}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/drivers"
                element={
                  <ProtectedRoute>
                    <Drivers collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/drivers/:id"
                element={
                  <ProtectedRoute>
                    <DriverDetails collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vehicles"
                element={
                  <ProtectedRoute>
                    <Vehicle collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assign-route/:id"
                element={
                  <ProtectedRoute>
                    <AssignRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vehicles/:id"
                element={
                  <ProtectedRoute>
                    <VehicleDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/routes"
                element={
                  <ProtectedRoute>
                    <RoutePage collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <LiveMap collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/incidents"
                element={
                  <ProtectedRoute>
                    <Incidents collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications collapsed={isCollapsed} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    // <Router>
    <AppContent />
    // </Router>
  );
}

