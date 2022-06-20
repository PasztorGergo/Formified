import React from "react";
import Style from "./Button.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useElements } from "../../Context/ElementProvider";

export default function RemoveButton({ selected }) {
  const { setElements } = useElements();
  const removeElement = () => {
    setElements((prev) => prev.filter((x) => x.id != selected.id));
  };

  return (
    <button className={Style.btn} onClick={removeElement}>
      <RiDeleteBin6Line />
    </button>
  );
}
