import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

const TrackingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/tracking/user/${user.email}`).then(res => setTrackingData(res.data));
    }
  }, [user, axiosSecure]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">📦 Tracking Updates</h2>

      {trackingData.length ? trackingData.map((item, idx) => (
        <motion.div
          key={idx}
          className="border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm"
        >
          <p className="text-sm text-gray-700 dark:text-gray-100">
            📦 <strong>{item.trackingId}</strong> - <span className="capitalize">{item.status}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">{item.updatedAt}</p>
          <button className="mt-1 text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
            View Details
          </button>
        </motion.div>
      )) : (
        <p className="text-sm text-gray-400">No tracking updates found.</p>
      )}
    </motion.section>
  );
};

export default TrackingPage;
