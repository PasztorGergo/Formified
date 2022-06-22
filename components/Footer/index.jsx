import React from "react";
import Style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={Style.footer}>
      <a href="https://twitter.com/G3rgoPasztor">Gergő Pásztor</a> &copy;{" "}
      <time dateTime={new Date().getUTCFullYear()}>
        {new Date().getUTCFullYear()}
      </time>
    </footer>
  );
}
