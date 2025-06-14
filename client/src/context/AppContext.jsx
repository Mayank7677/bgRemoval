import { useAuth } from "@clerk/clerk-react";
import { Children, createContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const [credit, setCredit] = useState(false);

  const getCreditData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`http://localhost:7070/api/user/credits`, {
        headers: {
          token,
        },
      });

      setCredit(data.credits);
      console.log("credits : ", data.credits);
    } catch (error) {
      console.log("error in getCreditData", error);
      toast.error(error.message);
    }
  };
  const value = {
    credit,
    setCredit,
    getCreditData,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
