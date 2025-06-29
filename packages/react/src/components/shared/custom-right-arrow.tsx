"use client";
import { classNames } from "@/utils";
import { FC } from "react";
import { FiChevronRight } from "react-icons/fi";

type Props = {
  onClick?: () => void;
  classes?: string;
};

const CustomRightArrow: FC<Props> = ({ onClick, classes }) => {
  return (
    <div onClick={onClick} className={classNames("arrow arrow-right", classes)}>
      <FiChevronRight />
    </div>
  );
};

export default CustomRightArrow;
