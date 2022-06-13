import React from "react";
import Style from "./Panel.module.css";
import {
  RiText,
  RiInsertRowBottom,
  RiPlayListAddLine,
  RiStarLine,
  RiCodeSSlashLine,
} from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";
import InputField from "../InputField";
import Heading from "../Heading";

export default function ComponentPanel() {
  const { setElements } = useElements();

  const addInput = () => {
    return setElements((prev) =>
      Array(prev).concat([
        <InputField id={`test-${prev.lenght + 1}`} label="Input" />,
      ])
    );
  };
  const addSelection = () => {
    return setElements((prev) =>
      Array(prev).concat([
        <Selection id={`test-${prev.lenght + 1}`} label="Selection" />,
      ])
    );
  };
  const addHeading = () => {
    return setElements((prev) =>
      Array(prev).concat([<Heading id={`test-${prev.lenght + 1}`} />])
    );
  };
  return (
    <aside className={Style.panel}>
      <button aria-label="Text" className={Style.button} onClick={addHeading}>
        <RiText />
      </button>
      <button aria-label="Field" className={Style.button} onClick={addInput}>
        <RiInsertRowBottom />
      </button>
      <button
        aria-label="Selection"
        className={Style.button}
        onClick={addSelection}
      >
        <RiPlayListAddLine />
      </button>
      <button
        aria-label="Animation"
        className={`${Style.button} ${Style.animation}`}
      >
        <RiStarLine />
      </button>
      <button
        aria-label="Code"
        className={`${Style.button} ${Style.animation}`}
      >
        <RiCodeSSlashLine />
      </button>
    </aside>
  );
}
