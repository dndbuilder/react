"use client";
import { BlockProps } from "@/types/block";
import { FC } from "react";
import { ProgressBarSettingsType } from "../types";

const ProgressBar: FC<BlockProps<ProgressBarSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";
  const title = settings.title?.content?.[locale];

  const value = settings.percentage?.value || 0;

  return (
    <div className="progress-bar-wrapper">
      {title && <div className="progress-bar-title mb-1">{title}</div>}

      <div className="progress-bar relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="progress-bar-fill h-full rounded-full bg-slate-800 text-white transition-all duration-500 ease-in-out"
          style={{ width: `${value}%` }}
        >
          {value > 0 && (
            <div className="progress-bar-percentage flex h-full w-full items-center justify-center px-4 text-xs">
              {`${value}%`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
