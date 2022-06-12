import React from "react";
import Style from "./Panel.module.css";
import { RiText, RiInsertRowBottom, RiPlayListAddLine } from "react-icons/ri";

export default function ComponentPanel() {
  return (
    <aside className={Style.panel}>
      <button aria-label="Text" className={Style.button}>
        <RiText />
      </button>
      <button aria-label="Field" className={Style.button}>
        <RiInsertRowBottom />
      </button>
      <button aria-label="Selection" className={Style.button}>
        <RiPlayListAddLine />
      </button>
      <button
        aria-label="Animation"
        className={`${Style.button} ${Style.animation}`}
      >
        ✨
      </button>
    </aside>
  );
}
