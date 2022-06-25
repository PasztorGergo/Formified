import React, { useEffect, useRef, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./input.module.css";

export default function InputField({ id }) {
  const { findById, editProperty, elements } = useElements();
  console.log(findById(`inline-${id.split("-")[1]}`, elements));
  const input = findById(
    id,
    id.split("-").length > 2
      ? findById(`inline-${id.split("-")[1]}`, elements).container
      : elements
  );
  console.log(input);
  const { type, placeholder, initiallabel, bgColor, variant } = input;
  const [label, setLabel] = useState(initiallabel);
  const [edit, setEdit] = useState(false);
  const colorTheme = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;

  useEffect(() => {
    setLabel(
      findById(
        id,
        id.split("-").length > 2
          ? findById(`inline-${id.split("-")[1]}`, elements).container
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
      <div className="w-2/3 flex">
        {type === "tel" && (
          <select
            className={`${Style.input} ${Style[variant]} w-2/5 rounded-r-none`}
            style={{
              backgroundColor: colorTheme,
              borderColor: colorTheme,
              outlineColor: colorTheme,
            }}
          >
            <option value="+36">🇭🇺 +36</option>
          </select>
        )}
        {type === "file" && (
          <>
            <label className={Style.uploadBtn} htmlFor={id}>
              Choose File
            </label>
            <span>{}</span>
          </>
        )}
        <input
          className={`${Style.input} ${Style[variant]} ${
            type === "tel" ? "rounded-l-none" : ""
          }`}
          type={type}
          id={id}
          placeholder={placeholder}
          style={{
            backgroundColor: colorTheme,
            borderColor: colorTheme,
            outlineColor: colorTheme,
          }}
          hidden={type === "file"}
        />
      </div>
    </>
  );
}
