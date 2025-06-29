"use client";
import { classNames } from "@/utils";
import React, { FC, HtmlHTMLAttributes } from "react";
import { ChromePicker, RGBColor } from "react-color";

export type ColorPickerProps = {
  color?: string;
  disableAlpha?: boolean;
  onChange?: (color: string) => void;
  className?: string;
};

function rgbaToHex({ r = 0, g = 0, b = 0, a = 1 }: RGBColor): string {
  // Ensure the values are within valid ranges
  const clamp = (value: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, value));
  const red = clamp(Math.round(r), 0, 255);
  const green = clamp(Math.round(g), 0, 255);
  const blue = clamp(Math.round(b), 0, 255);
  const alpha = clamp(a, 0, 1);

  // Convert to hex
  const toHex = (num: number): string => num.toString(16).padStart(2, "0");
  const hexColor = `#${toHex(red)}${toHex(green)}${toHex(blue)}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return hexColor;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  disableAlpha = false,
  className,
}) => {
  return (
    <div className={classNames("color-picker", className)}>
      <ChromePicker
        color={color}
        disableAlpha={disableAlpha}
        onChangeComplete={(e: any) => {
          if (e.source === "rgb") {
            onChange?.(rgbaToHex(e.rgb));
          } else {
            onChange?.(e.hex);
          }
        }}
      />
    </div>
  );
};
