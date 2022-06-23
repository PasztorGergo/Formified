import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";
import InputField from "../InputField";
import Style from "../../styles/ElementDetails.module.css";

export default function InputDetails({ input }) {
  const { setSelected, editProperty } = useElements();
  const [bg, setBg] = useState(input.bgColor);
  const [bgOpen, setBgOpen] = useState(false);
  const variantRef = useRef();

  const handleVariant = () => {
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
      <div className={`${Style.bgContainer} ${Style.container}`}>
        Background{" "}
        <button
          className={Style.bgColorButton}
          onClick={() => setBgOpen((prev) => !prev)}
          style={{
            backgroundColor: `rgb(${input.bgColor.r} ${input.bgColor.g} ${input.bgColor.b})`,
          }}
        />
        {bgOpen && (
          <SketchPicker
            className={Style.picker}
            color={input.bgColor}
            onChange={(c) => {
              setSelected((prev) => ({ bgColor: c.rgb, ...prev }));
              setBg(c.rgb);
            }}
          />
        )}
      </div>
      <div className={`${Style.variant} ${Style.container}`}>
        <label htmlFor="variant">Variant</label>
        <select
          ref={variantRef}
          onChange={handleVariant}
          id="variant"
          className={Style.variantSelect}
          defaultValue="filled"
          value={input.variant}
        >
          <option value="outlined">outlined</option>
          <option value="filled">filled</option>
          <option value="standard">standard</option>
        </select>
      </div>
    </>
  );
}
