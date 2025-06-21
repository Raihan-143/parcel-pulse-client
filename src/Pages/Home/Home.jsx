import React from 'react';
import Banner from './Banner';
import OurServices from '../../Components/OurServices';
import TrustedBy from '../../Components/TrustedBy';

const Home = () => {
    return (
        <div className='mt-2'>
            <Banner></Banner>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
        </div>
    );
};

export default Home;