import React from 'react';
import Banner from './Banner';
import OurServices from '../../Components/OurServices';
import TrustedBy from '../../Components/TrustedBy';
import Benefits from '../../Components/Benefits';
import BeMerchant from '../../Components/BeMerchan';
import Review from '../../Components/Review';
import FAQ from '../../Components/FAQ';
import HowItWorks from '../../Components/HowItWorks';

const Home = () => {
    return (
        <div className='mt-2'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
            <Review></Review>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;