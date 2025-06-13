import { SelectControl } from "@/components/controls/select.control";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { FC } from "react";

type Props = {
  type: SettingsType;
  fieldName: string;
  label?: string;
};

const ButtonPresetControl: FC<Props> = ({ label, fieldName, type }) => {
  const [presets] = useSettings<
    Array<{ name: string; value: Record<string, unknown>; id: string }>
  >("button.presets", SettingsType.THEME);
  return (
    <SelectControl
      type={type}
      fieldName={fieldName}
      label={label}
      options={[
        ...presets.map((preset) => ({
          content: preset.name,
          value: preset.id,
        })),
      ]}
    />
  );
};

export default ButtonPresetControl;
