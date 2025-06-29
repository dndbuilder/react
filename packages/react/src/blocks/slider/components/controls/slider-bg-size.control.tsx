import { SelectControl } from "@/components/controls/select.control";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { FC, HTMLAttributes } from "react";

type Props = {
  type: SettingsType;
  fieldName: string;
  mediaField: string;
} & HTMLAttributes<HTMLDivElement>;

const SlideBgSizeControl: FC<Props> = ({ type, fieldName, mediaField, className }) => {
  const [media] = useSettings<string | undefined>(mediaField, type);

  return media ? (
    <SelectControl
      type={type}
      fieldName={fieldName}
      label="Size"
      options={[
        { content: "Cover", value: "cover" },
        { content: "Contain", value: "contain" },
        { content: "Auto", value: "auto" },
      ]}
      className={className}
    />
  ) : null;
};

export default SlideBgSizeControl;
