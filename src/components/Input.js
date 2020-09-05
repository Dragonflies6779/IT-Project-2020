import React from "react";

export default function Input({ name, value, updateFunc }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={event => {
        updateFunc(event.target.value);
      }}
    />
  );
}
