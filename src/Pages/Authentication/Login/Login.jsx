import React from "react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {signInWithGoogle}=useAuth();
    const handleWithGoogle=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })

    }
    const {register, handleSubmit, formState: {errors}}=useForm();

    const onSubmit=data =>{
        console.log(data)
    }
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white rounded-2xl p-10 shadow-lg"
    >
      <h1 className="text-3xl text-center font-bold mb-2 text-gray-900">Welcome Back</h1>
      <p className="mb-8 text-gray-500 text-center">Login with ParcelPulse</p>
      <form onSubmit={handleSubmit (onSubmit)}>
      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', {required:true, minLength:6})}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          {
            errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>
          }
          {
            errors.password?.type === 'minLength' && <p className="text-amber-500">Password must be 6 character or longer</p>
          }
        </div>

        <div className="flex justify-end">
          <button className="text-sm text-amber-500 hover:underline">Forget Password?</button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-3 bg-amber-400 text-white font-semibold rounded-lg shadow hover:bg-amber-500 transition"
        >
          Login
           
        </motion.button>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account? <Link to='/register' className="text-purple-700 cursor-pointer font-semibold hover:underline">Register</Link>
        </p>

        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-3 text-sm text-gray-400">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <button onClick={handleWithGoogle}
          
          >
        

          <FcGoogle size={24} /> Login with Google
          </button>
        </motion.button>

       
      </div>
      </form>
    </motion.div>
  );
};

export default Login;
