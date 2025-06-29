"use client";
import { ComponentPropsWithoutRef, FC } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { CiUndo } from "react-icons/ci";
import { Tooltip } from "@/components/shared/tooltip";
import { classNames } from "@/utils";
import { useSettings } from "../../hooks/use-settings";
import { SettingsType } from "../../types";

export interface ResetControlProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
  fieldName: string;
  settingsType: SettingsType;
}

export const ResetControl: FC<ResetControlProps> = ({
  className,
  type,
  settingsType,
  fieldName,
  ...props
}) => {
  const [, setValue] = useSettings(fieldName, settingsType);
  return (
    <Tooltip>
      <Tooltip.Trigger className={classNames(className)} {...props}>
        <div onClick={() => setValue(undefined)} className="cursor-pointer px-1.5">
          <CiUndo />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>Back to default</Tooltip.Content>
    </Tooltip>
  );
};
