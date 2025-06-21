import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaCubes } from 'react-icons/fa';  // নতুন clean relevant icon

const OurServicesHeader = () => {
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 text-center mb-16"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
    >

      {/* Title with Icon */}
      <div className="flex justify-center items-center mb-6">
        <FaCubes size={40} className="text-purple-500 dark:text-blue-400 mr-3" />
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 dark:text-white relative inline-block">
          Our Services
          <span className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 rounded-full animate-pulse"></span>
        </h2>
      </div>

      {/* Subtitle with Typewriter */}
      <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
        <Typewriter
          words={[
            'Fast Delivery Solutions.',
            'Real-time Parcel Tracking.',
            'Safe & Secure Handling.',
            '24/7 Customer Support.',
            'Global Delivery Coverage.',
            'Reliable & Transparent Service.'
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </p>
    </motion.div>
  );
};

export default OurServicesHeader;
