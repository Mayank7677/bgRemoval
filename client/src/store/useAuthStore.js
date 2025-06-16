const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,
  credits: null,
  step: "check",
  isSendingOTP: false,

  checkAuth: async () => {
    try {
      let res = await axiosInstance.get("/api/user/checkAuth");
      console.log(res.data.user);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log("error in checkAuth", error);
    }
  },

  login: async (email, password) => {
    console.log(email, password);
    set({ isLoading: true });
    try {
      let res = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      set({ authUser: res.data.user });
      localStorage.setItem("userData", JSON.stringify(res.data.user));

      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error in login : ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (data) => {
    console.log(data);
    set({ isLoading: true });
    try {
      let res = await axiosInstance.post("/api/user/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      set({ authUser: res.data.user });
      localStorage.setItem("userData", JSON.stringify(res.data.user));

      toast.success("Account created Successfully");
    } catch (error) {
      console.log("error in signup : ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: true });
    }
  },

  logout: async () => {
    try {
      let res = await axiosInstance.get("/api/user/logout");
      set({ authUser: null });
      localStorage.removeItem("userData");

      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error in logout : ", error);
    }
  },

  checkCredits: async () => {
    try {
      let res = await axiosInstance.get("/api/user/check-credits");
      set({ credits: res.data.credits });
      console.log("credits : ", res.data.credits);
    } catch (error) {
      console.log("error in checkCredits : ", error);
    }
  },

  checkMailAndSendOTP: async (email) => {
    set({ isSendingOTP: true });
    try {
      let res = await axiosInstance.post("/api/user/sendOtp", {
        email,
      });
      set({ step: "verify" });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      set({ isSendingOTP: false });
    } finally {
      set({ isSendingOTP: false });
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      let res = await axiosInstance.post("/api/user/verifyOTP", {
        email,
        otp,
      });
      set({ step: "forgot" });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  forgotPass: async (email, newPass) => {
    try {
      let res = await axiosInstance.post("/api/user/forgotPass", {
        email,
        newPass,
      });
      set({ step: "check" });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
}));

export default useAuthStore;
