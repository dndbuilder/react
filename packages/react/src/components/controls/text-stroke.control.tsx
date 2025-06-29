"use client";
import { Label } from "@/components/shared/label";
import { Popover } from "@/components/shared/popover";
import { SettingsType } from "@/types";
import { FC, HTMLAttributes, ReactNode } from "react";
import { CiEdit } from "react-icons/ci";
import { ColorControl } from "./color.control";
import { SliderUnitControl } from "./slider-unit.control";

export type TextStrokeProps = {
  type: SettingsType;
  fieldName: string;
  mode?: string;
  label?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const TextStrokeControl: FC<TextStrokeProps> = ({ label, type, fieldName }) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-1.5">
      {label && <Label>{label}</Label>}

      <Popover>
        <Popover.Trigger
          asChild
          className="cursor-pointer rounded-sm border bg-slate-50 px-3 py-1.5 transition-colors duration-200 hover:bg-slate-300"
        >
          <div>
            <CiEdit />
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content align="end" alignOffset={-8} className="w-[260px]">
            <SliderUnitControl
              responsive
              type={type}
              label="Stroke Width"
              fieldName={`${fieldName}.width`}
              className="mt-0"
            />

            <ColorControl type={type} label="Stroke Color" fieldName={`${fieldName}.color`} />
            <Popover.Arrow width={20} height={9} fill="white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};
