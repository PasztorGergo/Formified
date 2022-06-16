import React, { useEffect, useRef, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./input.module.css";

export default function InputField({ id }) {
  const { findById, editProperty } = useElements();
  const { type, placeholder, initiallabel, bgColor, variant } = findById(id);
  const [label, setLabel] = useState(initiallabel);
  const [edit, setEdit] = useState(false);
  const colorTheme = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;

  useEffect(() => {
    setLabel(findById(id).label);
  });

  const onLabelChange = (newLabel) => {
    editProperty(id, "label", newLabel);
    setLabel(newLabel);
  };

  return (
    <>
      <div
        onClick={() => setEdit(true)}
        onBlur={() => setEdit(false)}
        className={Style.label}
      >
        {edit ? (
          <input
            type="text"
            onChange={(e) => onLabelChange(e.target.value)}
            value={label}
            onBlur={(e) => {
              e.target.value == "" && onLabelChange("Give me a name!");
            }}
          />
        ) : (
          <label>{label}</label>
        )}
      </div>
      <input
        className={`${Style.input} ${Style[variant]}`}
        type={type}
        id={id}
        placeholder={placeholder}
        style={{
          backgroundColor: colorTheme,
          borderColor: colorTheme,
          outlineColor: colorTheme,
        }}
      />
    </>
  );
}
