import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/banner/banner4.png';
import banner2 from '../../assets/banner/banner5.png';
import banner3 from '../../assets/banner/banner6.png';

const Banner = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto mt-5 rounded-3xl shadow-2xl overflow-hidden">
            <Carousel 
                autoPlay={true} 
                infiniteLoop={true} 
                showThumbs={false} 
                showStatus={false}
                interval={4000}
                transitionTime={800}
                emulateTouch={true}
                swipeable={true}
            >
                <div className="relative">
                    <img src={banner1} alt="Banner 1" className="h-[550px] w-full object-cover" />
                </div>
                <div className="relative">
                    <img src={banner2} alt="Banner 2" className="h-[550px] w-full object-cover" />
                </div>
                <div className="relative">
                    <img src={banner3} alt="Banner 3" className="h-[550px] w-full object-cover" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
