import React from "react";
import classes from "./Box.module.css";

function Box({ id, color, selectBox, selected, x, y }) {
  const position = `translate(${x}px,${y}px)`;
  return (
    <div
      onClick={() => selectBox(id)}
      className={classes.box}
      id={id}
      style={{
        backgroundColor: color,
        zIndex: id + 1,
        transform: position,
        border: `${
          selected == id ? "solid 4px #ffffffb4" : "solid 2px #ffffff42"
        }`,
      }}
    ></div>
  );
}

export default Box;
