import React, { useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Inline.module.css";
import { Reorder } from "framer-motion";

export default function InlineBox({ id }) {
  const { elements, findById } = useElements();
  const [inline, setInline] = useState(findById(id).container);
  return (
    <Reorder.Group values={inline} onReorder={setInline} axis="x">
      {inline.map((element) => (
        <Reorder.Item key={element.id} value={element}>
          {element.component}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
