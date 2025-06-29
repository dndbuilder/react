"use client";
import React, { Fragment } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

export interface RatingProps {
  className?: string;
  count: number;
  value: number;
  size?: number;
  isHalf?: boolean;
  emptyIcon?: IconType;
  halfIcon?: IconType;
  fullIcon?: IconType;
}

export const Rating: React.FC<RatingProps> = (props) => {
  const {
    className,
    count,
    value,
    isHalf = true,
    size,
    emptyIcon = BsStar,
    halfIcon = BsStarHalf,
    fullIcon = BsStarFill,
  } = props;

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star;
    if (isHalf && value - i > 0 && value - i < 1) {
      star = halfIcon;
    } else if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    stars.push(
      <Fragment key={i}>
        {React.createElement(star, {
          className: "cursor-pointer",
          size,
        })}
      </Fragment>
    );
  }

  return (
    <div className={twMerge("flex items-center gap-0.5 text-lg text-yellow-400", className)}>
      {stars}
    </div>
  );
};
