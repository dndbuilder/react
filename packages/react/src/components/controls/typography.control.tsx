"use client";

import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { TypographyType, Unit } from "@/types/style";
import { generateUnitValue } from "@/utils/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, useRef } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Label } from "../shared/label";
import { Popover } from "../shared/popover";
import { ScrollArea } from "../shared/scroll-area";
import { Tooltip } from "../shared/tooltip";
import { SelectControl } from "./select.control";
import { SliderUnitControl } from "./slider-unit.control";
import { handlePopoverScroll } from "@/utils/popover";
import { FontFamilyControl } from "./font-family.control";

export type TypographyProps = {
  mode?: string;
  type: SettingsType;
  fieldName: string;
  label?: string;
  showPresets?: boolean;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  avoidCollisions?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const TypographyControl: FC<TypographyProps> = ({
  mode,
  type,
  fieldName: name,
  label = "Typography",
  className,
  showPresets = true,
  side = "bottom",
  align = "end",
  avoidCollisions = false,
}) => {
  const fieldName = mode ? `${name}.${mode}` : name;

  const [typography, setTypography] = useSettings<TypographyType | undefined>(fieldName, type);
  const [presets] = useSettings<Array<{ id: string; name: string; value: TypographyType }>>(
    "typography.presets",
    SettingsType.THEME
  );
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const rootRef = useRef<HTMLDivElement>(null);

  const onOpenChange = (open: boolean) => {
    handlePopoverScroll(open, rootRef.current);
  };

  return (
    <div className={classNames("mt-4 flex items-center", className)} ref={rootRef}>
      {label && <Label className="flex-grow">{label}</Label>}

      {showPresets && (
        // Custom Fonts

        <Popover onOpenChange={(open: boolean) => onOpenChange(open)}>
          <Tooltip>
            <Tooltip.Trigger>
              <Popover.Trigger asChild>
                <div className="cursor-pointer rounded-l border border-r-0 px-[10px] py-2">
                  <AiOutlineGlobal className="text-sm" />
                </div>
              </Popover.Trigger>
            </Tooltip.Trigger>
            <Tooltip.Content>Custom</Tooltip.Content>
          </Tooltip>
          <Popover.Content
            className="w-[260px] p-0"
            avoidCollisions={avoidCollisions}
            side={side}
            align={align}
            alignOffset={-35}
          >
            <p className="border-b px-5 py-3">Custom Fonts</p>
            <ScrollArea className="h-[400px]">
              {presets?.map((preset) => (
                <div
                  onClick={() => {
                    setTypography({
                      presetId: preset.id,
                    });
                  }}
                  key={preset.id}
                  className="flex cursor-pointer items-center p-3 hover:bg-slate-50"
                >
                  <BsCheck2
                    className={classNames(
                      "me-2 h-4 w-4",
                      typography?.presetId === preset.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <p
                    style={{
                      fontFamily: preset.value?.fontFamily?.desktop,
                      fontSize: generateUnitValue(preset.value?.fontSize?.[currentBreakpoint]),
                      fontWeight: preset.value?.fontWeight?.[currentBreakpoint],
                      textTransform: preset.value?.textTransform?.[currentBreakpoint],
                      fontStyle: preset.value?.fontStyle?.[currentBreakpoint],
                      textDecoration: preset.value?.textDecoration?.[currentBreakpoint],
                      lineHeight: generateUnitValue(preset.value?.lineHeight?.[currentBreakpoint]),
                      letterSpacing: generateUnitValue(
                        preset.value?.letterSpacing?.[currentBreakpoint]
                      ),
                      wordSpacing: generateUnitValue(
                        preset.value?.wordSpacing?.[currentBreakpoint]
                      ),
                    }}
                  >
                    {preset.name}
                  </p>
                </div>
              ))}
            </ScrollArea>
            <Popover.Arrow width={16} height={8} fill="white" />
          </Popover.Content>
        </Popover>
      )}

      {/* Typography */}
      <Popover onOpenChange={(open: boolean) => onOpenChange(open)}>
        <Popover.Trigger asChild>
          <div className="cursor-pointer rounded-r border px-[10px] py-2">
            <CiEdit />
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="w-[260px] p-0"
          avoidCollisions={avoidCollisions}
          side={side}
          align={align}
        >
          <h3 className="border-b px-5 py-3">Typography</h3>
          <ScrollArea className="h-[400px] px-5">
            {/* Font Family */}
            <FontFamilyControl
              responsive
              type={type}
              fieldName={`${fieldName}.fontFamily`}
              label="Font Family"
            />

            {/* Size */}
            <SliderUnitControl
              responsive
              type={type}
              label="Size"
              fieldName={`${fieldName}.fontSize`}
              units={[Unit.PX, Unit.REM, Unit.EM]}
            />

            {/* Weight */}
            <SelectControl
              responsive
              fieldName={`${fieldName}.fontWeight`}
              type={type}
              label="Weight"
              options={[
                { content: "100 (Thin)", value: "100" },
                { content: "200 (Extra Light)", value: "200" },
                { content: "300 (Light)", value: "300" },
                { content: "400 (Normal)", value: "400" },
                { content: "500 (Medium)", value: "500" },
                { content: "600 (Semi Bold)", value: "600" },
                { content: "700 (Bold)", value: "700" },
                { content: "800 (Extra Bold)", value: "800" },
                { content: "900 (Black)", value: "900" },
                { content: "Normal", value: "normal" },
                { content: "Bold", value: "bold" },
              ]}
              className="mt-4"
            />

            {/* Transform */}
            <SelectControl
              responsive
              type={type}
              fieldName={`${fieldName}.textTransform`}
              label="Transform"
              options={[
                { content: "Uppercase", value: "uppercase" },
                { content: "Lowercase", value: "lowercase" },
                { content: "Capitalize", value: "capitalize" },
                { content: "Normal", value: "none" },
              ]}
            />

            {/* Style */}
            <SelectControl
              responsive
              type={type}
              fieldName={`${fieldName}.fontStyle`}
              label="Style"
              options={[
                { content: "Normal", value: "normal" },
                { content: "Italic", value: "italic" },
                { content: "Oblique", value: "oblique" },
              ]}
            />

            {/* Decoration */}
            <SelectControl
              responsive
              type={type}
              fieldName={`${fieldName}.textDecoration`}
              label="Decoration"
              options={[
                { content: "Underline", value: "underline" },
                { content: "Overline", value: "overline" },
                { content: "Line Through", value: "line-through" },
                { content: "None", value: "none" },
              ]}
            />

            {/* Line-Height */}
            <SliderUnitControl
              responsive
              type={type}
              label="Line Height"
              fieldName={`${fieldName}.lineHeight`}
              units={[Unit.PX, Unit.REM, Unit.EM]}
            />

            {/* Letter Spacing */}
            <SliderUnitControl
              responsive
              type={type}
              label="Letter Spacing"
              fieldName={`${fieldName}.letterSpacing`}
              units={[Unit.PX, Unit.REM, Unit.EM]}
            />

            {/* Word Spacing */}
            <SliderUnitControl
              responsive
              type={type}
              label="Word Spacing"
              fieldName={`${fieldName}.wordSpacing`}
              units={[Unit.PX, Unit.REM, Unit.EM]}
            />
          </ScrollArea>
          <Popover.Arrow width={16} height={8} fill="white" />
        </Popover.Content>
      </Popover>
    </div>
  );
};
