import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, Outlet } from 'react-router';
import loginImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#f9fafb] mt-5 rounded-2xl">

      {/* Left Side Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        {/* Top Logo */}
        <div className='flex items-center mb-10'>
          <img src="/icon1.png" alt="logo" className='w-12 mr-3' />
          <NavLink to="/" className="text-3xl font-bold text-gray-800">
            Parcel<span className='text-amber-500'>Pulse</span>
          </NavLink>
        </div>

        {/* Outlet for Login Form */}
        <Outlet />
      </div>

      {/* Right Side Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex w-1/2 bg-[#f3f4f6] justify-center items-center"
      >
        <img
          src={loginImg} // <-- Replace with your image path
          alt="Hero"
          className="w-[400px] h-auto"
        />
      </motion.div>

    </div>
  );
};

export default AuthLayout;
