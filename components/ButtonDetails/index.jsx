import React, { useRef, useState, useEffect } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "../../styles/ElementDetails.module.css";
import { SketchPicker } from "react-color";

export default function ButtonDetails({ button }) {
  const { findById, setSelected, editProperty } = useElements();
  const [bg, setBg] = useState(button.bgColor);
  const [bgOpen, setBgOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const editRef = useRef();

  useEffect(() => {
    setBg(button.bgColor);
  }, []);

  useEffect(() => {
    editProperty(button.id, "bgColor", bg);
  }, [bg]);

  return (
    <>
      <div className={`${Style.bgContainer} ${Style.container}`}>
        Background{" "}
        <button
          className={Style.bgColorButton}
          onClick={() => setBgOpen((prev) => !prev)}
          style={{
            backgroundColor: `rgb(${button.bgColor.r} ${button.bgColor.g} ${button.bgColor.b})`,
          }}
        />
        {bgOpen && (
          <SketchPicker
            className={Style.picker}
            color={button.bgColor}
            onChange={(c) => {
              setSelected((prev) => ({ bgColor: c.rgb, ...prev }));
              setBg(c.rgb);
            }}
          />
        )}
      </div>
    </>
  );
}
