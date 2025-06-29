"use client";

import { BackgroundControl } from "@/components/controls/background.control";
import { ColorControl } from "@/components/controls/color.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { TextShadowControl } from "@/components/controls/text-shadow.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { PseudoClass, Unit } from "@/types/style";

const ButtonStyleControl = () => {
  const [borderStyle] = useSettings("border.style.desktop.default", SettingsType.BLOCK);

  return (
    <Accordion defaultValue="Button" type="single" collapsible>
      {/* Button */}
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Typography */}
          <TypographyControl fieldName="typography" className="mt-0" type={SettingsType.BLOCK} />

          {/* Text Shadow */}
          <TextShadowControl
            fieldName="textShadow.desktop"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
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
              {/* Text color */}
              <ColorControl
                fieldName="textColor"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Background */}
              <BackgroundControl
                fieldName="background"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
                showImage={false}
              />
            </Tabs.Content>
            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Hover Text color */}
              <ColorControl
                fieldName="textColor"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Background */}
              <BackgroundControl
                fieldName="background"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
                showImage={false}
              />

              {/* Transition Duration */}
              <SliderInputControl
                label="Transition Duration"
                fieldName="transitionDuration"
                type={SettingsType.BLOCK}
                min={0}
                max={10000}
              />
            </Tabs.Content>
          </Tabs>

          <Separator className="my-4" />

          {/* Border Type */}
          <SelectControl
            options={[
              { content: "None", value: "none" },
              { content: "Solid", value: "solid" },
              { content: "Double", value: "double" },
              { content: "Dotted", value: "dotted" },
              { content: "Groove", value: "groove" },
            ]}
            fieldName="border.style.desktop"
            label="Border Type"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />

          <>
            {borderStyle && borderStyle !== "none" && (
              <>
                <SpacingControl
                  fieldName="border.width"
                  label="Border Width"
                  responsive
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />
                <ColorControl
                  label="Border Color"
                  fieldName="border.color.desktop"
                  type={SettingsType.BLOCK}
                  mode={PseudoClass.DEFAULT}
                />
              </>
            )}
          </>

          {/* Border Radius */}
          <SpacingControl
            fieldName="border.radius"
            label="Border Radius"
            responsive
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />
          <Separator className="my-4" />

          <SpacingControl
            fieldName="padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.EM, Unit.REM]}
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ButtonStyleControl;
