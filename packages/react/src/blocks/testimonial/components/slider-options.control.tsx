import { AutoplaySpeedControl } from "@/components/controls/autoplay-speed.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SwitchControl } from "@/components/controls/switch.control";
import { Accordion } from "@/components/shared/accordion";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { Unit } from "@/types/style";

const SliderOptionsControl = () => {
  const [layout] = useSettings<string>("layout.desktop", SettingsType.BLOCK);

  const [autoPlay] = useSettings<boolean>("slider.autoPlay.desktop", SettingsType.BLOCK);

  if (layout !== "slider") {
    return null;
  }
  return (
    <Accordion.Item value="Options">
      <Accordion.Trigger className="p-4">Slider Options</Accordion.Trigger>
      <Accordion.Content className="px-4">
        <SliderUnitControl
          type={SettingsType.BLOCK}
          fieldName="slider.height"
          label="Height"
          responsive
          units={[Unit.PX, Unit.PERCENTAGE, Unit.REM, Unit.EM]}
          className="mt-0"
        />

        <SwitchControl type={SettingsType.BLOCK} fieldName="slider.showDots.desktop" label="Dots" />
        <SwitchControl
          type={SettingsType.BLOCK}
          fieldName="slider.showArrows.desktop"
          label="Arrows"
        />
        <SwitchControl
          type={SettingsType.BLOCK}
          fieldName="slider.autoPlay.desktop"
          label="AutoPlay"
        />
        <SwitchControl
          type={SettingsType.BLOCK}
          fieldName="slider.pauseOnHover.desktop"
          label="Pause on Hover"
        />
        <SwitchControl
          type={SettingsType.BLOCK}
          fieldName="slider.infinite.desktop"
          label="Infinite Loop"
        />

        {autoPlay && <AutoplaySpeedControl fieldName="slider.autoplaySpeed" />}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default SliderOptionsControl;
