import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';
import { BadgeCheck, BadgeX, Eye, Trash2, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: parcles = [], isLoading } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/user?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                if (res.data.deletedCount > 0) {
                    MySwal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
                    queryClient.invalidateQueries(['my-parcels', user?.email]);
                }
            } catch (error) {
                MySwal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    if (isLoading) return <p className="text-center">Loading your parcels...</p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 shadow-xl p-6 rounded-xl overflow-x-auto"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📦 My Parcels</h2>

            {parcles.length ? (
                <table className="min-w-full border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Created At</th>
                            <th className="px-4 py-3 text-left">Cost</th>
                            <th className="px-4 py-3 text-left">Payment</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                        {parcles.map((parcel) => (
                            <tr
                                key={parcel._id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                <td className="px-4 py-3 capitalize font-medium">{parcel.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                    {parcel.createdAtText}
                                </td>
                                <td className="px-4 py-3 font-semibold text-indigo-600 dark:text-indigo-400">
                                    ৳ {parcel.totalPrice}
                                </td>
                                <td className="px-4 py-3">
                                    {parcel.paymentStatus === 'Paid' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 rounded-full">
                                            <BadgeCheck className="w-4 h-4" /> Paid
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300 rounded-full">
                                            <BadgeX className="w-4 h-4" /> Unpaid
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                                    <Link to={`/dashboard/parcel/${parcel._id}`}>Details</Link>


                                    {parcel.paymentStatus !== 'Paid' && (
                                        <Link
                                            to={`/payment/${parcel._id}`}
                                            className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-800 transition"
                                        >
                                            <CreditCard className="w-4 h-4 mr-1" /> Pay
                                        </Link>
                                    )}

                                    <button
                                        className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
                                        onClick={() => handleDelete(parcel._id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-300">No parcels found.</p>
            )}
        </motion.div>
    );
};

export default MyParcels;
