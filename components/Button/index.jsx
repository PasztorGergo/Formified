import React, { useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Button.module.css";

export default function Button({ id }) {
  const { findById, editProperty } = useElements();
  const { bgColor, color, radius, label } = findById(id);
  const [edit, setEdit] = useState(false);
  const [elabel, setLabel] = useState(label);

  useEffect(() => {
    setLabel(findById(id).label);
  });

  const onLabelChange = (newLabel) => {
    editProperty(id, "label", newLabel);
    setLabel(newLabel);
  };

  const bg = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;
  const textColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <button
      id={id}
      style={{
        backgroundColor: bg,
        color: textColor,
        borderRadius: `${radius}rem`,
      }}
      className={Style.button}
      onClick={() => setEdit(true)}
    >
      {elabel}
    </button>
  );
}
