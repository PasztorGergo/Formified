import React from "react";
import { useElements } from "../../Context/ElementProvider";
import { RiShareForward2Line } from "react-icons/ri";
import Style from "./Display.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiCss3, SiTailwindcss } from "react-icons/si";

export default function CodeDisplay() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [htmlCopied, setHtmlCopied] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);
  const [isTailwind, setCSSMode] = useState(false);
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
      } else if (id.startsWith("button")) {
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
      const border = `rgb(${x?.bgColor?.r}, ${x?.bgColor?.g}, ${x?.bgColor?.b})`;

      if (!isTailwind) {
        if (id.startsWith("input") && x.variant == "filled") {
          return `#${id}{
  background-color: ${bg};
  border-bottom-color: ${border}
}`;
        } else if (id.startsWith("input") && x.variant == "outlined") {
          return `#${id}{
  outline: 2px solid ${bg};
}`;
        } else if (id.startsWith("input") && x.variant == "standard") {
          return `#${id}{
  boder-bottom: 2px solid ${bg};
}`;
        } else if (id.startsWith("head")) {
          return `#${id}{
  font-weight: semibold;
  color: rgb(${x.color.r}, ${x.color.g}, ${x.color.b});
  text-align: center;
  font-size: ${
    x.level == 1
      ? "2.25"
      : x.level == 2
      ? "1.5"
      : x.level == 3
      ? "1.25"
      : x.level == 4
      ? "1.125"
      : x.level == 5
      ? "1"
      : "0.875"
  }rem
}`;
        } else if (id.startsWith("select") && x.variant == "filled") {
          return `#${id}{
  background-color: ${bg};
  boder-bottom-color: ${border};
}`;
        } else if (id.startsWith("select") && x.variant == "outlined") {
          return `#${id}{
  outline: 2px solid ${bg};
}`;
        } else if (id.startsWith("select") && x.variant == "standard") {
          return `#${id}{
  boder-bottom: 2px solid ${bg};
}`;
        } else if (id.startsWith("head")) {
          return `#${id}{
  background-color: ${bg};
  color: rgba(${x.color.r}, ${x.color.g}, ${x.color.b}, ${x.color.a});
  border-radius: ${x.radius}rem;
  border: none;
  outline: none;
}`;
        }
      } else {
        if (id.startsWith("input") && x.variant == "filled") {
          return `#${id}{
    @apply bg-[${bg}] border-b-[${border}];
  }`;
        } else if (id.startsWith("input") && x.variant == "outlined") {
          return `#${id}{
    @apply outline-[${bg}];
  }`;
        } else if (id.startsWith("input") && x.variant == "standard") {
          return `#${id}{
    @apply border-b-[${bg}];
  }`;
        } else if (id.startsWith("head")) {
          return `#${id}{
    @apply font-semibold text-[rgb(${x.color.r}, ${x.color.g}, ${
            x.color.b
          })] text-${x.align} text-${
            x.level == 1
              ? "4xl"
              : x.level == 2
              ? "2xl"
              : x.level == 3
              ? "xl"
              : x.level == 4
              ? "lg"
              : x.level == 5
              ? "base"
              : "sm"
          };
}`;
        } else if (id.startsWith("select") && x.variant == "filled") {
          return `#${id}{
    background-color: ${bg};
    boder-bottom-color: ${border};
  }`;
        } else if (id.startsWith("select") && x.variant == "outlined") {
          return `#${id}{
    outline: 2px solid ${bg};
  }`;
        } else if (id.startsWith("select") && x.variant == "standard") {
          return `#${id}{
    boder-bottom: 2px solid ${bg};
  }`;
        }
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
  }, [selected, isTailwind]);

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
          <motion.div
            animate={{
              visibility: htmlCopied ? "visible" : "hidden",
              opacity: htmlCopied ? 1 : 0,
            }}
            initial={{ visibility: "hidden", opacity: 0 }}
            className={Style.copy}
          >
            Copied????
          </motion.div>
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
          <div className={Style.switchContainer}>
            <SiCss3 color={isTailwind ? "inherit" : "#3366bb"} />
            <div
              className={Style.switch}
              data-isOn={isTailwind}
              onClick={() => setCSSMode((prev) => !prev)}
            >
              <motion.div
                layout
                className={Style.handle}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </div>
            <SiTailwindcss color={isTailwind ? "#0ea5e9" : "inherit"} />
          </div>
          <button aria-label="Copy" onClick={() => copy(css, "css")}>
            <RiShareForward2Line />
          </button>
        </div>
        <div className={Style.container}>
          <motion.div
            animate={{
              visibility: cssCopied ? "visible" : "hidden",
              opacity: cssCopied ? 1 : 0,
            }}
            initial={{ visibility: "hidden", opacity: 0 }}
            className={Style.copy}
          >
            Copied????
          </motion.div>
          <textarea
            readOnly
            value={
              isTailwind
                ? `form{
  @apply flex flex-col;
}

input{
  @apply transition-all py-1 px-3 h-10;
}

.filled{
  @apply border-b-2 border-opacity-60 focus:border-opacity-100;
}

.standard{
  @apply bg-white;
}

.outlined{
  @apply outline outline-2 border-none rounded-lg;
}

${css}
`
                : `form{
  display: flex;
  flex-direction: flex-column;
}

.filled{
  boder-bottom-width: 2px;
  border-bottom-style: solid;
}

.standard{
  background-color: white;
  border-radius: 0.5rem;
  border: none;
}

.outlined{
  background-color: white;
  border-radius: 0.5rem;
  border: none;
}
${css}`
            }
            className={Style.display}
            id="cssContainer"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
