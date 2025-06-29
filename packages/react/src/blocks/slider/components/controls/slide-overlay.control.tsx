import { SwitchControl } from "@/components/controls/switch.control";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";

type Props = {
  type: SettingsType;
  fieldName: string;
  mediaField: string;
} & HTMLAttributes<HTMLDivElement>;

const SlideOverlayControl: FC<Props> = ({ type, fieldName, mediaField, className }) => {
  const [media] = useSettings<string | undefined>(mediaField, type);
  return media ? (
    <div className={classNames("mt-4", className)}>
      <SwitchControl type={type} fieldName={fieldName} label="Background Overlay" />
    </div>
  ) : null;
};

export default SlideOverlayControl;
