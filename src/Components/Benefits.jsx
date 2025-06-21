import React from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { benefitsData } from "../data/benefits";

const Benefits = () => {
  return (
    <div className="py-20 px-5 md:px-24 bg-gradient-to-br from-green-100 via-amber-100 to-fuchsia-200 min-h-screen mt-5 rounded-2xl">
      <motion.h2
        className="text-5xl font-extrabold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-amber-500 to-fuchsia-500 drop-shadow-md"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Key Benefits
      </motion.h2>

      <div className="space-y-24">
        {benefitsData.map((item, index) => (
          <motion.div
            key={item.id}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <motion.div
              className="md:w-1/2 w-full flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative p-5 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl">
                <Player
                  autoplay
                  loop
                  src={item.animation}
                  className="w-80 h-80"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-500 via-amber-500 to-fuchsia-500 opacity-10 blur-3xl"></div>
              </div>
            </motion.div>

            <div className="md:w-1/2 w-full bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-white/30">
              <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-amber-500 to-fuchsia-500">
                {item.title}
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
