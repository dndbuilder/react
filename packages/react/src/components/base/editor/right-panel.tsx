"use client";
import { BuilderRightPanelType } from "@/types";
import { classNames } from "@/utils";
import Structure from "./structure";
import ThemeSettings from "./theme-settings";
import { useAction } from "@/hooks";

export const RightPanel = () => {
  const { activeRightPanel } = useAction();

  return (
    <div
      className={classNames(
        "absolute z-30 flex h-full w-[290px] flex-col bg-white shadow-sm transition-all duration-300",
        activeRightPanel !== null ? "right-0" : "right-[-290px]"
      )}
    >
      {activeRightPanel === BuilderRightPanelType.SETTINGS && <ThemeSettings />}
      {activeRightPanel === BuilderRightPanelType.LAYER && <Structure />}
    </div>
  );
};
