import { createContext, useContext, useEffect, useState } from "react";

const ViewContext = createContext();

export function useView() {
  return useContext(ViewContext);
}

export function ViewProvider({ children }) {
  const [view, setView] = useState(false);

  //Get View
  useEffect(() => {
    const storedView = localStorage.getItem("view");
    if (storedView === "true") {
      setView(true);
    } else {
      setView(false);
    }
  }, []);

  //Save View
  useEffect(() => {
    if (view) {
      localStorage.setItem("view", view);
    } else {
      localStorage.removeItem("view");
    }
  }, [view]);

  const viewInfo = {
    view,
    setView,
  };

  return (
    <ViewContext.Provider value={viewInfo}>{children}</ViewContext.Provider>
  );
}
