import React, { useEffect, useRef, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "../../styles/ElementDetails.module.css";
import { SketchPicker } from "react-color";

export default function InputDetails() {
  const { selected, editProperty } = useElements();
  const [bgColor, setBgColor] = useState(selected.bgColor);
  const pickerRef = useRef();

  useEffect(() => {
    editProperty(selected.id, "bgColor", pickerRef.current.props.color);
  });

  return (
    <>
      <details className={Style.setting}>
        <summary htmlFor="background">Background</summary>
        <SketchPicker
          color={bgColor}
          onChange={(c) => {
            setBgColor(c.rgb);
          }}
          ref={pickerRef}
        />
      </details>
    </>
  );
}
