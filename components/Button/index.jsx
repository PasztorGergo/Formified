import React, { useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Button.module.css";

export default function Button({ id }) {
  const { findById, editProperty, elements } = useElements();
  const { bgColor, color, radius, initiallabel } = findById(
    id,
    id.split("-").length > 2
      ? findById(`inline-${id.split("-")[1]}`, elements)
      : elements
  );
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(initiallabel);

  useEffect(() => {
    setLabel(
      findById(
        id,
        id.split("-").length > 2
          ? findById(`inline-${id.split("-")[1]}`, elements)
          : elements
      ).label
    );
  });

  const onLabelChange = (newLabel) => {
    editProperty(
      id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements)
        : elements,
      "label",
      newLabel
    );
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
      {edit ? (
        <input
          value={label}
          onChange={(e) => onLabelChange(e.currentTarget.value)}
          onBlur={() => setEdit(false)}
        />
      ) : (
        label
      )}
    </button>
  );
}
