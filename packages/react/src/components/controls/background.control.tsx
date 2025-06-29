"use client";

import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { ResponsiveValue } from "@/types/responsive";
import { BackgroundType, Unit } from "@/types/style";
import { FC, HTMLAttributes } from "react";
import { BsSquareHalf } from "react-icons/bs";
import { PiPaintBrushFill } from "react-icons/pi";
import { ColorControl } from "./color.control";
import { SelectControl } from "./select.control";
import { SliderUnitControl } from "./slider-unit.control";
import { ToggleGroupControl } from "./toggle-group.control";

export type BackgroundProps = {
  fieldName: string;
  mode?: string;
  type: SettingsType;
  showImage?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const BackgroundControl: FC<BackgroundProps> = ({
  mode,
  type,
  fieldName,
  showImage = true,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const { 0: position } = useSettings<string>(
    `${fieldName}.position.${currentBreakpoint}.${mode}`,
    type
  );

  const [backgroundType] = useSettings<BackgroundType>(
    mode ? `${fieldName}.type.${mode}` : fieldName,
    type
  );
  const [backgroundImage] = useSettings<ResponsiveValue>(
    mode ? `${fieldName}.image.${mode}` : `${fieldName}.image`,
    type
  );
  const [backgroundGradientType] = useSettings<string>(`${fieldName}.gradient.type`, type);
  return (
    <div>
      {/* Background Type */}
      <ToggleGroupControl
        fieldName={`${fieldName}.type`}
        label="Background Type"
        mode={mode}
        type={type}
        controls={[
          {
            tooltipContent: BackgroundType.CLASSIC,
            toggleTrigger: <PiPaintBrushFill className="text-sm" />,
            value: BackgroundType.CLASSIC,
          },
          {
            tooltipContent: BackgroundType.GRADIENT,
            toggleTrigger: <BsSquareHalf className="text-sm" />,
            value: BackgroundType.GRADIENT,
          },
        ]}
      />

      {backgroundType === BackgroundType.CLASSIC && (
        <>
          {/* Bg Color */}
          <ColorControl
            label="Background Color"
            type={type}
            fieldName={`${fieldName}.color`}
            mode={mode}
          />

          {/* Bg Image */}
          {/* {showImage && (
            <MediaControl
              type={type}
              fieldName={`${fieldName}.image`}
              label="Image"
              mode={mode}
            />
          )} */}

          {backgroundImage && (
            <>
              {/* Position */}
              <SelectControl
                type={type}
                fieldName={`${fieldName}.position`}
                responsive
                label="Position"
                mode={mode}
                options={[
                  { content: "Center Center", value: "center center" },
                  { content: "Center Left", value: "center left" },
                  { content: "Center Right", value: "center right" },
                  { content: "Top Center", value: "top center" },
                  { content: "Top Left", value: "top left" },
                  { content: "Top Right", value: "top right" },
                  { content: "Bottom Center", value: "bottom center" },
                  { content: "Bottom Left", value: "bottom left" },
                  { content: "Bottom Right", value: "bottom right" },
                  { content: "Custom", value: "custom" },
                ]}
              />

              {/* Position Custom */}
              {position === "custom" && (
                <>
                  <SliderUnitControl
                    type={type}
                    fieldName={`${fieldName}.positionX`}
                    label="Position X"
                    units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
                    mode={mode}
                    responsive
                  />
                  <SliderUnitControl
                    type={type}
                    fieldName={`${fieldName}.positionY`}
                    label="Position Y"
                    units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
                    mode={mode}
                    responsive
                  />
                </>
              )}

              {/* Attachment */}
              <SelectControl
                type={type}
                fieldName={`${fieldName}.attachment`}
                label="Attachment"
                options={[
                  { content: "Fixed", value: "fixed" },
                  { content: "Scroll", value: "scroll" },
                ]}
                mode={mode}
              />

              {/* Repeat */}
              <SelectControl
                type={type}
                fieldName={`${fieldName}.repeat`}
                label="Repeat"
                mode={mode}
                responsive
                options={[
                  { content: "No Repeat", value: "no-repeat" },
                  { content: "Repeat", value: "repeat" },
                  { content: "Repeat X", value: "repeat-x" },
                  { content: "Repeat Y", value: "repeat-y" },
                ]}
              />

              {/* Size */}
              <SelectControl
                responsive
                mode={mode}
                type={type}
                fieldName={`${fieldName}.size`}
                label="Size"
                options={[
                  { content: "Auto", value: "auto" },
                  { content: "Cover", value: "cover" },
                  { content: "Contain", value: "contain" },
                  { content: "Initial", value: "initial" },
                ]}
              />
            </>
          )}
        </>
      )}

      {backgroundType === BackgroundType.GRADIENT && (
        <>
          {/* Color 1 */}
          <ColorControl
            label="Color 1"
            type={type}
            fieldName={`${fieldName}.gradient.color1`}
            mode={mode}
          />

          {/* Location 1 */}
          <SliderUnitControl
            type={type}
            fieldName={`${fieldName}.gradient.location1`}
            label="Location 1"
            units={[Unit.PERCENTAGE]}
            mode={mode}
          />

          {/* Second Color */}
          <ColorControl
            label="Color 2"
            type={type}
            fieldName={`${fieldName}.gradient.color2`}
            mode={mode}
          />

          {/* Location 2 */}
          <SliderUnitControl
            type={type}
            fieldName={`${fieldName}.gradient.location2`}
            label="Location 2"
            units={[Unit.PERCENTAGE]}
            mode={mode}
          />

          {/* Type */}
          <SelectControl
            options={[
              { content: "Linear", value: "linear" },
              { content: "Radial", value: "radial" },
            ]}
            type={type}
            fieldName={`${fieldName}.gradient.type`}
            label="Type"
            mode={mode}
          />

          {backgroundGradientType === "linear" && (
            <SliderUnitControl
              type={type}
              fieldName={`${fieldName}.gradient.angle`}
              label="Angle"
              mode={mode}
              units={[Unit.DEG, Unit.GRAD, Unit.RAD, Unit.TURN]}
            />
          )}
          {backgroundGradientType === "radial" && (
            <SelectControl
              mode={mode}
              type={type}
              fieldName={`${fieldName}.gradient.position`}
              label="Position"
              options={[
                { content: "Center Center", value: "center center" },
                { content: "Center Left", value: "center left" },
                { content: "Center Right", value: "center right" },
                { content: "Top Center", value: "top center" },
                { content: "Top Left", value: "top left" },
                { content: "Top Right", value: "top right" },
                { content: "Bottom Center", value: "bottom center" },
                { content: "Bottom Left", value: "bottom left" },
                { content: "Bottom Right", value: "bottom right" },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
};
