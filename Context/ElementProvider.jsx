import React, { createContext, useContext, useState } from "react";

const ElementContext = createContext({});

export function useElements() {
  return useContext(ElementContext);
}

export function ElementProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState();
  const findById = (id) => elements.find((x) => x.id === id);
  const editLabel = (id, newLabel) =>
    (elements.find((x) => x.id === id).label = newLabel);

  const value = {
    elements,
    setElements,
    selected,
    setSelected,
    findById,
    editLabel,
  };

  return (
    <ElementContext.Provider value={value}>{children}</ElementContext.Provider>
  );
}
