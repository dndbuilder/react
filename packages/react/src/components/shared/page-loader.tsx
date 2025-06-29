"use client";
import { FC } from "react";
import { Spinner } from "./spinner";
import { classNames } from "@/utils";

export type PageLoaderProps = {
  className?: string;
};

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className={classNames("flex h-screen w-full items-center justify-center", className)}>
      <Spinner className="h-10 w-10" />
    </div>
  );
};
