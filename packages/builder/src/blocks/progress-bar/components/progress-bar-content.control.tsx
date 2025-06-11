"use client";

import { InputControl } from "@/components/controls/input.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { SwitchControl } from "@/components/controls/switch.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";

const ProgressBarContentControl = () => {
  return (
    <Accordion defaultValue="Title" type="single" collapsible>
      <Accordion.Item value="Title">
        <Accordion.Trigger className="p-4">Title</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <InputControl
            fieldName="title.content"
            label="Title"
            type={SettingsType.BLOCK}
            className="mb-4"
            isLocalized
          />

          <SwitchControl
            fieldName="title.show"
            label="Show Title"
            type={SettingsType.BLOCK}
            className="mb-4"
            responsive
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Progress Bar">
        <Accordion.Trigger className="p-4">Progress Bar</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderInputControl
            fieldName="percentage.value"
            label="Percentage"
            type={SettingsType.BLOCK}
            className="mb-4"
            max={100}
            min={0}
          />

          <SwitchControl
            fieldName="percentage.show"
            label="Show Percentage"
            type={SettingsType.BLOCK}
            className="mb-4"
            responsive
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProgressBarContentControl;
