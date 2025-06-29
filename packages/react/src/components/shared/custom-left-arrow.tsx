"use client";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { FiChevronLeft } from "react-icons/fi";

type Props = {
  onClick?: () => void;
  classes?: string;
};

const CustomLeftArrow: FC<Props> = ({ onClick, classes = "" }) => {
  return (
    <div onClick={onClick} className={classNames("arrow arrow-left", classes)}>
      <FiChevronLeft />
    </div>
  );
};

export default CustomLeftArrow;
