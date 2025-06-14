import React, { useState } from "react";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(20);

  const handleSlideChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="pb-10 md:py-20 mx-2">
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-5xl mt-4 font-bold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Remove Background With High <br className="max-sm:hidden" /> Quality and
        Accuracy
      </h1>

      <div className="relative w-full  max-w-3xl overflow-hidden m-auto rounded-xl shadow bg-white">
        <img
          src="https://sb.kaleidousercontent.com/67418/992x558/b024f7a4e1/stunning-quality-product.png"
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}%0 0)` }}
          alt=""
        />
        <img
          src="https://sb.kaleidousercontent.com/67418/992x558/235d7eafc9/stunning-quality-prodcut-transp.png"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}% )` }}
          className="absolute top-0 left-0 w-full h-full"
          alt=""
        />
        <input
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSlideChange}
        ></input>
      </div>
    </div>
  );
};

export default BgSlider;
