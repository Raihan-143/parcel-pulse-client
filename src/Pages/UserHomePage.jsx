import React, { useEffect, useState } from "react";;
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Pencil } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c", "#d76bff"];

const UserHomePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [tracking, setTracking] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/parcels/user/${user.email}`).then((res) => setParcels(res.data));
      axiosSecure.get(`/tracking/user/${user.email}`).then((res) => setTracking(res.data));
    }
  }, [user, axiosSecure]);

  const parcelStats = [
    "unpaid",
    "paid",
    "ready-to-pickup",
    "in-transit",
    "reached-service-center",
    "shipped",
    "ready-to-delivery",
    "delivered",
  ];

  const data = parcelStats.map((status) => ({
    name: status,
    value: parcels.filter((p) => p.status === status).length,
  }));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex flex-col justify-between"
      >
        <div className="flex items-center gap-4">
          <img src={user?.photoURL} alt="user" className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow" />
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">{user?.displayName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>
          </div>
        </div>
        <button className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          <Pencil className="w-4 h-4 mr-2" /> Edit Profile
        </button>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">📦 Parcel Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tracking Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">🔍 Your Tracking Updates</h3>
        <div className="space-y-4">
          {tracking.map((t, idx) => (
            <div
              key={idx}
              className="border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm"
            >
              <p className="text-sm text-gray-700 dark:text-gray-100">
                📦 <strong>{t.trackingId}</strong> - {t.status}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">{t.updatedAt}</p>
              <button className="mt-1 text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                View Details
              </button>
            </div>
          ))}
          {!tracking.length && <p className="text-sm text-gray-400">No tracking updates found.</p>}
        </div>
      </motion.div>
    </section>
  );
};

export default UserHomePage;
