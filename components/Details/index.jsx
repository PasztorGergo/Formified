import React, { useEffect, useState } from "react";
import { useElements } from "../../Context/ElementProvider";
import InputDetails from "../InputDetails";
import RemoveButton from "../RemoveButton";
import SelectionDetails from "../SelectionDetails";
import Style from "./Details.module.css";
import HeaderDetails from "../HeaderDetails";
import ButtonDetails from "../ButtonDetails";

export default function Details() {
  const { selected } = useElements();
  const [detailComp, setDetailComp] = useState();

  useEffect(() => {
    if (selected) {
      if (selected.id.startsWith("input"))
        setDetailComp(<InputDetails input={selected} />);
      else if (selected.id.startsWith("select"))
        setDetailComp(<SelectionDetails selection={selected} />);
      else if (selected.id.startsWith("head"))
        setDetailComp(<HeaderDetails header={selected} />);
      else if (selected.id.startsWith("button"))
        setDetailComp(<ButtonDetails button={selected} />);
    }
  }, [selected?.id]);

  return (
    <div className={Style.details}>
      {detailComp ? (
        <>
          {detailComp}
          <RemoveButton selected={selected} />
        </>
      ) : (
        <h2 className={Style.empty}>
          Get more information of a component, by clicking it!
        </h2>
      )}
    </div>
  );
}
