import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import FakePaymentModal from "./FakePaymentModal"; // 👈 Modal Import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";

const MySwal = withReactContent(Swal);

const PaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/parcels/${id}`)
      .then(res => {
        setParcel(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load parcel:", err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handlePaymentSuccess = async () => {
    try {
      const res = await axiosSecure.patch(`/parcels/${id}`, { paymentStatus: "Paid" });
      if (res.data.modifiedCount > 0) {
        MySwal.fire({
          icon: "success",
          title: "✅ Payment Successful!",
          text: "Your parcel is now marked as paid.",
        });
        setParcel(prev => ({ ...prev, paymentStatus: "Paid" }));
      }
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500 dark:text-gray-300">Loading payment details...</div>;

  if (!parcel) return <div className="text-center mt-20 text-red-500">❌ Parcel not found!</div>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
        💳 Payment for Parcel
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-200">
        <p><span className="font-semibold">📌 Tracking ID:</span> {parcel.trackingId}</p>
        <p><span className="font-semibold">👤 Sender:</span> {parcel.senderName}</p>
        <p><span className="font-semibold">💰 Total Cost:</span> <span className="text-green-600 font-bold">৳{parcel.totalPrice}</span></p>
        <p><span className="font-semibold">🔄 Payment Status:</span> <span className="text-orange-500">{parcel.paymentStatus}</span></p>
      </div>

      <div className="mt-8 text-center">
        {parcel.paymentStatus !== "Paid" ? (
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-transform transform hover:scale-105 shadow-md"
          >
            🛍️ Pay Now
          </button>
        ) : (
          <span className="text-green-500 font-bold">✅ Already Paid</span>
        )}
        <p className="text-sm text-gray-400 mt-2">Demo Payment Gateway</p>
      </div>

      {/* Modal */}
      {showModal && (
        <FakePaymentModal
          amount={parcel.totalPrice}
          onClose={() => setShowModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </motion.section>
  );
};

export default PaymentPage;
