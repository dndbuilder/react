"use client";
import { Tooltip } from "@/components/shared/tooltip";
import { useActionContext } from "@/contexts/action-context";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/store/app-slice";
import { classNames } from "@/utils";
import { FC } from "react";
import { FiSettings } from "react-icons/fi";

type SettingsToggleProps = {
  className?: string;
};

const SettingsToggle: FC<SettingsToggleProps> = ({ className }) => {
  const activeRightPanel = useAppSelector((state) => state.app.activeBuilderRightPanel);

  const { toggleRightPanel } = useActionContext();

  return (
    <Tooltip>
      <Tooltip.Trigger
        onClick={() => {
          toggleRightPanel(BuilderRightPanelType.SETTINGS);
        }}
        className={classNames(
          "text-gray-100 hover:text-gray-800",
          activeRightPanel === BuilderRightPanelType.SETTINGS && "text-gray-800",
          className
        )}
      >
        <FiSettings size={18} />
      </Tooltip.Trigger>
      <Tooltip.Content>Settings</Tooltip.Content>
    </Tooltip>
  );
};

export default SettingsToggle;
