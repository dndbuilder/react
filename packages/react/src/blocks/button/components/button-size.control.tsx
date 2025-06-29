import { SelectControl } from "@/components/controls/select.control";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { SizeType, SpacingValue, TypographyType, Unit } from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { FC } from "react";

type Props = {
  fieldName?: string;
  label?: string;
  className?: string;
};

const ButtonSizeControl: FC<Props> = ({ fieldName, className, label = "Size" }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [, setPadding] = useSettings<SpacingValue>(
    fieldName ? `${fieldName}.padding.${currentBreakpoint}` : `padding.${currentBreakpoint}`,
    SettingsType.BLOCK
  );
  const [typography, setTypography] = useSettings<TypographyType | undefined>(
    fieldName ? `${fieldName}.typography` : "typography",
    SettingsType.BLOCK
  );

  const handleSizeChange = (value: string) => {
    switch (value) {
      case SizeType.SM:
        setPadding({
          top: 12,
          right: 24,
          bottom: 12,
          left: 24,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 15,
            },
          },
        });
        break;
      case SizeType.MD:
        setPadding({
          top: 15,
          right: 30,
          bottom: 15,
          left: 30,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 16,
            },
          },
        });
        break;
      case SizeType.LG:
        setPadding({
          top: 20,
          right: 40,
          bottom: 20,
          left: 40,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 18,
            },
          },
        });
        break;
      case SizeType.XL:
        setPadding({
          top: 25,
          right: 50,
          bottom: 25,
          left: 50,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 20,
            },
          },
        });
        break;
      case SizeType.XXL:
        setPadding({
          top: 30,
          right: 55,
          bottom: 30,
          left: 55,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 21,
            },
          },
        });
        break;
      default:
        setPadding({
          top: 10,
          right: 20,
          bottom: 10,
          left: 20,
          unit: Unit.PX,
        });

        setTypography({
          ...typography,
          fontSize: {
            ...typography?.fontSize,
            [currentBreakpoint]: {
              unit: Unit.PX,
              value: 13,
            },
          },
        });
        break;
    }
  };
  return (
    <SelectControl
      type={SettingsType.BLOCK}
      options={[
        // { content: "Default", value: SizeType.DEFAULT },
        { content: "Small", value: SizeType.SM },
        { content: "Medium", value: SizeType.MD },
        { content: "Large", value: SizeType.LG },
        { content: "XL", value: SizeType.XL },
      ]}
      responsive
      fieldName={fieldName ? `${fieldName}.size` : "size"}
      label={label}
      onValueChange={handleSizeChange}
      className={className}
    />
  );
};

export default ButtonSizeControl;
