import { FC, HTMLAttributes } from "react";
import design1 from "../../img/design-1.png";
import design2 from "../../img/design-2.png";
import design3 from "../../img/design-3.png";
import design4 from "../../img/design-4.png";
import { SliderPresets } from "../../types";
import { PresetsControl } from "@/components/controls/presets-control";

type Props = {
  fieldName?: string;
} & HTMLAttributes<HTMLDivElement>;

const SliderPresetsControl: FC<Props> = ({ fieldName, className }) => {
  return (
    <PresetsControl
      className={className}
      fieldName={fieldName}
      designs={[
        {
          id: SliderPresets.Preset1,
          image: design1,
        },
        {
          id: SliderPresets.Preset2,
          image: design2,
        },
        {
          id: SliderPresets.Preset3,
          image: design3,
        },
        {
          id: SliderPresets.Preset4,
          image: design4,
        },
      ]}
    />
  );
};

export default SliderPresetsControl;
