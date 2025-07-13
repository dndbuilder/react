"use client";
import { Tooltip } from "@/components/shared/tooltip";
import { useAction } from "@/hooks";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/types";
import { classNames } from "@/utils";
import { FC } from "react";
import { FiLayers } from "react-icons/fi";

type StructureToggleProps = {
  className?: string;
};

const StructureToggle: FC<StructureToggleProps> = ({ className }) => {
  const activeRightPanel = useAppSelector((state) => state.app.activeBuilderRightPanel);

  const { toggleRightPanel } = useAction();

  return (
    <Tooltip>
      <Tooltip.Trigger
        asChild
        onClick={() => {
          toggleRightPanel(BuilderRightPanelType.LAYER);
        }}
        className={classNames("text-gray-100 hover:text-gray-800", {
          "text-gray-800": activeRightPanel === BuilderRightPanelType.LAYER,
          className,
        })}
      >
        <button type="button">
          <FiLayers size={16} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>Layers</Tooltip.Content>
    </Tooltip>
  );
};

export default StructureToggle;
