import React from "react";
import { useElements } from "../../Context/ElementProvider";
import { RiShareForward2Line } from "react-icons/ri";
import Style from "./Display.module.css";
import { useEffect } from "react";
import { useState } from "react";

export default function CodeDisplay() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [htmlCopied, setHtmlCopied] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);
  const { elements, selected, setElements } = useElements();

  const copy = (data, type) => {
    navigator.clipboard.writeText(data);
    if (type == "html") {
      setHtmlCopied(true);
      setTimeout(() => setHtmlCopied(false), 1500);
    } else {
      setCssCopied(true);
      setTimeout(() => setCssCopied(false), 1500);
    }
  };

  const complieHTML = () => {
    const mapped = elements.map((x) => {
      const id = String(x.id);
      if (id.startsWith("input")) {
        return `  <input class="${x.variant}" id="${id}" type="${x.type}" placeholder="${x.placeholder}" />`;
      } else if (id.startsWith("select")) {
        return `  <select id="${id}">
          ${x.options.map(
            (y) => `
  <option>${y.text}</option>`
          ).join(`
`)}
</select>`;
      } else if (id.startsWith("head")) {
        return `  <h${x.level} id="${id}">${x.label}</h${x.level}>`;
      } else {
        return `  <button id="${id}">${x.label}</button>`;
      }
    });
    return mapped.join(`

`);
  };

  const compileCSS = () => {
    const mapped = elements.map((x) => {
      const id = String(x.id);
      const bg = `rgba(${x?.bgColor?.r}, ${x?.bgColor?.g}, ${x?.bgColor?.b}, ${x?.bgColor?.a})`;
      if (id.startsWith("input") && x.variant == "filled") {
        return `#${id}{
  background-color: ${bg};
  boder-bottom: 2px solid ${bg};
}`;
      } else if (id.startsWith("input") && x.variant == "outlined") {
        return `#${id}{
  background-color: white;
  outline: 2px solid ${bg};
  border-radius: 0.5rem;
  border: none;
}`;
      } else if (id.startsWith("input") && x.variant == "standard") {
        return `#${id}{
  background-color: white;
  boder-bottom: 2px solid ${bg};
}`;
      } else if (id.startsWith("head")) {
        return `#${id}{
  font-weight: semibold;
  color: rgb(${x.color.r}, ${x.color.g}, ${x.color.b});
  text-align: center;
}`;
      } else if (id.startsWith("select") && x.variant == "filled") {
        return `#${id}{
  background-color: ${bg};
  boder-bottom: 2px solid ${bg};
}`;
      } else if (id.startsWith("select") && x.variant == "outlined") {
        return `#${id}{
  background-color: white;
  outline: 2px solid ${bg};
  border-radius: 0.5rem;
  border: none;
}`;
      } else if (id.startsWith("select") && x.variant == "standard") {
        return `#${id}{
  background-color: white;
  boder-bottom: 2px solid ${bg};
}`;
      } else {
        return `#${id}{
  background-color: ${bg};
  color: rgba(${x.color.r}, ${x.color.g}, ${x.color.b}, ${x.color.a});
  border-radius: ${x.radius}rem;
  border: none;
  outline: none;
}`;
      }
    });

    return mapped.join(`

`);
  };

  useEffect(() => {
    setHtml(complieHTML());
    elements.forEach((x) => {
      !css.includes(x.id) && setCss(compileCSS());
    });
  }, [elements, selected]);

  useEffect(() => {
    setCss(compileCSS());
  }, [selected]);

  return (
    <div className={Style.displayContainer}>
      <div className={Style.htmlContainer}>
        <div className={Style.containerHeader}>
          <h2>HTML</h2>
          <button
            aria-label="Copy"
            onClick={(e) => {
              copy(html, "html");
              e.currentTarget.ariaLabel = "Copied";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.ariaLabel = "Copy";
            }}
          >
            <RiShareForward2Line />
          </button>
        </div>
        <div className={Style.container}>
          <div
            className={`${Style.copy} ${
              htmlCopied ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
          >
            Copied🎉
          </div>
          <textarea
            readOnly
            value={`<form>
${html}
</form>`}
            className={Style.display}
            id="htmlContainer"
          ></textarea>
        </div>
      </div>
      <div className={Style.cssContainer}>
        <div className={Style.containerHeader}>
          <h2>CSS</h2>
          <button aria-label="Copy" onClick={() => copy(css, "css")}>
            <RiShareForward2Line />
          </button>
        </div>
        <div className={Style.container}>
          <div
            className={`${Style.copy} ${
              cssCopied ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
          >
            Copied🎉
          </div>
          <textarea
            readOnly
            value={`form{
  display: flex;
  flex-direction: flex-column;
}

${css}`}
            className={Style.display}
            id="cssContainer"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
