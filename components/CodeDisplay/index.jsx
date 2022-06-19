import React from "react";
import { useElements } from "../../Context/ElementProvider";
import { RiShareForward2Line } from "react-icons/ri";

export default function CodeDisplay() {
  const { elements } = useElements();
  return (
    <div className={Style.displayContainer}>
      <div className={Style.htmlContainer}>
        <button>
          <RiShareForward2Line />
        </button>
        <textarea className={Style.display} id="htmlContainer"></textarea>
      </div>
      <div className={Style.cssContainer}>
        <button>
          <RiShareForward2Line />
        </button>
        <textarea className={Style.display} id="cssContainer"></textarea>
      </div>
    </div>
  );
}
