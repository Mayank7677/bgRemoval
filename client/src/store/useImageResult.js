const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useImageResult = create((set, get) => ({
  image: null,
  previewImage: null,
  resultImage: null,
  resloading: false,

  handleRemoveBg: async (image) => {
    set({ resloading: true });

    set({ image: image });
    set({ previewImage: URL.createObjectURL(image) });
    if (!image) return toast.error("Please upload an image first");

    const formData = new FormData();
    formData.append("image", image); // key must match your backend

    try {
      const res = await axiosInstance.post("/api/image/remove-bg", formData, {
        responseType: "blob", // important! because backend sends an image
      });

      console.log(res.data);
      const imageBlob = res.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      console.log("imageUrl : ", imageUrl);
      set({ resultImage: imageUrl });
    } catch (err) {
      console.error("Background removal failed", err);
      toast.error("Failed to remove background.");
    } finally {
      set({ resloading: false });
      // set({ previewImage: null });
    }
  },

  handleUpscale: async (image) => {
    console.log("upscalling ------------------------");
    set({ resloading: true, image });
    set({ previewImage: URL.createObjectURL(image) });

    if (!image) return toast.error("Please upload an image first");

    const formData = new FormData();
    formData.append("image", image); // key must match backend

    try {
      const res = await axiosInstance.post("/api/image/upscale", formData, {
        responseType: "blob",
      });

      const imageBlob = res.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      set({ resultImage: imageUrl });
    } catch (err) {
      console.error("Upscale failed", err);
      toast.error("Failed to upscale image.");
    } finally {
      set({ resloading: false });
    }
  },

  // ✅ Add this reset function
  resetImages: () => {
    set({
      image: null,
      previewImage: null,
      resultImage: null,
      resloading: false,
    });
  },
}));

export default useImageResult;
