import React from "react";
import { motion } from "framer-motion";

const FakePaymentModal = ({ amount, onClose, onSuccess }) => {
  const handlePay = () => {
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1200); // delay for animation
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center relative">
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">🔐 Secure Payment</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Pay ৳{amount} to complete your parcel order.</p>
        <button
          onClick={handlePay}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md transition-transform hover:scale-105"
        >
          ✅ Confirm Payment
        </button>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          ✖
        </button>
      </div>
    </motion.div>
  );
};

export default FakePaymentModal;
