import React from "react";
import { useElements } from "../../Context/ElementProvider";
import { RiShareForward2Line } from "react-icons/ri";
import Style from "./Display.module.css";
import { useEffect } from "react";
import { useState } from "react";

export default function CodeDisplay() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const { elements, selected } = useElements();

  const copy = (data) => {
    navigator.clipboard.writeText(data);
  };

  const complieHTML = () => {
    const mapped = elements.map((x) => {
      const id = String(x.id);
      if (id.startsWith("input")) {
        return `<input class="${x.variant}" id="${id}" type="${x.type}" placeholder="${x.placeholder}" />`;
      } else if (id.startsWith("select")) {
        return `<select id="${id}">
          ${x.options.map((y) => `<option>${y.text}</option>`)}
</select>`;
      } else if (id.startsWith("head")) {
        return `<h${x.level} id="${id}">${x.label}</h${x.level}>`;
      } else {
      }
    });
    return mapped.join(`

`);
  };

  useEffect(() => setHtml(complieHTML()), [elements, selected]);

  return (
    <div className={Style.displayContainer}>
      <div className={Style.htmlContainer}>
        <div className={Style.containerHeader}>
          <h2>HTML</h2>
          <button
            aria-label="Copy"
            onClick={(e) => {
              copy(html);
              e.currentTarget.ariaLabel = "Copied";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.ariaLabel = "Copy";
            }}
          >
            <RiShareForward2Line />
          </button>
        </div>
        <textarea
          readOnly
          value={html}
          className={Style.display}
          id="htmlContainer"
        ></textarea>
      </div>
      <div className={Style.cssContainer}>
        <div className={Style.containerHeader}>
          <h2>CSS</h2>
          <button aria-label="Copy">
            <RiShareForward2Line />
          </button>
        </div>
        <textarea
          readOnly
          className={Style.display}
          id="cssContainer"
        ></textarea>
      </div>
    </div>
  );
}
