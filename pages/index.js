import React from "react";
import {
  CodeDisplay,
  ComponentPanel,
  Details,
  Display,
  Navigation,
} from "../components";
import { ElementProvider } from "../Context/ElementProvider";
import Style from "../styles/Home.module.css";

export default function App() {
  return (
    <ElementProvider>
      <Navigation home />
      <main className={Style.main}>
        <div className={Style.editor}>
          <ComponentPanel />
          <Display />
          <Details />
        </div>
        <CodeDisplay />
      </main>
    </ElementProvider>
  );
}
