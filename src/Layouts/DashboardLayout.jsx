import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Home, Truck, Info, Menu, PackageSearch } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { role } = useUserRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
  { to: "/dashboard", icon: Home, label: "User Home", roles: ["user", "admin"] },
  { to: "/dashboard/tracking", icon: Truck, label: "Tracking", roles: ["user"] },
  { to: "/dashboard/my-parcels", icon: PackageSearch, label: "My Parcels", roles: ["user"] }, // ✅ fixed icon
  { to: "/", icon: Info, label: "Home", roles: ["user", "admin"] },
];

  const SidebarContent = () => (
    <div className="p-6 space-y-6">
      {/* Logo + User Info */}
      <NavLink to="/" className="flex items-center gap-2">
        <img src="/icon1.png" alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-slate-800 dark:text-white">
          Parcel<span className="text-amber-600">Pulse</span>
        </span>
      </NavLink>

      <div className="text-center space-y-1">
        <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          {user?.displayName || "User"}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-300 break-all">{user?.email}</p>
        <span className="inline-block px-3 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white shadow">
          Role: {role || "user"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navLinks
          .filter(link => link.roles.includes(role))
          .map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsDrawerOpen(false)} // Drawer 
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
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
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 shadow-xl"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Drawer Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-indigo-600 text-white p-2 rounded-md shadow-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            className="w-64 bg-white dark:bg-slate-900 z-50 p-4 shadow-lg"
          >
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto w-full bg-slate-50 dark:bg-slate-800">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
