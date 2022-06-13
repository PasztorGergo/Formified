import React from "react";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Details.module.css";

export default function Details() {
  const { selected, setSelected } = useElements();
  return (
    <div className={Style.details}>
      {selected ? (
        String(selected.id).startsWith("input") ? (
          "Edit your input"
        ) : String(selected.id).startsWith("heading") ? (
          "Edit you head"
        ) : String(selected.id).startsWith("select") ? (
          "Edit your select"
        ) : (
          "It's a button!"
        )
      ) : (
        <h2 className={Style.empty}>
          Get more information of a component, by clicking it!
        </h2>
      )}
    </div>
  );
}
