import React from "react";
import { RiAddCircleLine } from "react-icons/ri";

export default function Selection({ id, label }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id}>
        <option value="">
          <RiAddCircleLine />
        </option>
      </select>
    </>
  );
}
