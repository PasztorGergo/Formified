import React, { useEffect, useRef, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./selection.module.css";

export default function Select({ id }) {
  const { findById, editProperty } = useElements();
  const [label, setLabel] = useState(findById(id).label);
  const { options, variant, bgColor } = findById(id);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLabel(findById(id).label);
  }, [label]);

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
      <select
        name={label}
        id={id}
        className={`${Style.selection} ${Style[variant]}`}
        style={{
          backgroundColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`,
          borderColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`,
          outlineColor: `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`,
        }}
      >
        {options?.length < 1 ? (
          <option>Add options ➕</option>
        ) : (
          options.map(({ text, type }, index) => {
            const element = React.createElement(type, { key: index }, text);
            return element;
          })
        )}
      </select>
    </>
  );
}
