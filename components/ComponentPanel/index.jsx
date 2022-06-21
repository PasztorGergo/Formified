import React from "react";
import Style from "./Panel.module.css";
import {
  RiText,
  RiInsertRowBottom,
  RiPlayListAddLine,
  RiRadioButtonLine,
} from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";
import InputField from "../InputField";
import Heading from "../Heading";
import Select from "../Selection";
import Button from "../Button";

export default function ComponentPanel() {
  const { setElements } = useElements();

  const addInput = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `input-${prev.filter((x) => x.id.startsWith("input")).length}`,
        components: [
          <InputField
            id={`input-${prev.filter((x) => x.id.startsWith("input")).length}`}
          />,
        ],
        label: "Label",
        placeholder: "Placeholder",
        type: "text",
        bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
        variant: "filled",
      },
    ]);
  };
  const addSelection = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `select-${prev.filter((x) => x.id.startsWith("select")).length}`,
        components: [
          <Select
            id={`select-${
              prev.filter((x) => x.id.startsWith("select")).length
            }`}
          />,
        ],
        label: "Label",
        options: [],
        variant: "filled",
        bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
      },
    ]);
  };
  const addHeading = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `heading-${prev.filter((x) => x.id.startsWith("heading")).length}`,
        components: [
          <Heading
            id={`heading-${
              prev.filter((x) => x.id.startsWith("heading")).length
            }`}
          />,
        ],
        label: "Heading",
        level: 2,
        color: { r: 20, g: 20, b: 20, a: 1 },
      },
    ]);
  };
  const addButton = () => {
    return setElements((prev) => [
      ...prev,
      {
        id: `button-${prev.filter((x) => x.id.startsWith("button")).length}`,
        components: [
          <Button
            id={`button-${
              prev.filter((x) => x.id.startsWith("button")).length
            }`}
          />,
        ],
        label: "Button",
        bgColor: { r: 12, g: 200, b: 12, a: 1 },
        color: { r: 10, g: 10, b: 10, a: 1 },
        radius: 0.5,
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
      <button aria-label="Button" className={Style.button} onClick={addButton}>
        <RiRadioButtonLine />
      </button>
    </aside>
  );
}
