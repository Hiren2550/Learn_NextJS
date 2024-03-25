"use client";

import { toast } from "react-toastify";

const { createContext, useState, useEffect } = require("react");

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [nav, setNav] = useState(true);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await fetch("/api/current");
        const data = await res.json();
        //console.log(data);
        setUser(data.data);

        if (data.success === false) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchuser();
  }, [children]);
  return (
    <userContext.Provider value={{ user, setUser, nav, setNav }}>
      {children}
    </userContext.Provider>
  );
};
