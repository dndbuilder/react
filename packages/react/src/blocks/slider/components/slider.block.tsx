"use client";
import { BlockProps } from "@/types/block";
import { FC } from "react";
import { SliderPresets, SliderSettingsType } from "../types";
import { presets } from "./presets";

const Carousel: FC<BlockProps<SliderSettingsType>> = ({ settings, meta }) => {
  const renderPreset = (settings: SliderSettingsType) => {
    const id: SliderPresets = settings.preset?.desktop ?? SliderPresets.Preset1;
    const preset = presets[id];
    return <preset.Component settings={settings} meta={meta} />;
  };
  return <div className="slider-wrapper">{renderPreset(settings)}</div>;
};

export default Carousel;
