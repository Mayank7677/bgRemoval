import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="pb-10 md:py-20 mx-2">
      <h1 className="pb-2 text-center text-2xl md:text-3xl lg:text-5xl mt-4 font-bold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-16">
        {testimonialsData.map((dets, i) => (
          <div
            key={i}
            className="bg-white border border-neutral-200 rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700"
          >
            <p class="text-4xl text-gray-500">”</p>
            <p className="text-md text-gray-500">{dets.text}</p>

            <div className="flex items-center gap-3 mt-5">
              <img className="w-9 rounded-full" src={dets.image} alt="" />

              <div>
                <p>{dets.author}</p>
                <p className="text-sm text-gray-600">{dets.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-16">
        <h1 className=" text-center pb-2 text-2xl md:text-3xl lg:text-5xl mt-10 font-bold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
          See the magic. Try now
        </h1>
        <div className="text-center mb-24 mt-20">
          <input type="file" accept="image/*" id="upload2" hidden />
          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full  cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
            for="upload2"
          >
            <img
              width="20"
              src="data:image/svg+xml,%3csvg%20width='29'%20height='29'%20viewBox='0%200%2029%2029'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.3232%200.362753C15.1118%200.131645%2014.8132%200%2014.5%200C14.1868%200%2013.8882%200.131645%2013.6769%200.362753L7.72812%206.86916C7.31246%207.32379%207.34404%208.02931%207.79867%208.44498C8.25332%208.86064%208.95882%208.82906%209.37449%208.37443L13.3846%203.98832V20.4487C13.3846%2021.0647%2013.884%2021.5641%2014.5%2021.5641C15.116%2021.5641%2015.6154%2021.0647%2015.6154%2020.4487V3.98832L19.6256%208.37443C20.0413%208.82906%2020.7468%208.86064%2021.2014%208.44498C21.656%208.02931%2021.6876%207.32379%2021.2719%206.86916L15.3232%200.362753Z'%20fill='white'/%3e%3cpath%20d='M2.23077%2018.9611C2.23077%2018.3451%201.7314%2017.8457%201.11539%2017.8457C0.499381%2017.8457%207.79212e-07%2018.3451%207.79212e-07%2018.9611V19.0427C-2.89644e-05%2021.0766%20-5.88145e-05%2022.7159%200.173287%2024.0053C0.353265%2025.3439%200.738281%2026.4709%201.63344%2027.366C2.52861%2028.2613%203.6557%2028.6463%204.99432%2028.8263C6.28366%2028.9995%207.92301%2028.9995%209.95686%2028.9995H19.0432C21.0771%2028.9995%2022.7164%2028.9995%2024.0058%2028.8263C25.3444%2028.6463%2026.4713%2028.2613%2027.3666%2027.366C28.2618%2026.4709%2028.6468%2025.3439%2028.8267%2024.0053C29%2022.7159%2029%2021.0766%2029%2019.0427V18.9611C29%2018.3451%2028.5006%2017.8457%2027.8846%2017.8457C27.2686%2017.8457%2026.7692%2018.3451%2026.7692%2018.9611C26.7692%2021.0958%2026.7669%2022.5846%2026.6159%2023.708C26.4691%2024.7993%2026.2008%2025.3771%2025.7892%2025.7887C25.3775%2026.2004%2024.7998%2026.4687%2023.7085%2026.6155C22.5851%2026.7664%2021.0962%2026.7688%2018.9615%2026.7688H10.0385C7.90375%2026.7688%206.4149%2026.7664%205.29156%2026.6155C4.20032%2026.4687%203.62243%2026.2004%203.21084%2025.7887C2.79924%2025.3771%202.53088%2024.7993%202.38417%2023.708C2.23313%2022.5846%202.23077%2021.0958%202.23077%2018.9611Z'%20fill='white'/%3e%3c/svg%3e"
              alt=""
            />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
