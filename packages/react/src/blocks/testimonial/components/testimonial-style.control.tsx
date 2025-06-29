"use client";

import { BorderControl } from "@/components/controls/border.control";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

const TestimonialStyleControl = () => {
  const [layout] = useSettings<"grid" | "slider">("layout.desktop", SettingsType.BLOCK);
  const [showDots] = useSettings<boolean>("slider.showDots.desktop", SettingsType.BLOCK);
  const [showArrows] = useSettings<boolean>("slider.showArrows.desktop", SettingsType.BLOCK);
  return (
    <Accordion defaultValue={"Content"} type="single" collapsible>
      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Content</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Column Gap */}
          <SliderUnitControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="columnGap"
            label="Column Gap"
            className="mt-0"
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />
          {/* Row Gap */}
          {layout === "grid" && (
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="rowGap"
              label="Row Gap"
              units={[Unit.PX, Unit.REM, Unit.EM]}
            />
          )}

          <ColorControl type={SettingsType.BLOCK} fieldName="review.color.default" label="Color" />
          <TypographyControl type={SettingsType.BLOCK} fieldName="review.typography" />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Card">
        <Accordion.Trigger className="p-4">Card</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* <Alignment /> */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"card.alignment.desktop"}
            label={"Alignment"}
            className="mt-0"
            controls={[
              {
                tooltipContent: "Left",
                toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
                value: "left",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "right",
              },
            ]}
          />

          {/* Background */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="card.backgroundColor.desktop.default"
            label="Background"
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="card.padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />

          <Separator className="my-4" />

          {/* Border */}
          <Tabs defaultValue={PseudoClass.DEFAULT}>
            <Tabs.List className="h-8 w-full rounded-full">
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.DEFAULT}
              >
                {"Normal"}
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.HOVER}
              >
                {"Hover"}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={PseudoClass.DEFAULT}>
              <BorderControl
                fieldName="card.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="card.boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              <BorderControl
                fieldName="card.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Box Shadow */}
              <BoxShadowControl
                fieldName="card.boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Transition Duration */}
              <SliderInputControl
                label="Transition Duration"
                type={SettingsType.BLOCK}
                fieldName="card.border.transitionDuration"
                min={0}
                max={10000}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Image">
        <Accordion.Trigger className="p-4">Image</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="image.size"
            label="Size"
            units={[Unit.PX, Unit.REM, Unit.EM]}
            className="mt-0"
          />
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="image.gap"
            label="Gap"
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Name">
        <Accordion.Trigger className="p-4">Name</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="review.color.default"
            label="Color"
            className="mt-0"
          />
          <TypographyControl type={SettingsType.BLOCK} fieldName="review.typography" />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="review.color.default"
            label="Color"
            className="mt-0"
          />
          <TypographyControl type={SettingsType.BLOCK} fieldName="review.typography" />
        </Accordion.Content>
      </Accordion.Item>

      {layout === "slider" && showArrows && (
        <Accordion.Item value="Arrows">
          <Accordion.Trigger className="p-4">Arrows</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Placement */}
            <SelectControl
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.arrowPlacement.desktop"
              label="Placement"
              defaultValue={"inside"}
              options={[
                { content: "Inside", value: "inside" },
                { content: "Outside", value: "outside" },
              ]}
              className="mt-0"
            />

            <SliderUnitControl
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.arrowSize.desktop"
              label="Size"
            />

            <Tabs defaultValue={PseudoClass.DEFAULT}>
              <Tabs.List className="mb-2 mt-5 h-8 w-full rounded-full">
                <Tabs.Trigger
                  className="flex-1 rounded-full p-[3px] text-[13px]"
                  value={PseudoClass.DEFAULT}
                >
                  {"Normal"}
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="flex-1 rounded-full p-[3px] text-[13px]"
                  value={PseudoClass.HOVER}
                >
                  {"Hover"}
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value={PseudoClass.DEFAULT}>
                {/* Color */}
                <ColorControl
                  label="Color"
                  fieldName="slider.navigation.arrowColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />

                {/* Background Color */}
                <ColorControl
                  label="Background Color"
                  fieldName="slider.navigation.arrowBackgroudColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />

                {/* Box Shadow */}
                <BoxShadowControl
                  fieldName="slider.navigation.arrowBoxShadow"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />
              </Tabs.Content>
              <Tabs.Content value={PseudoClass.HOVER}>
                {/* Color */}
                <ColorControl
                  label="Color"
                  fieldName="slider.navigation.arrowColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.HOVER}
                />

                {/* Background Color */}
                <ColorControl
                  label="Background Color"
                  fieldName="slider.navigation.arrowBackgroudColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.HOVER}
                />

                {/* Box Shadow */}
                <BoxShadowControl
                  fieldName="slider.navigation.arrowBoxShadow"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.HOVER}
                />
              </Tabs.Content>
            </Tabs>

            <Separator className="my-5" />

            {/* Width */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.arrowWidth"
              label="Width"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Height */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.arrowHeight"
              label="Height"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Border Radius */}
            <SpacingControl
              fieldName="slider.navigation.arrowRadius.desktop.default"
              label="Border Radius"
              type={SettingsType.BLOCK}
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Left Arrow Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.leftArrowPosition"
              label="Left Arrow Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Right Arrow Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.rightArrowPosition"
              label="Right Arrow Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />
          </Accordion.Content>
        </Accordion.Item>
      )}

      {layout === "slider" && showDots && (
        <Accordion.Item value="Dots">
          <Accordion.Trigger className="p-4">Dots</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Placement */}
            <SelectControl
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotPlacement.desktop"
              label="Placement"
              defaultValue={"inside"}
              options={[
                { content: "Inside", value: "inside" },
                { content: "Outside", value: "outside" },
              ]}
              className="mt-0"
            />

            {/* Size */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotSize"
              label="Size"
            />

            {/* Color */}
            <ColorControl
              label="Color"
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotColor.desktop.default"
            />

            {/* Active Color */}
            <ColorControl
              label="Active Color"
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotActiveColor.desktop.default"
            />

            {/* Dots Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotsPosition"
              label="Dots Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Width */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotWidth"
              label="Width"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Height */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotHeight"
              label="Height"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Rounded */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotRadius"
              label="Rounded"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Gap */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="slider.navigation.dotGap"
              label="Gap"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />
          </Accordion.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default TestimonialStyleControl;
