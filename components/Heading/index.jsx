import React, { useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";

export default function Heading({ id }) {
  const { findById, editLabel } = useElements();
  const [label, setLabel] = useState(findById(id).label);

  useEffect(() => {
    setLabel(findById(id).label);
  });

  const onLabelChange = (newLabel) => {
    editLabel(id, newLabel);
    setLabel(newLabel);
  };
  return (
    <input
      type="text"
      className="self-center text-center font-semibold max-w-fit min-h-fit"
      value={label}
      onChange={(e) => onLabelChange(e.target.value)}
      onBlur={(e) => {
        e.target.value == "" && onLabelChange("Give me a name!");
      }}
    />
  );
}
