import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from "../hooks/useAuth";

const MySwal = withReactContent(Swal);

const SendParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

    const [districtData, setDistrictData] = useState([]);
    const [regions, setRegions] = useState([]);
    const [senderServiceCenters, setSenderServiceCenters] = useState([]);
    const [receiverServiceCenters, setReceiverServiceCenters] = useState([]);

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const parcelType = watch("type");
    const weight = watch("weight");

    // Load district data
    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((data) => {
                setDistrictData(data);
                const uniqueRegions = [...new Set(data.map(item => item.region))];
                setRegions(uniqueRegions);
            });
    }, []);

    // Set sender service centers
    useEffect(() => {
        const filtered = districtData.filter(d => d.region === senderRegion);
        const centers = filtered.flatMap(d => d.covered_area);
        setSenderServiceCenters(centers);
    }, [senderRegion, districtData]);

    // Set receiver service centers
    useEffect(() => {
        const filtered = districtData.filter(d => d.region === receiverRegion);
        const centers = filtered.flatMap(d => d.covered_area);
        setReceiverServiceCenters(centers);
    }, [receiverRegion, districtData]);

    const onSubmit = (data) => {
        let baseCost = 0;
        let breakdownHTML = "";
        const sameDistrict = data.senderServiceCenter === data.receiverServiceCenter;
        const weight = parseFloat(data.weight || 0);

        // Pricing Logic
        if (data.type === "document") {
            baseCost = sameDistrict ? 60 : 80;
            breakdownHTML = `
      📄 <b>Document Parcel</b><br>
      🚚 Delivery Type: ${sameDistrict ? 'Within District' : 'Outside District'}<br>
      💸 Base Cost: ৳${baseCost}
    `;
        } else if (data.type === "non-document") {
            if (weight <= 3) {
                baseCost = sameDistrict ? 110 : 150;
                breakdownHTML = `
        📦 <b>Non-Document (≤3kg)</b><br>
        🚚 Delivery Type: ${sameDistrict ? 'Within District' : 'Outside District'}<br>
        💸 Base Cost: ৳${baseCost}
      `;
            } else {
                const extraKg = Math.ceil(weight - 3);
                const extra = extraKg * 40;
                const base = sameDistrict ? 110 : 150;
                baseCost = base + extra;
                breakdownHTML = `
        📦 <b>Non-Document (>3kg)</b><br>
        🚚 Delivery Type: ${sameDistrict ? 'Within District' : 'Outside District'}<br>
        💸 Base Cost: ৳${base}<br>
        ➕ Extra Weight Charge (৳40 x ${extraKg}kg): ৳${extra}
      `;
            }
        }

        const finalHTML = `
    <div style='text-align:left; font-size:15px;'>
      ${breakdownHTML}
      <hr style='margin: 10px 0;'/>
      <div style='font-size:17px; font-weight:600; color:#16a34a;'>💰 Total Cost: ৳${baseCost}</div>
      <p style='font-size:13px; color:#6b7280;'>* Estimated cost only. Confirm to generate tracking ID & save parcel.<br>
      * পেমেন্ট গেটওয়ে এবং ট্র্যাকিং ইনফো পরবর্তীতে দেখা যাবে।</p>
    </div>
  `;

        MySwal.fire({
            title: "📦 Pricing Breakdown",
            html: finalHTML,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "✅ Proceed to Payment",
            cancelButtonText: "✏️ Edit Info",
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const now = new Date();
                const formattedTime = now.toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                    hour12: true,
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                });

                const finalData = {
                    ...data,
                    userEmail: user?.email || "unknown@user.com",
                    parcelId: `PID-${Date.now().toString().slice(-6)}`,
                    trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
                    createdAtISO: now.toISOString(),
                    createdAtText: formattedTime,
                    totalPrice: baseCost,
                    paymentStatus: "Pending",
                    deliveryStatus: "Not Shipped"
                };

                console.log("📦 Parcel Saved:", finalData);

                MySwal.fire({
                    icon: "success",
                    title: "🎉 Order Confirmed!",
                    html: `
          ✅ Your parcel has been submitted.<br>
          📌 <b>Tracking ID:</b> ${finalData.trackingId}<br>
          📧 <b>Email:</b> ${finalData.userEmail}<br>
          🕒 <b>Created At:</b> ${formattedTime}<br>
          💳 <b>Payment Status:</b> <span style="color:orangered;">${finalData.paymentStatus}</span><br>
          🚚 <b>Delivery Status:</b> ${finalData.deliveryStatus}
        `
                });

                reset();
            }
        });
    };



    return (
        <section className="px-4 md:px-8 lg:px-16 py-10 bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#111827] dark:via-[#0f172a] dark:to-[#0e1c2f] mt-5">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto rounded-2xl shadow-lg bg-white dark:bg-[#1e293b] p-8 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-[#4f46e5] dark:text-blue-400">📦 Send A Parcel</h2>
                <p className="text-center text-gray-500 dark:text-gray-300">
                    Please fill out the form below to initiate your parcel delivery.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Parcel Info */}
                    <fieldset className="border border-dashed rounded-xl p-4">
                        <legend className="px-2 font-semibold text-lg text-purple-600 dark:text-purple-300">📋 Parcel Info</legend>
                        <div className="grid md:grid-cols-3 gap-4 mt-3">
                            <select {...register("type", { required: true })} className="input-field">
                                <option value="">Parcel Type</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-document</option>
                            </select>
                            <input type="text" {...register("title", { required: true })} placeholder="Parcel Title" className="input-field" />
                            {parcelType === "non-document" && (
                                <input type="number" step="0.01" {...register("weight")} placeholder="Weight (kg)" className="input-field" />
                            )}
                        </div>
                    </fieldset>

                    {/* Sender Info */}
                    <fieldset className="border border-dashed rounded-xl p-4">
                        <legend className="px-2 font-semibold text-lg text-indigo-600 dark:text-indigo-300">📤 Sender Info</legend>
                        <div className="grid md:grid-cols-3 gap-4 mt-3">
                            <input type="text" defaultValue="Md. Raihan Hasan Rana" {...register("senderName", { required: true })} placeholder="Sender Name" className="input-field" />
                            <input type="text" {...register("senderContact", { required: true })} placeholder="Contact Number" className="input-field" />
                            <select {...register("senderRegion", { required: true })} className="input-field">
                                <option value="">📍 Select Region</option>
                                {regions.map((region, i) => (
                                    <option key={i} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("senderServiceCenter", { required: true })} className="input-field">
                                <option value="">🏢 Select Service Center</option>
                                {senderServiceCenters.map((area, i) => (
                                    <option key={i} value={area}>{area}</option>
                                ))}
                            </select>
                            <input type="text" {...register("senderAddress", { required: true })} placeholder="Sender Address" className="input-field" />
                            <input type="text" {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input-field" />
                        </div>
                    </fieldset>

                    {/* Receiver Info */}
                    <fieldset className="border border-dashed rounded-xl p-4">
                        <legend className="px-2 font-semibold text-lg text-green-600 dark:text-green-300">📥 Receiver Info</legend>
                        <div className="grid md:grid-cols-3 gap-4 mt-3">
                            <input type="text" {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input-field" />
                            <input type="text" {...register("receiverContact", { required: true })} placeholder="Contact Number" className="input-field" />
                            <select {...register("receiverRegion", { required: true })} className="input-field">
                                <option value="">📍 Select Region</option>
                                {regions.map((region, i) => (
                                    <option key={i} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiverServiceCenter", { required: true })} className="input-field">
                                <option value="">🏢 Select Service Center</option>
                                {receiverServiceCenters.map((area, i) => (
                                    <option key={i} value={area}>{area}</option>
                                ))}
                            </select>
                            <input type="text" {...register("receiverAddress", { required: true })} placeholder="Receiver Address" className="input-field" />
                            <input type="text" {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input-field" />
                        </div>
                    </fieldset>

                    <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300 text-white font-semibold shadow-md">
                        🚀 Submit Parcel
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default SendParcel;
