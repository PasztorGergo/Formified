import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";
import Style from "../../styles/ElementDetails.module.css";

export default function InputDetails({ input }) {
  const { setSelected, editProperty } = useElements();
  const [bg, setBg] = useState(input.bgColor);
  const [bgOpen, setBgOpen] = useState(false);
  const variantRef = useRef();
  const handleVariant = () => {
    console.log("change");
    setSelected((prev) => ({ variant: variantRef.current.value, ...prev }));
    editProperty(input.id, "variant", variantRef.current.value);
  };

  useEffect(() => {
    setBg(input.bgColor);
  }, []);

  useEffect(() => {
    editProperty(input.id, "bgColor", bg);
  }, [bg]);

  return (
    <>
      <div className={Style.bgContainer}>
        Background{" "}
        <button
          className={Style.bgColorButton}
          onClick={() => setBgOpen((prev) => !prev)}
          style={{
            backgroundColor: `rgb(${bg.r} ${bg.g} ${bg.b})`,
          }}
        />
        {bgOpen && (
          <SketchPicker
            className={Style.picker}
            color={bg}
            onChange={(c) => {
              setSelected((prev) => ({ bgColor: c.rgb, ...prev }));
              setBg(c.rgb);
            }}
          />
        )}
      </div>
      <div className={Style.variant}>
        <label htmlFor="variant">Variant</label>
        <select
          ref={variantRef}
          onChange={handleVariant}
          id="variant"
          className={Style.variantSelect}
        >
          <option value="outlined">outlined</option>
          <option value="filled">filled</option>
          <option value="standard">standard</option>
        </select>
      </div>
    </>
  );
}
