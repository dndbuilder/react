"use client";

import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SwitchControl } from "@/components/controls/switch.control";
import { Accordion } from "@/components/shared/accordion";
import { AutoplaySpeedControl } from "@/components/controls/autoplay-speed.control";
import { SettingsType } from "@/types";
import { Unit } from "@/types/style";

import SlidesControl from "./slides.control";
import { useSettings } from "@/hooks/use-settings";
// import SliderPresetsControl from './slider-presets-control';

const SliderContentControl = () => {
  const [autoPlay] = useSettings<boolean>("autoPlay.desktop", SettingsType.BLOCK);

  return (
    <Accordion defaultValue="Carousel" type="single" collapsible>
      <Accordion.Item value="Carousel">
        <Accordion.Trigger className="p-4">Slides</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SlidesControl />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Options">
        <Accordion.Trigger className="p-4">Slider Options</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderUnitControl
            type={SettingsType.BLOCK}
            fieldName="height"
            label="Height"
            responsive
            units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM]}
            className="mt-0"
          />
          <SwitchControl type={SettingsType.BLOCK} fieldName="showDots.desktop" label="Dots" />
          <SwitchControl type={SettingsType.BLOCK} fieldName="showArrows.desktop" label="Arrows" />
          <SwitchControl type={SettingsType.BLOCK} fieldName="autoPlay.desktop" label="AutoPlay" />
          <SwitchControl
            type={SettingsType.BLOCK}
            fieldName="pauseOnHover.desktop"
            label="Pause on Hover"
          />
          <SwitchControl
            type={SettingsType.BLOCK}
            fieldName="infinite.desktop"
            label="Infinite Loop"
          />

          {autoPlay && <AutoplaySpeedControl fieldName="autoplaySpeed.desktop" />}
        </Accordion.Content>
      </Accordion.Item>

      {/* <Accordion.Item value="Presets">
        <Accordion.Trigger className="p-4">Presets</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SliderPresetsControl className="mt-0" />
        </Accordion.Content>
      </Accordion.Item> */}
    </Accordion>
  );
};

export default SliderContentControl;
