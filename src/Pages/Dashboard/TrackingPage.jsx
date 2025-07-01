
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const TrackingPage = () => {
  const { id } = useParams(); // trackingId or parcelId
  const axiosSecure = useAxiosSecure();
  const [trackingLogs, setTrackingLogs] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/tracking/${id}`).then((res) => setTrackingLogs(res.data));
  }, [id, axiosSecure]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">📍 Live Tracking</h2>
      <div className="space-y-4">
        {trackingLogs.length ? (
          trackingLogs.map((log, index) => (
            <div
              key={index}
              className="border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800 p-4 rounded"
            >
              <p className="text-sm font-medium">
                <strong>{log.status}</strong> – {log.trackingId}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {log.updatedAt}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tracking updates found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
