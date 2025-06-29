"use client";

import { ColorControl } from "@/components/controls/color.control";
import { TextShadowControl } from "@/components/controls/text-shadow.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { SelectControl } from "@/components/controls/select.control";
import { TextStrokeControl } from "@/components/controls/text-stroke.control";
import { Accordion } from "@/components/shared/accordion";
import { PseudoClass, Unit } from "@/types/style";
import { SettingsType } from "@/types";
import { SpacingControl } from "@/components/controls/spacing.control";

const HeadingStyleControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      {/* General */}
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Margin */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="margin"
            label="Margin"
            responsive
            className="mt-0"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="padding"
            label="Padding"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE]}
          />

          {/* Text Color */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="textColor"
            mode={PseudoClass.DEFAULT}
          />
          {/* Background Color */}
          <ColorControl
            label="Background Color"
            type={SettingsType.BLOCK}
            fieldName="backgroundColor"
            mode={PseudoClass.DEFAULT}
          />

          {/* Typography */}
          <TypographyControl fieldName="typography" type={SettingsType.BLOCK} />

          {/* Text Stroke */}
          <TextStrokeControl type={SettingsType.BLOCK} fieldName="textStroke" label="Text Stroke" />

          {/* Text Shadow */}
          <TextShadowControl type={SettingsType.BLOCK} />

          {/* Blend Mode */}
          <SelectControl
            options={[
              { content: "Normal", value: "normal" },
              { content: "Screen", value: "screen" },
              { content: "Overlay", value: "overlay" },
              { content: "Darken", value: "darken" },
              { content: "Lighten", value: "lighten" },
              { content: "Color Dodge", value: "color-dodge" },
              { content: "Saturation", value: "saturation" },
              { content: "Color", value: "color" },
              { content: "Difference", value: "difference" },
              { content: "Exclusion", value: "exclusion" },
              { content: "Hue", value: "hue" },
              { content: "Luminosity", value: "luminosity" },
            ]}
            type={SettingsType.BLOCK}
            fieldName="blendMode.desktop"
            label="Blend Mode"
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default HeadingStyleControl;
