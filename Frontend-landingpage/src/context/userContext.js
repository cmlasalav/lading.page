import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUserName() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(null);

  // Get UserName
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Save UserName
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]); 

  const userInfo = {
    userName,
    setUserName,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}
