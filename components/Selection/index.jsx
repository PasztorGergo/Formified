import React, { useEffect, useRef, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./selection.module.css";

export default function Select({ id }) {
  const { findById, editLabel } = useElements();
  const [label, setLabel] = useState(findById(id).label);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLabel(findById(id).label);
  });

  const onLabelChange = (newLabel) => {
    editLabel(id, newLabel);
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
      <select name={label} id={id}>
        <option>Add option ➕</option>
        <option value="">asd</option>
      </select>
    </>
  );
}
