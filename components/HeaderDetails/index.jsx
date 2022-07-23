import React, { useState, useEffect } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

export default function HeaderDetails({ header }) {
  const { setSelected, editProperty } = useElements();
  const [color, setColor] = useState(header.color);
  const [bgOpen, setBgOpen] = useState(false);

  useEffect(() => {
    editProperty(header.id, "color", color);
  }, [color]);

  const levelHandler = (e) => {
    setSelected((prev) => ({
      level: e.target.value * -1,
      ...prev,
    }));
    editProperty(header.id, "level", e.target.value * -1);
  };

  const alignHandler = (e) => {
    setSelected((prev) => ({ align: e, ...prev }));
    editProperty(header.id, "align", e);
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
          min="-6"
          max="-1"
          step="1"
          value={header.level * -1}
          onChange={(e) => levelHandler(e)}
        />
      </div>
      <div className={Style.container}>
        <p>Text aligment</p>
        <div className={Style.buttonGroup}>
          <div>
            <label htmlFor="left" onClick={(e) => alignHandler("left")}>
              <FaAlignLeft size={24} className="fill-slate-500" />
            </label>
            <input type="radio" name="align" id="left" />
          </div>
          <div>
            <label htmlFor="center" onClick={(e) => alignHandler("center")}>
              <FaAlignCenter size={24} className="fill-slate-500" />
            </label>
            <input type="radio" name="align" id="center" />
          </div>
          <div>
            <label htmlFor="right" onClick={(e) => alignHandler("right")}>
              <FaAlignRight size={24} className="fill-slate-500" />
            </label>
            <input type="radio" name="align" id="right" />
          </div>
        </div>
      </div>
    </>
  );
}
