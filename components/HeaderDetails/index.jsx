import React, { useState, useEffect } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";

export default function HeaderDetails({ header }) {
  const { setSelected, editProperty, elements } = useElements();
  const { id } = header;
  const [color, setColor] = useState(header.color);
  const [bgOpen, setBgOpen] = useState(false);

  useEffect(() => {
    editProperty(
      id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements).container
        : elements,
      "color",
      color
    );
  }, [color]);

  const levelHandler = (e) => {
    setSelected((prev) => ({
      level: e.target.value,
      ...prev,
    }));
    editProperty(
      header.id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements).container
        : elements,
      "level",
      e.target.value
    );
  };

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
      <div className={`${Style.container}`}>
        <label htmlFor="">Font size</label>
        <input
          className={Style.range}
          type={"range"}
          min="1"
          max="6"
          step="1"
          value={header.level}
          onChange={(e) => levelHandler(e)}
        />
      </div>
    </>
  );
}
