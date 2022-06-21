import React, { useRef, useState, useEffect } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { RiAddBoxLine } from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";
import { SketchPicker } from "react-color";

export default function SelectionDetails({ selection }) {
  const { findById, setSelected, editProperty } = useElements();
  const [editing, setEditing] = useState(false);
  const editRef = useRef();
  const variantRef = useRef();
  const [bg, setBg] = useState(selection.bgColor);
  const [bgOpen, setBgOpen] = useState(false);

  useEffect(() => {
    setBg(selection.bgColor);
  }, []);

  useEffect(() => {
    editProperty(selection.id, "bgColor", bg);
  }, [bg]);

  const handleVariant = () => {
    setSelected((prev) => ({ variant: variantRef.current.value, ...prev }));
    editProperty(selection.id, "variant", variantRef.current.value);
  };

  const handleOption = () => {
    findById(selection.id).options.push({
      id: findById(selection.id).options.length,
      text: `New option ${findById(selection.id).options.length}`,
      type: "option",
    });
    setSelected((prev) => ({
      options: [
        ...prev.options,
        {
          id: prev.options.length,
          text: `New option ${prev.options.length}`,
          type: "option",
        },
      ],
      ...prev,
    }));
  };
  const handleGroup = () => {};
  const editOption = () => {
    const edit = selection.options.filter(
      ({ id }) => id == editRef.current.id
    )[0];
    edit.text = editRef.current.value;

    setSelected((prev) => ({
      options: [
        ...prev.options,
        (prev.options.filter(({ id }) => id == editRef.current.id)[0].text =
          editRef.current.value),
      ],
      ...prev,
    }));
  };

  return (
    <>
      <div className={`${Style.bgContainer} ${Style.container}`}>
        Background{" "}
        <button
          className={Style.bgColorButton}
          onClick={() => setBgOpen((prev) => !prev)}
          style={{
            backgroundColor: `rgb(${selection.bgColor.r} ${selection.bgColor.g} ${selection.bgColor.b})`,
          }}
        />
        {bgOpen && (
          <SketchPicker
            className={Style.picker}
            color={selection.bgColor}
            onChange={(c) => {
              setSelected((prev) => ({ bgColor: c.rgb, ...prev }));
              setBg(c.rgb);
            }}
          />
        )}
      </div>
      <div className={`${Style.container} flex-wrap`}>
        <label htmlFor="" className="basis-full">
          Options
        </label>
        <button
          onClick={handleGroup}
          className=" bg-green-400 hover:bg-green-500 transition-colors rounded-lg px-3 py-1 uppercase text-sm font-semibold flex-grow-[0.25] flex items-center justify-center"
        >
          <RiAddBoxLine className="text-xl" /> Group
        </button>
        <button
          onClick={handleOption}
          className=" bg-green-400 hover:bg-green-500 transition-colors rounded-lg px-3 py-1 uppercase text-sm font-semibold flex-grow-[0.25] flex items-center justify-center"
        >
          <RiAddBoxLine className="text-xl" /> Option
        </button>
      </div>
      <div
        className={` ${Style.scrollable} bg-black bg-opacity-10 rounded-lg px-4 py-1 flex-col overflow-y-scroll  h-24`}
      >
        {selection.options.map(({ text, type, id }) => (
          <div onClick={() => setEditing(true)}>
            {editing ? (
              <input
                value={text}
                onChange={editOption}
                ref={editRef}
                onBlur={() => setEditing(false)}
                id={id}
              />
            ) : (
              React.createElement(type, { key: id, id }, text)
            )}
          </div>
        ))}
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
    </>
  );
}
