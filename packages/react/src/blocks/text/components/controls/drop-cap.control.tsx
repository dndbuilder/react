"use client";

import { Label } from "@/components/shared/label";
import { Switch } from "@/components/shared/switch";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC } from "react";

interface DropCapProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropCap: FC<DropCapProps> = ({ className }) => {
  const [dropCap, setDropCap] = useSettings<boolean>("dropCap.desktop", SettingsType.BLOCK);
  return (
    <Label className={classNames("mt-4 flex items-center justify-between", className)}>
      Drop Cap
      <Switch checked={dropCap} onCheckedChange={setDropCap} />
    </Label>
  );
};

export default DropCap;
