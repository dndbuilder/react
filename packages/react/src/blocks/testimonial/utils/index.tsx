import { BlockMeta } from "@/types/block";
import { presets } from "../components/presets";
import {
  PresetPropsType,
  TestimonialPresets,
  TestimonialItemType,
  TestimonialSettingsType,
} from "../types";

export const renderPreset = (
  data: TestimonialItemType,
  settings: TestimonialSettingsType,
  meta?: BlockMeta
) => {
  const id: TestimonialPresets = settings.preset?.desktop ?? TestimonialPresets.Preset1;
  const preset = presets[id];

  if (!preset) return null;

  return <preset.Component data={data} settings={settings} meta={meta} />;
};
