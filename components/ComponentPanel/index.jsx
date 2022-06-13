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
import Select from "../Selection";

export default function ComponentPanel() {
  const { setElements } = useElements();

  const addInput = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `input-${prev.length}`,
        component: <InputField id={`input-${prev.length}`} />,
        label: "Label",
        placeholder: "Placeholder",
        type: "text",
      },
    ]);
  };
  const addSelection = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `select-${prev.length}`,
        component: <Select id={`select-${prev.length}`} />,
        label: "Label",
      },
    ]);
  };
  const addHeading = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `heading-${prev.length}`,
        component: <Heading id={`heading-${prev.length}`} />,
        label: "Heading",
      },
    ]);
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
