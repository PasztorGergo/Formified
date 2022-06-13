import React from "react";

export default function InputField({ id, label, type, ref, ...rest }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </>
  );
}
