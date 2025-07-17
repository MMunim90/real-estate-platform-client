import React from 'react';
import Banner from '../Banner/Banner';
import StatsHighlight from '../StatsHighlight/StatsHighlight';
import FeatureSection from '../FeatureSection/FeatureSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatsHighlight></StatsHighlight>
            <FeatureSection></FeatureSection>
        </div>
    );
};

export default Home;