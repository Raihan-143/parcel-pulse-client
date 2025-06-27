import React from "react";
import { motion } from "framer-motion";
import { LogOut, Home, Truck, Info } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { role } = useUserRole(); // e.g., 'user', 'admin'

  const navLinks = [
    { to: "/dashboard", icon: Home, label: "User Home", roles: ["user", "admin"] },
    { to: "/dashboard/tracking", icon: Truck, label: "Tracking", roles: ["user"] },
    { to: "/", icon: Info, label: "Home", roles: ["user", "admin"] },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#0f172a] dark:via-[#0c1b32] dark:to-[#0a1629]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white dark:bg-slate-900 p-6 border-r border-slate-200 dark:border-slate-700 shadow-xl"
      >
        {/* Logo + User Info */}
        <div className="text-center space-y-3">
          {/* Logo and App Name */}
          <NavLink to="/" className="flex items-center justify-center gap-2">
            <img src="/icon1.png" alt="Parcel Pulse Logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              Parcel<span className="text-amber-600">Pulse</span>
            </span>
          </NavLink>

          {/* User Info */}
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
            {user?.displayName || "User"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-300 break-all">
            {user?.email}
          </p>
          <span className="inline-block px-3 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white shadow">
            Role: {role || "user"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2">
          {navLinks
            .filter(link => link.roles.includes(role))
            .map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 font-medium ${
                    isActive
                      ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon className="w-5 h-5" /> {label}
              </NavLink>
            ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
