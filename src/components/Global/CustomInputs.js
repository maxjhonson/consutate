import React from "react";

export const InputWithValidation = (props, label) => {
  let cssToAdd = "";
  if (props.meta.error && props.meta.touched) cssToAdd = "error";
  else cssToAdd = "";

  return (
    <div class={`field ${cssToAdd}`}>
      <label>{label}</label>
      <input {...props.input} />
      <label style={{ textAlign: "left" }}>
        {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
      </label>
    </div>
  );
};

export const SimpleSpan = ({ input }) => {
  return <span>{input.value}</span>;
};
