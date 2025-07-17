import React from 'react';
import Banner from '../Banner/Banner';
import StatsHighlight from '../StatsHighlight/StatsHighlight';
import FeatureSection from '../FeatureSection/FeatureSection';
import PropertyToolsSection from '../PropertyToolsSection/PropertyToolsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatsHighlight></StatsHighlight>
            <div className='w-10/12 mx-auto'>
                <PropertyToolsSection></PropertyToolsSection>
            </div>
            <FeatureSection></FeatureSection>
        </div>
    );
};

export default Home;