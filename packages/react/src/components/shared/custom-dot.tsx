"use client";
import { FC } from "react";

type Props = {
  onClick?: () => void;
};

const CustomDot: FC<Props> = ({ onClick }) => {
  // return <GoDotFill onClick={onClick} />;
  return <span className="dot" onClick={onClick}></span>;
};

export default CustomDot;
