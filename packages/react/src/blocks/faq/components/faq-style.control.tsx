"use client";

import { BorderControl } from "@/components/controls/border.control";
import { ColorControl } from "@/components/controls/color.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { Unit } from "@/types/style";

const FaqStyleControl = () => {
  return (
    <Accordion defaultValue={"Item"} type="single" collapsible>
      {/* Item */}
      <Accordion.Item value="Item">
        <Accordion.Trigger className="p-4">Item</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Item Gap */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="item.gap"
            label="Item Gap"
            className="mt-0"
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />

          {/* Border */}
          <BorderControl type={SettingsType.BLOCK} fieldName="item.border" className="mt-4" />

          {/* Padding */}
          <SpacingControl
            type={SettingsType.BLOCK}
            fieldName="item.padding"
            label="Padding"
            responsive
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Title */}
      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Color */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="title.color.default"
            label="Color"
            className="mt-0"
          />

          {/* Typography */}
          <TypographyControl
            type={SettingsType.BLOCK}
            fieldName="title.typography"
            label="Typography"
          />

          {/* Spacing */}
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="title.spacing"
            label="Spacing"
            responsive
            units={[Unit.PX, Unit.REM, Unit.EM]}
          />
        </Accordion.Content>
      </Accordion.Item>

      {/* Description */}
      <Accordion.Item value="Description">
        <Accordion.Trigger className="p-4">Description</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Color */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="description.color.default"
            label="Color"
            className="mt-0"
          />

          {/* Typography */}
          <TypographyControl
            type={SettingsType.BLOCK}
            fieldName="description.typography"
            label="Typography"
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default FaqStyleControl;
