
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { BadgeCheck, BadgeX } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

const ParcelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        enabled: !!id
    });
    const handleBack = () => {
        navigate('/dashboard/my-parcels');
    };

    if (isLoading) return <p className="text-center">Loading parcel details...</p>;

    if (!parcel?._id) {
        return <p className="text-center text-red-500">Parcel not found</p>;
    }

    return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
            {/* 🔙 Back Button */}
            <div className="flex justify-start mb-4 ">
                <button
                    onClick={handleBack}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition cursor-pointer"
                >
                    ← Back to My Parcels
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-xl p-6 rounded-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    📦 Parcel ID: {parcel.parcelId}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Sender Info</h3>
                        <p><span className="font-medium">Name:</span> {parcel.senderName}</p>
                        <p><span className="font-medium">Contact:</span> {parcel.senderContact}</p>
                        <p><span className="font-medium">Region:</span> {parcel.senderRegion}</p>
                        <p><span className="font-medium">Service Center:</span> {parcel.senderServiceCenter}</p>
                        <p><span className="font-medium">Address:</span> {parcel.senderAddress}</p>
                        <p><span className="font-medium">Instruction:</span> {parcel.pickupInstruction}</p>
                    </div>

                    {/* Receiver Info */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Receiver Info</h3>
                        <p><span className="font-medium">Name:</span> {parcel.receiverName}</p>
                        <p><span className="font-medium">Contact:</span> {parcel.receiverContact}</p>
                        <p><span className="font-medium">Region:</span> {parcel.receiverRegion}</p>
                        <p><span className="font-medium">Service Center:</span> {parcel.receiverServiceCenter}</p>
                        <p><span className="font-medium">Address:</span> {parcel.receiverAddress}</p>
                        <p><span className="font-medium">Instruction:</span> {parcel.deliveryInstruction}</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md shadow">
                        <p><span className="font-medium">Type:</span> {parcel.type}</p>
                        <p><span className="font-medium">Weight:</span> {parcel.weight} kg</p>
                        <p><span className="font-medium">Total Cost:</span> ৳ {parcel.totalPrice}</p>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                        {/* Payment Status */}
                        <div className="inline-flex items-center gap-2 text-sm">
                            <span className="font-medium">Payment:</span>
                            {parcel.paymentStatus === "Paid" ? (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 rounded-full inline-flex items-center gap-1">
                                    <BadgeCheck className="w-4 h-4" /> Paid
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300 rounded-full inline-flex items-center gap-1">
                                    <BadgeX className="w-4 h-4" /> Unpaid
                                </span>
                            )}
                        </div>

                        {/* Delivery Status */}
                        <div className="text-sm">
                            <span className="font-medium">Delivery Status:</span> {parcel.deliveryStatus}
                        </div>

                        <div className="text-sm">
                            <span className="font-medium">Tracking ID:</span> {parcel.trackingId}
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-300">
                            <span className="font-medium">Created At:</span> {parcel.createdAtText}
                        </div>
                    </div>
                </div>
            </motion.div>
            </div>
            );
};

            export default ParcelDetails;
