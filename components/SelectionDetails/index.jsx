import React, { useRef, useState } from "react";
import Style from "../../styles/ElementDetails.module.css";
import { RiAddBoxLine } from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";

export default function SelectionDetails({ selection }) {
  const { findById, setSelected } = useElements();
  const [editing, setEditing] = useState(false);
  const editRef = useRef();
  const handleOption = () => {
    findById(selection.id).options.push(
      <option>New option {String(selection.options.length)}</option>
    );
    setSelected((prev) => ({
      options: [
        ...prev.options,
        <option>New option {String(selection.options.length)}</option>,
      ],
      ...prev,
    }));
  };
  const handleGroup = () => {};
  const editOption = (opt) => {
    selection.options.filter((x) => x == opt)[0] = (
      <option>{editRef.current.value}</option>
    );
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
        {selection.options.map((opt) => (
          <div onClick={() => setEditing(true)}>
            {editing ? (
              <input
                value={opt.props.children?.join("")}
                onChange={() => editOption(opt)}
                ref={editRef}
                onBlur={() => setEditing(false)}
              />
            ) : (
              opt
            )}
          </div>
        ))}
      </div>
    </>
  );
}
