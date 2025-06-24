import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const Register = () => {
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
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowForm(true), 300);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser}=useAuth();
    const onSubmit = (data) => {
        console.log(data);
        createUser( data.email, data.password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })
    };

    return (
        <div className=" flex items-center w-full max-w-md justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
            >
                <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 mb-3">
                    Create an Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Register with ParcelPulse
                </p>

                {showForm && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center mb-4"
                        >
                            <div className="w-24 h-24 rounded-full border-4 bg-gradient-to-br from-blue-700 via-pink-600 to-purple-700 flex items-center justify-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                    alt="User Icon"
                                    className="w-14 h-14"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Enter your name"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 focus:outline-none transition duration-300"
                                />
                                {
                                    errors.name?.type === 'required' && <p className="text-amber-500">Name is required</p>
                                }
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Enter your email"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 focus:outline-none transition duration-300"
                                />
                                {
                                    errors.email?.type === 'required' && <p className="text-amber-500">Email is required</p>
                                }
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: true, minLength: 6 })}
                                    placeholder="Enter your password"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 focus:outline-none transition duration-300"
                                />
                                {
                                    errors.password?.type === 'required' && <p className="text-amber-500">Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className="text-amber-500">Password must be 6 character or longer</p>
                                }
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
                            >
                                Register
                            </button>
                        </motion.div>

                        <div className="mt-5 text-center text-sm text-gray-600">
                            Already have an account?<Link to='/login' className="text-purple-700 cursor-pointer font-semibold hover:underline">Login</Link>
                            </div>
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-400">Or</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <button onClick={handleWithGoogle}
                            type="button"
                            className="flex items-center justify-center gap-2 border border-gray-300 py-3 w-full rounded-xl hover:bg-gray-100 transition duration-300 shadow cursor-pointer"
                        >
                            <FcGoogle size={24} /> Register with Google
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;