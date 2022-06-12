import React from "react";
import { ComponentPanel, Details, Display, Navigation } from "../components";
import { ElementProvider } from "../Context/ElementProvider";
import Style from "../styles/Home.module.css";

export default function App() {
  return (
    <ElementProvider>
      <Navigation home />
      <main className={Style.main}>
        <ComponentPanel />
        <Display />
        <Details />
      </main>
    </ElementProvider>
  );
}
