import React from "react";
import Style from "./Details.module.css";

export default function Details({ component }) {
  return (
    <div className={Style.details}>
      {component ? (
        ""
      ) : (
        <h2 className={Style.empty}>
          Get more information of a component, by clicking it!
        </h2>
      )}
    </div>
  );
}
