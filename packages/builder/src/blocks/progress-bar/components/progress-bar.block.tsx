"use client";
import { BlockProps } from "@/types/block";
import { FC } from "react";
import { ProgressBarSettingsType } from "../types";

const ProgressBar: FC<BlockProps<ProgressBarSettingsType>> = ({
  settings,
  meta: { locale },
}) => {
  const title =
    settings.title?.content?.[locale] || settings.title?.content?.en;

  const value = settings.percentage?.value || 0;

  return (
    <div className="progress-bar-wrapper">
      {title && <div className="progress-bar-title mb-1">{title}</div>}

      <div className="progress-bar relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="progress-bar-fill h-full text-white transition-all rounded-full bg-slate-800 duration-500 ease-in-out"
          style={{ width: `${value}%` }}
        >
          {value > 0 && (
            <div className="progress-bar-percentage w-full h-full flex items-center justify-center px-4 text-xs">
              {`${value}%`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
