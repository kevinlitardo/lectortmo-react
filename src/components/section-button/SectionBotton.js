import React from "react";

import "./SectionButton.css";

export default function Section({
  Icon,
  title,
  backgroundStyle,
  iconStyle,
  textStyle,
  bottonActive,
}) {
  const handleClick = () => {
    bottonActive(title);
  };

  return (
    <div
      onClick={handleClick}
      className="section"
      style={backgroundStyle ? backgroundStyle : null}
    >
      {Icon && <Icon style={iconStyle ? iconStyle : null} />}
      <h4 style={textStyle ? textStyle : null}>{title}</h4>
    </div>
  );
}
