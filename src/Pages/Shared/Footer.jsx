import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 mt-2">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 backdrop-blur-md bg-opacity-10 rounded-lg">

        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-black bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <img src='/icon1.png' alt="" />
            </div>
           <p className='ml-4 text-3xl font-bold'>Parcel<span className="text-amber-500">Pulse</span></p>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            The smartest parcel tracking platform. Know where your package is, anytime. Fast, reliable, and simple.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/track" className="hover:text-white transition">Track Parcel</a></li>
            <li><a href="/services" className="hover:text-white transition">Services</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Support</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@parcelpulse.com</p>
          <p className="text-sm text-gray-400">Phone: +880-123456789</p>

          <div className="flex space-x-5 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transform hover:scale-125 transition duration-300">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-125 transition duration-300">
              <FaLinkedinIn size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transform hover:scale-125 transition duration-300">
              <FaGithub size={22} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">ParcelPulse</span>. All rights reserved.
      </div>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-xl hover:scale-110 transition"
        >
          <FaArrowUp className="text-white text-xl" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
