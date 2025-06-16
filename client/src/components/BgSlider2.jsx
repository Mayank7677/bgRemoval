import React, { useState } from "react";

const BgSlider2 = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSlideChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="pb-10 py-10 md:py-30 mx-2">
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-5xl mt-4 font-bold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Inhanced Image With High <br className="max-sm:hidden" /> Quality and
        Accuracy
      </h1>

      <div className="relative w-full  max-w-3xl overflow-hidden m-auto rounded-xl shadow bg-white">
        <img
          src="https://cdn-cms-uploads.picsart.com/cms-uploads/673d3990-5183-4f7a-95b0-b2ad9b552061.webp?type=webp&to=min&r=-1"
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}%0 0)` }}
          alt=""
        />
        <img
          src="https://cdn-cms-uploads.picsart.com/cms-uploads/35935a14-929f-4e34-8f1e-3063435ffd2c.webp?type=webp&to=min&r=-1"
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

export default BgSlider2;
