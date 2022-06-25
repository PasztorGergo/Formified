import React from "react";
import { useElements } from "../../Context/ElementProvider";

export default function InlineDetails({ inline }) {
  const { setSelected, editProperty } = useElements();

  const hadnleCols = (cols) => {
    setSelected((prev) => ({ cols, ...prev }));
    editProperty(inline.id, null, "cols", cols);
  };
  return (
    <>
      <div>
        <label htmlFor="columns">Columns</label>
        <input
          type="number"
          id="columns"
          value={inline.cols}
          onChange={(e) => hadnleCols(e.target.value)}
          min="2"
          max="4"
        />
      </div>
    </>
  );
}
