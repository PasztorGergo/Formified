import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";
import InputField from "../InputField";
import Style from "../../styles/ElementDetails.module.css";

export default function InputDetails({ input }) {
  const { setSelected, editProperty, findById } = useElements();
  const [bg, setBg] = useState(input.bgColor);
  const [bgOpen, setBgOpen] = useState(false);
  const variantRef = useRef();

  const handleVariant = () => {
    setSelected((prev) => ({ variant: variantRef.current.value, ...prev }));
    editProperty(input.id, "variant", variantRef.current.value);
  };

  const inlineHandler = (e) => {
    setSelected((prev) => ({
      components: [
        ...prev.components,
        {
          component: (
            <InputField id={`input-${input.id}-${prev.components.length}`} />
          ),
          label: "Label",
          placeholder: "Placeholder",
          type: "text",
          bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
        },
      ],
      ...prev,
    }));
    findById(input.id).components = [
      ...findById(input.id).components,
      {
        id: `input-${input.id}-${input.components.length}`,
        component: (
          <InputField
            id={`input-${input.id.split("-")[1]}-${input.components.length}`}
          />
        ),
        label: "Label",
        placeholder: "Placeholder",
        type: "text",
        bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
      },
    ];
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
      <div className={`${Style.variant} ${Style.container}`}>
        <label htmlFor="variant">Variant</label>
        <select
          ref={variantRef}
          onChange={handleVariant}
          id="variant"
          className={Style.variantSelect}
          defaultValue="filled"
        >
          <option value="outlined">outlined</option>
          <option value="filled">filled</option>
          <option value="standard">standard</option>
        </select>
      </div>
      <div className={`${Style.container} ${Style.inlineEl}`}>
        <label htmlFor="inlineElements">Inline elements</label>
        <input
          id="inlineElements"
          type="number"
          min="1"
          value={input.components.length}
          onChange={inlineHandler}
        />
      </div>
    </>
  );
}
