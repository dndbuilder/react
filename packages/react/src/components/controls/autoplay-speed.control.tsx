"use client";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";

export type AutoPlaySpeedControlProps = {
  fieldName: string;
} & HTMLAttributes<HTMLDivElement>;

export const AutoplaySpeedControl: FC<AutoPlaySpeedControlProps> = ({ className, fieldName }) => {
  const [value, setValue] = useSettings<number>(fieldName, SettingsType.BLOCK);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  return (
    <div className={classNames("mt-5 flex items-center justify-between", className)}>
      <Label className="flex">Autoplay Speed</Label>
      <Input defaultValue={value} onChange={handleChange} type="number" className="w-[70px]" />
    </div>
  );
};
