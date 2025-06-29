"use client";
import { useActionContext } from "@/contexts/action-context";
import { BuilderRightPanelType } from "@/store/app-slice";
import { classNames } from "@/utils";
import Structure from "./structure";
import ThemeSettings from "./theme-settings";

export const RightPanel = () => {
  const { activeRightPanel } = useActionContext();

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
