import React from "react";
import HeroSection from "../components/HeroSection";
import Steps from "../components/Steps";
import BgSlider from "../components/BgSlider";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Steps />
      <BgSlider />
      <Testimonials/>
    </div>
  );
};

export default HomePage;
