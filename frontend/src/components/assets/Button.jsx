import React from "react";

function Button({
  type = "button",
  bgprimary,
  textprimary,
  label,
  onClick,
  height,
  text,
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={(e) => onClick(e)}
      className={`${bgprimary} py-1 px-3 rounded-lg text-white ${text} font-exo2 hover:${textprimary} cursor-pointer duration-300 ${height}`}
    >
      {label}
    </button>
  );
}

export default Button;
