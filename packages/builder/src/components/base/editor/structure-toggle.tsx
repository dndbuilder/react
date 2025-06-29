"use client";
import { Tooltip } from "@/components/shared/tooltip";
import { useActionContext } from "@/contexts/action-context";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderRightPanelType } from "@/store/app-slice";
import { classNames } from "@/utils";
import { FC } from "react";
import { FiLayers } from "react-icons/fi";

type StructureToggleProps = {
  className?: string;
};

const StructureToggle: FC<StructureToggleProps> = ({ className }) => {
  const activeRightPanel = useAppSelector((state) => state.app.activeBuilderRightPanel);

  const { toggleRightPanel } = useActionContext();

  return (
    <Tooltip>
      <Tooltip.Trigger
        onClick={() => {
          toggleRightPanel(BuilderRightPanelType.LAYER);
        }}
        className={classNames("text-slate-100 hover:text-slate-800", {
          "text-slate-800": activeRightPanel === BuilderRightPanelType.LAYER,
          className,
        })}
      >
        <FiLayers size={16} />
      </Tooltip.Trigger>
      <Tooltip.Content>Layers</Tooltip.Content>
    </Tooltip>
  );
};

export default StructureToggle;
