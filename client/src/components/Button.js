import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  bgColor,
  IcAfter,
  onClick,
  px,
  width,
  height,
  isDisabled,
  IcBefore,
  style,
}) => {
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`${width} ${height} ${isDisabled && "opacity-75"} py-2 ${
        px ? px : "px-2"
      } ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1 ${style}`}
      onClick={onClick}
    >
      <span>{IcBefore && <IcBefore />}</span>
      <span> {text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
};

export default memo(Button);
