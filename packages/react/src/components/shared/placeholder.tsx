"use client";
import { classNames } from "@/utils";

export type PlaceholderProps = {
  width?: number;
  height?: number;
  className?: string;
};

export const Placeholder = ({ width = 42, height = 42, className }: PlaceholderProps) => {
  return (
    <svg
      className={classNames(className)}
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.25 5.25H8.75C6.817 5.25 5.25 6.817 5.25 8.75V33.25C5.25 35.183 6.817 36.75 8.75 36.75H33.25C35.183 36.75 36.75 35.183 36.75 33.25V8.75C36.75 6.817 35.183 5.25 33.25 5.25Z"
        stroke="#828282"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.875 17.5C16.3247 17.5 17.5 16.3247 17.5 14.875C17.5 13.4253 16.3247 12.25 14.875 12.25C13.4253 12.25 12.25 13.4253 12.25 14.875C12.25 16.3247 13.4253 17.5 14.875 17.5Z"
        stroke="#828282"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.75 26.25L28 17.5L8.75 36.75"
        stroke="#828282"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
