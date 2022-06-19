import React, { useRef, useState } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { RiAddBoxLine } from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";

export default function SelectionDetails({ selection }) {
  const { findById, setSelected } = useElements();
  const [editing, setEditing] = useState(false);
  const editRef = useRef();
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
    </>
  );
}
