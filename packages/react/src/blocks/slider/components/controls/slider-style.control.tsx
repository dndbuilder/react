"use client";

import { BackgroundControl } from "@/components/controls/background.control";
import { ColorControl } from "@/components/controls/color.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { SettingsType } from "@/types";
import { PseudoClass, SizeType, Unit } from "@/types/style";
import SlideHorizontalPosition from "./slide-horizontal-position.control";
import SlideTextAlignControl from "./slide-text-align.control";
import SlideVerticalPosition from "./slide-vertical-position.control";
import { useSettings } from "@/hooks/use-settings";
import { Separator } from "@/components/shared/separator";

const SliderStyleControl = () => {
  const [showDots] = useSettings<boolean>("showDots.desktop", SettingsType.BLOCK);
  const [showArrows] = useSettings<boolean>("showArrows.desktop", SettingsType.BLOCK);

  return (
    <Accordion defaultValue="Slides" type="single" collapsible>
      <Accordion.Item value="Slides">
        <Accordion.Trigger className="p-4">Slides</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="contentWidth"
            label="Content Width"
            className="mt-0"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM]}
            responsive
          />

          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="sliderPadding"
            label="Padding"
            units={[Unit.PX, Unit.REM, Unit.EM]}
            responsive
          />
          <SlideHorizontalPosition
            type={SettingsType.BLOCK}
            fieldName="horizontalPosition.desktop"
          />
          <SlideVerticalPosition type={SettingsType.BLOCK} fieldName="verticalPosition.desktop" />
          <SlideTextAlignControl type={SettingsType.BLOCK} fieldName="textAlign.desktop" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="title.marginBottom"
            label="Margin Bottom"
            className="mt-0"
            responsive
          />
          <ColorControl type={SettingsType.BLOCK} fieldName="title.color.desktop.default" />
          <TypographyControl type={SettingsType.BLOCK} fieldName="title.typography" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="Description">
        <Accordion.Trigger className="p-4">Description</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="description.marginBottom"
            label="Margin Bottom"
            className="mt-0"
            responsive
          />
          <ColorControl type={SettingsType.BLOCK} fieldName="description.color.desktop.default" />
          <TypographyControl type={SettingsType.BLOCK} fieldName="description.typography" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SelectControl
            responsive
            options={[
              // { content: "Default", value: SizeType.DEFAULT },
              { content: "Small", value: SizeType.SM },
              { content: "Medium", value: SizeType.MD },
              { content: "Large", value: SizeType.LG },
              { content: "XL", value: SizeType.XL },
              { content: "XXL", value: SizeType.XXL },
            ]}
            type={SettingsType.BLOCK}
            fieldName="button.size"
            label="Size"
            className="mt-0"
          />

          <TypographyControl type={SettingsType.BLOCK} fieldName="button.typography" />
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="button.border.width"
            label="Border Width"
          />

          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="button.border.radius"
            label="Border Radius"
          />

          {/* Normal and Hover Tab */}
          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-5">
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
              {/* Text color */}
              <ColorControl
                label="Text Color"
                type={SettingsType.BLOCK}
                fieldName="button.textColor"
                mode={PseudoClass.DEFAULT}
              />

              <BackgroundControl
                fieldName="button.background"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
                showImage={false}
              />
              <ColorControl
                label="Border Color"
                type={SettingsType.BLOCK}
                fieldName="button.border.color"
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Text color */}
              <ColorControl
                label="Text Color"
                type={SettingsType.BLOCK}
                fieldName="button.textColor"
                mode={PseudoClass.HOVER}
              />

              <BackgroundControl
                fieldName="button.background"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />
              <ColorControl
                label="Border Color"
                type={SettingsType.BLOCK}
                fieldName="button.border.color"
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      {showArrows && (
        <Accordion.Item value="Arrows">
          <Accordion.Trigger className="p-4">Arrows</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Placement */}
            <SelectControl
              type={SettingsType.BLOCK}
              fieldName="navigation.arrowPlacement.desktop"
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
              fieldName="navigation.arrowSize.desktop"
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
                  fieldName="navigation.arrowColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />

                {/* Background Color */}
                <ColorControl
                  label="Background Color"
                  fieldName="navigation.arrowBackgroudColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />

                {/* Box Shadow */}
                <BoxShadowControl
                  fieldName="navigation.arrowBoxShadow"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />
              </Tabs.Content>
              <Tabs.Content value={PseudoClass.HOVER}>
                {/* Color */}
                <ColorControl
                  label="Color"
                  fieldName="navigation.arrowColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.HOVER}
                />

                {/* Background Color */}
                <ColorControl
                  label="Background Color"
                  fieldName="navigation.arrowBackgroudColor.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.HOVER}
                />

                {/* Box Shadow */}
                <BoxShadowControl
                  fieldName="navigation.arrowBoxShadow"
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
              fieldName="navigation.arrowWidth"
              label="Width"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Height */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.arrowHeight"
              label="Height"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Border Radius */}
            <SpacingControl
              fieldName="navigation.arrowRadius.desktop.default"
              label="Border Radius"
              type={SettingsType.BLOCK}
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Left Arrow Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.leftArrowPosition"
              label="Left Arrow Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Right Arrow Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.rightArrowPosition"
              label="Right Arrow Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />
          </Accordion.Content>
        </Accordion.Item>
      )}

      {showDots && (
        <Accordion.Item value="Dots">
          <Accordion.Trigger className="p-4">Dots</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Placement */}
            <SelectControl
              type={SettingsType.BLOCK}
              fieldName="navigation.dotPlacement.desktop"
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
              fieldName="navigation.dotSize"
              label="Size"
            />

            {/* Color */}
            <ColorControl
              label="Color"
              type={SettingsType.BLOCK}
              fieldName="navigation.dotColor.desktop.default"
            />

            {/* Active Color */}
            <ColorControl
              label="Active Color"
              type={SettingsType.BLOCK}
              fieldName="navigation.dotActiveColor.desktop.default"
            />

            {/* Dots Position */}
            <SpacingControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.dotsPosition"
              label="Dots Position"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Width */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.dotWidth"
              label="Width"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Height */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.dotHeight"
              label="Height"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Active Width */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.activeDotWidth"
              label="Active Width"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Active Height */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.activeDotHeight"
              label="Active Height"
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            {/* Rounded */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.dotRadius"
              label="Rounded"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />

            {/* Gap */}
            <SliderUnitControl
              responsive
              type={SettingsType.BLOCK}
              fieldName="navigation.dotGap"
              label="Gap"
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.PERCENTAGE]}
            />
          </Accordion.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default SliderStyleControl;
