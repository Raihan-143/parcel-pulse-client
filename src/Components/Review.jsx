import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Lottie from "lottie-react";
import customerAnimation from "../assets/customer-feedback.json"; 
// import customerTop from "../assets/customer-top.png";
import { FaQuoteLeft } from "react-icons/fa";

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="py-20 px-5 md:px-24 bg-gradient-to-b from-[#f3e5f5] via-[#e0f7fa] to-[#fce4ec] rounded-3xl my-10">

            {/* Top Icon */}
            {/* Top Icon */}
            <div className="flex justify-center mb-6">
                <Lottie animationData={customerAnimation} loop={true} className="w-40 h-48" />
            </div>
            {/* <div className="flex justify-center mb-6">
                <img src={customerTop} alt="Customer Top" className="w-24 h-24" />
            </div> */}

            {/* Title & Subtext */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-600 to-purple-700 mb-5">
                    What our customers are sayings
                </h1>
                <p className="text-lg text-gray-600">
                    Enhance posture, mobility, and well-being effortlessly with Parcel Pulse. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            {/* Swiper Slider */}
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={window.innerWidth < 768 ? 1 : 3}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, EffectCoverflow]}
                className="max-w-5xl mx-auto"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <div className="relative bg-white p-10 rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="text-3xl text-purple-700 mb-6">
                                <FaQuoteLeft />
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                “{review.review}”
                            </p>
                            <div className="border-t border-dashed border-gray-300 pt-6 flex items-center gap-5">
                                <img
                                    src={review.cover}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full border-4 border-purple-700 object-cover shadow-lg hover:scale-110 transition-transform duration-300"
                                />
                                <div>
                                    <h3 className="font-semibold text-[#1f2c3f] text-lg">{review.name}</h3>
                                    <p className="text-sm text-gray-500">{review.position}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Review;
