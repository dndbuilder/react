"use client";
import { Tooltip } from "@/components/shared/tooltip";
import { useAction } from "@/hooks";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/types";
import { classNames } from "@/utils";
import { FC } from "react";
import { FiSettings } from "react-icons/fi";

type SettingsToggleProps = {
  className?: string;
};

const SettingsToggle: FC<SettingsToggleProps> = ({ className }) => {
  const activeRightPanel = useAppSelector((state) => state.app.activeBuilderRightPanel);

  const { toggleRightPanel } = useAction();

  return (
    <Tooltip>
      <Tooltip.Trigger
        asChild
        onClick={() => {
          toggleRightPanel(BuilderRightPanelType.SETTINGS);
        }}
        className={classNames(
          "text-gray-100 hover:text-gray-800",
          activeRightPanel === BuilderRightPanelType.SETTINGS && "text-gray-800",
          className
        )}
      >
        <button type="button">
          <FiSettings size={18} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>Settings</Tooltip.Content>
    </Tooltip>
  );
};

export default SettingsToggle;
