import { FC } from "react";
import { PresetPropsType, TestimonialPresets } from "../../types";
import PresetOne from "./preset-one";
import PresetTwo from "./preset-two";

type Preset = {
  Component: FC<PresetPropsType>;
};

export const presets: Record<TestimonialPresets, Preset> = {
  [TestimonialPresets.Preset1]: {
    Component: PresetOne,
  },
  [TestimonialPresets.Preset2]: {
    Component: PresetTwo,
  },
};
