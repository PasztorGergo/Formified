import Link from "next/link";
import React from "react";
import Style from "./Nav.module.css";
import Logo from "../../public/images/formified_logo.svg";
import Image from "next/image";

export default function Navigation({ home }) {
  return (
    <nav className={Style.nav}>
      <Link href="/">
        <h2 className={Style.brand}>
          <Image src={Logo} height={24} width={21.6} />
          ormified
        </h2>
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
