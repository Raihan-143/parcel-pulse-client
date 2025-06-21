import React from "react";
import { motion } from "framer-motion";


const BeMerchant = () => {
  return (
    <div className="py-20 px-5  md:px-24 bg-gradient-to-br from-[#fce4ec] via-[#f3e5f5] to-[#e0f7fa] mt-5 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side Image */}
        <motion.div
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 mb-8">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>

          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Become a Merchant
            </button>

            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Earn with Profast Courier
            </button>
          </div>
        </motion.div>
       
        {/* Right Side Content */}
         <motion.div
          className="md:w-1/2 w-full flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-5 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl">
            <img
              src="/location-merchant.png"
              alt="Merchant"
              className="w-[400px] h-auto object-contain drop-shadow-xl"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-500 opacity-10 blur-3xl"></div>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default BeMerchant;
