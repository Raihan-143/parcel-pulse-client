import React, { useEffect, useState } from 'react';
import { FaShippingFast, FaMapMarkedAlt, FaWarehouse, FaUserShield, FaHeadset, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import OurServicesHeader from './OurServicesHeader';

const iconMap = {
    FaShippingFast: <FaShippingFast size={50} className="text-blue-500 drop-shadow-lg" />,
    FaMapMarkedAlt: <FaMapMarkedAlt size={50} className="text-green-500 drop-shadow-lg" />,
    FaWarehouse: <FaWarehouse size={50} className="text-purple-500 drop-shadow-lg" />,
    FaUserShield: <FaUserShield size={50} className="text-yellow-500 drop-shadow-lg" />,
    FaHeadset: <FaHeadset size={50} className="text-pink-500 drop-shadow-lg" />,
    FaGlobe: <FaGlobe size={50} className="text-red-500 drop-shadow-lg" />
};

const OurServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/services.json')
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 rounded-2xl mt-5">
            <div className="max-w-7xl mx-auto px-4 text-center">
               <OurServicesHeader></OurServicesHeader>
                {/* <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                    At ParcelPulse, we offer a wide range of world-class parcel tracking and delivery solutions to ensure your packages are delivered swiftly, safely, and with full transparency. Experience seamless tracking, real-time updates, and unparalleled support.
                </p> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
                {services.map(service => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 backdrop-blur-md bg-opacity-60 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <div className="mb-5 flex justify-center">
                                {iconMap[service.icon]}
                            </div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 dark:text-white mb-3">{service.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OurServices;
