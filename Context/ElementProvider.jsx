import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ElementContext = createContext({});

export function useElements() {
  return useContext(ElementContext);
}

export function ElementProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState();
  const findById = (id) => elements.find((x) => x.id === id);
  const editProperty = (id, key, newValue) => (findById(id)[key] = newValue);

  useEffect(() => {
    if (!elements.includes(selected) || elements.length < 1) setSelected();
  }, [elements]);

  const value = {
    elements,
    setElements,
    selected,
    setSelected,
    findById,
    editProperty,
  };

  return (
    <ElementContext.Provider value={value}>{children}</ElementContext.Provider>
  );
}
