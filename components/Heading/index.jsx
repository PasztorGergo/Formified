import React, { useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";

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
      className="self-center text-center font-semibold max-w-fit min-h-fit"
      value={label}
      onChange={(e) => onLabelChange(e.target.value)}
      onBlur={(e) => {
        e.target.value == "" && onLabelChange("Give me a name!");
        setEdit(false);
      }}
      style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}
    />
  ) : (
    React.createElement(
      `h${level}`,
      {
        id: id,
        className: "self-center text-center font-semibold max-w-fit min-h-fit",
        onClick: () => setEdit(true),
        style: { color: `rgb(${color.r} ${color.g} ${color.b})` },
      },
      label
    )
  );
}
