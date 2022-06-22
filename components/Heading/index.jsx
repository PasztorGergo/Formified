import React, { useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Head.module.css";

export default function Heading({ id }) {
  const { findById, editProperty } = useElements();
  const [label, setLabel] = useState(findById(id).label);
  const [edit, setEdit] = useState(false);
  const { level, color } = findById(id);

  useEffect(() => {
    setLabel(findById(id).label);
  });

  const onLabelChange = (newLabel) => {
    editProperty(id, "label", newLabel);
    setLabel(newLabel);
  };
  return edit ? (
    <input
      type="text"
      className={`self-center text-center font-semibold max-w-fit min-h-fit ${
        level == 1
          ? "text-4xl"
          : level == 2
          ? "text-2xl"
          : level == 3
          ? "text-xl"
          : level == 4
          ? "text-lg"
          : level == 5
          ? "text-base"
          : "text-sm"
      }`}
      value={label}
      onChange={(e) => onLabelChange(e.target.value)}
      onBlur={(e) => {
        e.target.value == "" && onLabelChange("Give me a name!");
        setEdit(false);
      }}
      style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}
    />
  ) : (
    <div onClick={() => setEdit(true)} className={Style.container}>
      {React.createElement(
        `h${level}`,
        {
          id: id,
          className: "self-center text-center font-semibold ",
          style: { color: `rgb(${color.r} ${color.g} ${color.b})` },
        },
        label
      )}
    </div>
  );
}
