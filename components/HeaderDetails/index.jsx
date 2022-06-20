import React, { useState, useEffect } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";

export default function HeaderDetails({ header }) {
  const { setSelected, editProperty } = useElements();
  const [color, setColor] = useState(header.color);
  const [bgOpen, setBgOpen] = useState(false);

  useEffect(() => {
    editProperty(header.id, "color", color);
  }, [color]);

  return (
    <>
      <div className={`${Style.bgContainer} ${Style.container}`}>
        Text Color{" "}
        <button
          className={Style.bgColorButton}
          onClick={() => setBgOpen((prev) => !prev)}
          style={{
            backgroundColor: `rgb(${color.r} ${color.g} ${color.b})`,
          }}
        />
        {bgOpen && (
          <SketchPicker
            className={Style.picker}
            color={color}
            onChange={(c) => {
              setSelected((prev) => ({ color: c.rgb, ...prev }));
              setColor(c.rgb);
            }}
          />
        )}
      </div>
    </>
  );
}
