"use client";

import { ColorPicker } from "@/components/shared/color-picker";
import { Label } from "@/components/shared/label";
import { Popover } from "@/components/shared/popover";
import { Tooltip } from "@/components/shared/tooltip";
import { useSettings } from "@/hooks/use-settings";
import { getActiveThemeColorPresets, getActiveThemeSettings } from "@/store/selectors";
import { SettingsType } from "@/types";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, ReactNode } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsFillSquareFill } from "react-icons/bs";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { ResetControl } from "./reset.control";

export type ColorControlProps = {
  mode?: string;
  type: SettingsType;
  fieldName: string;
  label?: ReactNode;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  avoidCollisions?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const ColorControl: FC<ColorControlProps> = ({
  type,
  className,
  label = "Color",
  mode,
  fieldName,
  side = "bottom",
  align = "end",
  avoidCollisions = true,
}) => {
  const [color, setColor] = useSettings<string | undefined>(
    mode ? `${fieldName}.${mode}` : `${fieldName}`,
    type
  );

  const getColor = (color: string) => {
    const isVar = Boolean(color.startsWith("var"));
    if (color && isVar) {
      const el = document.querySelector("iframe")!.contentWindow!.document.documentElement;
      const c = window
        .getComputedStyle(el)
        .getPropertyValue(color.replace("var(", "").replace(")", ""));
      return c;
    }
    return color;
  };

  const colorPresets = useAppSelector(getActiveThemeColorPresets);
  const themeSettings = useAppSelector(getActiveThemeSettings);

  const getSquareColor = (c: string) => {
    if (getColor(color ?? "") === getColor(c)) {
      return <FaCheckSquare className="h-5 w-5 rounded border" style={{ color: getColor(c) }} />;
    }
    return <FaSquare className="h-5 w-5 rounded border" style={{ color: getColor(c) }} />;
  };

  const accentShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const onOpenChange = (open: boolean) => {
    const panelScrollContent = document.querySelector<HTMLDivElement>(".panel-scroll-content");
    if (!panelScrollContent) return;
    if (open) {
      panelScrollContent.style.paddingBottom = "100vh";
    } else {
      panelScrollContent.style.paddingBottom = "0px";
    }
  };

  return (
    <div className={classNames("mt-4 flex items-center justify-between gap-1.5", className)}>
      {label && <Label>{label}</Label>}

      <div className="flex rounded-sm border">
        {/* Global Colors */}
        <Popover onOpenChange={(open: boolean) => onOpenChange(open)}>
          <Tooltip>
            <Tooltip.Trigger>
              <Popover.Trigger asChild>
                <div className="cursor-pointer border-r px-[10px] py-2">
                  <AiOutlineGlobal className="text-sm" />
                </div>
              </Popover.Trigger>
            </Tooltip.Trigger>
            <Tooltip.Content>Custom</Tooltip.Content>
          </Tooltip>

          <Popover.Content
            className="w-[260px] p-0"
            side={side}
            align={align}
            avoidCollisions={avoidCollisions}
          >
            <p className="border-b px-5 py-3">Global Colors</p>

            {/* Text */}
            <Popover.Close className="w-full">
              <div
                className="cursor-pointer px-5 py-3 hover:bg-slate-100"
                onClick={() => setColor(`var(--text-color)`)}
              >
                <div className="flex items-center">
                  {getSquareColor(themeSettings.color.textColor)}
                  <p className="ms-3 text-xs text-slate-500">Text</p>
                  <p className="ms-auto text-xs text-slate-500">{themeSettings.color.textColor}</p>
                </div>
              </div>
            </Popover.Close>

            {/* Background */}
            <Popover.Close className="w-full">
              <div
                className="cursor-pointer px-5 py-3 hover:bg-slate-100"
                onClick={() => setColor(`var(--background-color)`)}
              >
                <div className="flex items-center">
                  {getSquareColor(themeSettings.color.backgroundColor)}

                  <p className="ms-3 text-xs text-slate-500">Background</p>
                  <p className="ms-auto text-xs text-slate-500">
                    {themeSettings.color.backgroundColor}
                  </p>
                </div>
              </div>
            </Popover.Close>

            {/* Accent */}
            <Popover.Close className="w-full">
              <div
                className="cursor-pointer px-5 py-3 hover:bg-slate-100"
                onClick={() => setColor(`var(--accent-color)`)}
              >
                <div className="flex items-center">
                  {getSquareColor(themeSettings.color.accentColor)}

                  <p className="ms-3 text-xs text-slate-500">Accent</p>
                  <p className="ms-auto text-xs text-slate-500">
                    {themeSettings.color.accentColor}
                  </p>
                </div>
              </div>
            </Popover.Close>

            {/* Accent Shades */}
            {accentShades.map((shade, i) => (
              <Popover.Close className="w-full" key={i}>
                <div
                  className="cursor-pointer px-5 py-3 hover:bg-slate-100"
                  onClick={() => setColor(`var(--accent-color-${shade})`)}
                >
                  <div className="flex items-center">
                    {getSquareColor(`var(--accent-color-${shade})`)}

                    <p className="ms-3 text-xs text-slate-500">Accent {shade}</p>
                    <p className="ms-auto text-xs text-slate-500">
                      {getColor(`var(--accent-color-${shade})`)}
                    </p>
                  </div>
                </div>
              </Popover.Close>
            ))}

            {colorPresets?.map((preset, index) => (
              <Popover.Close className="w-full" key={index}>
                <div
                  className="cursor-pointer px-5 py-3 hover:bg-slate-100"
                  onClick={() => setColor(`var(--color-preset-${preset.id})`)}
                >
                  <div className="flex items-center">
                    {getSquareColor(preset.value)}
                    <p className="ms-3 text-xs text-slate-500">{preset.name}</p>
                    <p className="ms-auto text-xs text-slate-500">{preset.value}</p>
                  </div>
                </div>
              </Popover.Close>
            ))}

            <Popover.Arrow width={16} height={8} fill="white" />
          </Popover.Content>
        </Popover>

        {/* Custom */}
        <Popover>
          <Popover.Trigger asChild>
            <div
              className={classNames("relative cursor-pointer px-[10px] py-2", {
                "bg-slate-50 after:absolute after:left-[50%] after:top-[50%] after:h-px after:w-8 after:translate-x-[-50%] after:translate-y-[-50%] after:-rotate-45 after:bg-red-500 after:content-['']":
                  !color,
              })}
            >
              <BsFillSquareFill
                style={{
                  // color: color ?? '#bbb',
                  color: getColor(color ?? "#bbb"),
                  background: `url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>')`,
                  backgroundSize: "0.5em",
                  borderRadius: "0.15em",
                }}
                className="text-sm"
              />
            </div>
          </Popover.Trigger>

          <Popover.Content className="w-[270px] p-0" side={side} align={align}>
            <p className="flex items-center px-4 py-3 shadow-md">
              Color Picker <ResetControl fieldName={fieldName} settingsType={type} />
            </p>
            <div className="p-4">
              <ColorPicker color={color} onChange={setColor} />
            </div>

            <Popover.Arrow width={16} height={8} fill="white" />
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};
