import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const UaserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENTID;

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    navigate,
    backendUrl,
    clientId,
    user,
    setUser,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
