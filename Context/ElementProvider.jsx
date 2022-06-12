import React, { createContext, useContext, useState } from "react";

const ElementContext = createContext({});

export function useElements() {
  return useContext(ElementContext);
}

export function ElementProvider({ children }) {
  const [elements, setElements] = useState([]);
  const value = {
    elements,
    setElements,
  };

  return (
    <ElementContext.Provider value={value}>{children}</ElementContext.Provider>
  );
}
