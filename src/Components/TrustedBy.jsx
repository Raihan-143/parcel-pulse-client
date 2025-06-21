import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

// Direct import images:
import amazon from '../assets/brands/amazon.png';
import amazonVector from '../assets/brands/amazon_vector.png';
import casio from '../assets/brands/casio.png';
import moonstar from '../assets/brands/moonstar.png';
import randstad from '../assets/brands/randstad.png';
import startPeople from '../assets/brands/start-people 1.png';
import start from '../assets/brands/start.png';

const logos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  startPeople,
  start
];

const TrustedBy = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 rounded-2xl mt-5">
      <motion.div 
        className="max-w-7xl mx-auto px-4 text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <div className="flex justify-center items-center mb-4">
          <FaHandshake size={35} className="text-green-600 dark:text-green-400 mr-3" />
          <h2 className="text-4xl font-extrabold text-amber-500 dark:text-white">
            Trusted By
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          These global brands rely on ParcelPulse for their secure and seamless delivery solutions.
        </p>
      </motion.div>

      <Marquee speed={40} gradient={true} gradientWidth={80} pauseOnHover={true}>
        <div className="flex space-x-14">
          {logos.map((logo, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <img 
                src={logo} 
                alt={`Company ${index+1}`} 
                className="h-6 w-auto object-contain mx-auto drop-shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default TrustedBy;
