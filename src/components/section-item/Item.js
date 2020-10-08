import React from "react";

import "./Item.css";

export default function Item({ Icon, title }) {
  return (
    <a href="/" className="item">
      {Icon && <Icon />}
      <span>{title}</span>
    </a>
  );
}
