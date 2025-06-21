import React from 'react';
import Banner from './Banner';
import OurServices from '../../Components/OurServices';
import TrustedBy from '../../Components/TrustedBy';
import Benefits from '../../Components/Benefits';
import BeMerchant from '../../Components/BeMerchan';

const Home = () => {
    return (
        <div className='mt-2'>
            <Banner></Banner>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;