import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useElements } from "../../Context/ElementProvider";
import Style from "../../styles/ElementDetails.module.css";

export default function InputDetails({ input }) {
  const { setSelected, editProperty, elements } = useElements();
  const [bg, setBg] = useState(input.bgColor);
  const [bgOpen, setBgOpen] = useState(false);
  const variantRef = useRef();
  const typeRef = useRef();

  const handleVariant = () => {
    setSelected((prev) => ({ variant: variantRef.current.value, ...prev }));
    editProperty(
      input.id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements).container
        : elements,
      "variant",
      variantRef.current.value
    );
  };

  const handleType = () => {
    setSelected((prev) => ({ type: typeRef.current.value, ...prev }));
    editProperty(
      input.id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements).container
        : elements,
      "type",
      typeRef.current.value
    );
  };

  useEffect(() => {
    setBg(input.bgColor);
  }, []);

  useEffect(() => {
    editProperty(
      input.id,
      id.split("-").length > 2
        ? findById(`inline-${id.split("-")[1]}`, elements).container
        : elements,
      "bgColor",
      bg
    );
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
      <div className={`${Style.variant} ${Style.container}`}>
        <label htmlFor="variant">Type</label>
        <select
          ref={typeRef}
          onChange={handleType}
          id="type"
          className={Style.variantSelect}
          defaultValue="text"
          value={input.type}
        >
          <option value="text">text</option>
          <option value="number">number</option>
          <option value="checkbox">checkbox</option>
          <option value="color">color</option>
          <option value="date">date</option>
          <option value="email">email</option>
          <option value="file">file</option>
          <option value="hidden">hidden</option>
          <option value="image">image</option>
          <option value="month">month</option>
          <option value="password">password</option>
          <option value="radio">radio</option>
          <option value="range">range</option>
          <option value="reset">reset</option>
          <option value="search">search</option>
          <option value="submit">submit</option>
          <option value="tel">Phone</option>
          <option value="time">time</option>
          <option value="url">url</option>
          <option value="week">week</option>
        </select>
      </div>
    </>
  );
}
