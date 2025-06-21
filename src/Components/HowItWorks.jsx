import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("/howitworks.json")
      .then(res => res.json())
      .then(data => setSteps(data));
  }, []);

  return (
    <div className="py-20 px-5 md:px-24 bg-gradient-to-b from-[#fce4ec] via-[#e0f7fa] to-[#f3e5f5] rounded-3xl my-10">
      
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-tr from-pink-500 via-blue-500 to-purple-500 p-4 rounded-full shadow-lg">
            <FaTools className="text-white text-5xl" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1f2c3f] mb-5">
          How It Works
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Start shipping your parcels with ParcelPulse in just a few simple steps. Simplify your delivery operations effortlessly with our user-friendly process.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
          >
            <div className="text-5xl mb-5">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#1f2c3f] mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
