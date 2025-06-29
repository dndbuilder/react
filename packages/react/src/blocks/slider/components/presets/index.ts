import { FC } from "react";
import { SliderPresets, SliderSettingsProps } from "../../types";
import PresetOne from "./preset-one";
// import PresetTwo from './preset-2';

type Preset = {
  Component: FC<SliderSettingsProps>;
};

export const presets: Record<SliderPresets, Preset> = {
  [SliderPresets.Preset1]: {
    Component: PresetOne,
  },
  [SliderPresets.Preset2]: {
    Component: PresetOne,
  },
  [SliderPresets.Preset3]: {
    Component: PresetOne,
  },
  [SliderPresets.Preset4]: {
    Component: PresetOne,
  },
};
