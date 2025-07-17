import React from "react";
import Banner from "../Banner/Banner";
import StatsHighlight from "../StatsHighlight/StatsHighlight";
import FeatureSection from "../FeatureSection/FeatureSection";
import PropertyToolsSection from "../PropertyToolsSection/PropertyToolsSection";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import PropertyManagementCompanies from "../PropertyManagementCompanies/PropertyManagementCompanies";

const Home = () => {
  const slightFadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
  return (
    <div>
      <Banner></Banner>
      <Fade direction="down" keyframes={slightFadeDown}>
        <StatsHighlight></StatsHighlight>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="w-10/12 mx-auto">
        <PropertyManagementCompanies></PropertyManagementCompanies>
        </div>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <div className="w-10/12 mx-auto">
          <PropertyToolsSection></PropertyToolsSection>
        </div>
      </Fade>
      <Fade direction="down" keyframes={slightFadeDown}>
        <FeatureSection></FeatureSection>
      </Fade>
    </div>
  );
};

export default Home;
