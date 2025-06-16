import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Steps from "../components/Steps";
import BgSlider from "../components/BgSlider";
import Testimonials from "../components/Testimonials";
import HeroSection2 from "../components/HeroSection2";
import BgSlider2 from "../components/BgSlider2";

const HomePage = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("homeReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("homeReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <HeroSection2 />
      <Steps />
      <BgSlider />
      <BgSlider2 />
      <Testimonials />
    </div>
  );
};

export default HomePage;
