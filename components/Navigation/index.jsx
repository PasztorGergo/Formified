import Link from "next/link";
import React from "react";
import Style from "./Nav.module.css";

export default function Navigation({ home }) {
  return (
    <nav className={Style.nav}>
      <Link href="/">
        <h2 className={Style.brand}>Formified</h2>
      </Link>

      <ul className={Style.links}>
        <Link href="/">
          <li className={`${Style.link} ${home ? Style.active : ""}`}>
            Editor
          </li>
        </Link>
        <Link href="/templates">
          <li className={`${Style.link} ${home ? "" : Style.active}`}>
            Explore
          </li>
        </Link>
      </ul>
    </nav>
  );
}
