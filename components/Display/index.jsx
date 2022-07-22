import React, { useRef } from "react";
import Style from "./Display.module.css";
import { useElements } from "../../Context/ElementProvider";
import { Reorder } from "framer-motion";

export default function Display() {
  const { elements, setElements, setSelected } = useElements();

  console.log(elements.flat(3));

  return (
    <Reorder.Group
      className={Style.display}
      values={elements}
      onReorder={setElements}
      axis="y"
    >
      {elements.map((element, i) => (
        <Reorder.Item
          key={element.id}
          value={element}
          onClick={(e) => setSelected(element)}
          className={Style.draggable}
        >
          {element.component}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
