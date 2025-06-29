"use client";

import { PresetsControl } from "@/components/controls/presets-control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderInputControl } from "@/components/controls/slider-input.control";
import { Accordion } from "@/components/shared/accordion";
import { Label } from "@/components/shared/label";
import { Separator } from "@/components/shared/separator";
import { SettingsType } from "@/types";
import design1 from "../img/design-1.png";
import design2 from "../img/design-2.png";
import { TestimonialPresets } from "../types";
import SliderOptionsControl from "./slider-options.control";
import Testimonials from "./testimonials";

const TestimonialContentControl = () => {
  return (
    <Accordion defaultValue={"General"} type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SelectControl
            type={SettingsType.BLOCK}
            fieldName="layout.desktop"
            label="Layout"
            options={[
              {
                content: "Grid",
                value: "grid",
              },
              { content: "Slider", value: "slider" },
            ]}
            className="mt-0"
          />

          <SliderInputControl
            responsive
            type={SettingsType.BLOCK}
            fieldName="columns"
            label="Columns"
            min={1}
            max={10}
          />
          {/* <SliderInputControl type={SettingsType.BLOCK} fieldName="rows.desktop" label="Rows" min={1} max={10} /> */}

          <Separator className="my-4" />

          {/* Testimonials */}
          <Label className="mb-2">Testimonials</Label>
          <Testimonials />
        </Accordion.Content>
      </Accordion.Item>

      {/* Presets */}
      <Accordion.Item value="Presets">
        <Accordion.Trigger className="p-4">Presets</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <PresetsControl
            designs={[
              {
                id: TestimonialPresets.Preset1,
                image: design1,
              },
              {
                id: TestimonialPresets.Preset2,
                image: design2,
              },
            ]}
          />
        </Accordion.Content>
      </Accordion.Item>

      <SliderOptionsControl />
    </Accordion>
  );
};

export default TestimonialContentControl;
