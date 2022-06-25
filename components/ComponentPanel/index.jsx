import React from "react";
import Style from "./Panel.module.css";
import {
  RiText,
  RiInsertRowBottom,
  RiPlayListAddLine,
  RiRadioButtonLine,
  RiTableLine,
} from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";
import InputField from "../InputField";
import Heading from "../Heading";
import Select from "../Selection";
import Button from "../Button";
import InlineBox from "../InlineBox";

export default function ComponentPanel() {
  const { setElements } = useElements();

  const createId = (element, prev) => {
    const number =
      prev.filter((x) => x.id.startsWith(element)).length < 1
        ? 0
        : prev.filter((x) => x.id.startsWith(element)).length;
    return `${element}-${number}`;
  };

  const addInput = () => {
    return setElements((prev) => {
      const id = createId("input", prev);
      return [
        ...prev,
        {
          id,
          component: <InputField key={id} id={id} />,

          label: "Label",
          placeholder: "Placeholder",
          type: "text",
          bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
          variant: "filled",
        },
      ];
    });
  };
  const addSelection = () => {
    return setElements((prev) => {
      const id = createId("selection", prev);
      return [
        ...prev,
        {
          id,
          component: <Select key={id} id={id} />,

          label: "Label",
          options: [],
          variant: "filled",
          bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
        },
      ];
    });
  };
  const addHeading = () => {
    return setElements((prev) => {
      const id = createId("heading", prev);
      return [
        ...prev,
        {
          id: `heading-${
            prev.filter((x) => x.id.startsWith("heading")).length
          }`,
          component: (
            <Heading
              key={`heading-${
                prev.filter((x) => x.id.startsWith("heading")).length
              }`}
              id={`heading-${
                prev.filter((x) => x.id.startsWith("heading")).length
              }`}
            />
          ),

          label: "Heading",
          level: 2,
          color: { r: 20, g: 20, b: 20, a: 1 },
        },
      ];
    });
  };
  const addButton = () => {
    return setElements((prev) => {
      const id = createId("heading", prev);
      return [
        ...prev,
        {
          id,
          component: <Button key={id} id={id} />,

          label: "Button",
          bgColor: { r: 12, g: 200, b: 12, a: 1 },
          color: { r: 10, g: 10, b: 10, a: 1 },
          radius: 0.5,
        },
      ];
    });
  };
  const addInline = () => {
    return setElements((prev) => {
      const id = createId("inline", prev);
      const inputId = `input-${id.split("-")[1]}-${
        prev.container?.length || 0
      }`;
      return [
        ...prev,
        {
          id,
          cols: 2,
          component: <InlineBox id={id} key={id} />,
          container: [
            {
              id: inputId,
              component: <InputField key={inputId} id={inputId} />,

              label: "Label",
              placeholder: "Placeholder",
              type: "text",
              bgColor: { r: 120, g: 120, b: 120, a: 0.6 },
              variant: "filled",
            },
          ],
        },
      ];
    });
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
      <button
        aria-label="Inline Box"
        className={Style.button}
        onClick={addInline}
      >
        <RiTableLine />
      </button>
    </aside>
  );
}
