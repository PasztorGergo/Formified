import React from "react";
import { useElements } from "../../Context/ElementProvider";
import InputDetails from "../InputDetails";
import Style from "./Details.module.css";

export default function Details() {
  const { selected } = useElements();
  return (
    <div className={Style.details}>
      {selected ? (
        String(selected.id).startsWith("input") ? (
          <InputDetails input={selected} />
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
