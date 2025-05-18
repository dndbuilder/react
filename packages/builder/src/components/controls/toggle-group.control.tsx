import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Tooltip from "@/components/shared/tooltip";
import { classNames } from "@/utils";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { PseudoClass } from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { VariantProps, cva } from "class-variance-authority";
import Label from "@/components/shared/label";
import BreakpointSelector from "../shared/breakpoint-selector";
import { SettingsType } from "@/types";
import { useSettings } from "@/hooks/use-settings";

const controlVariants = cva("", {
  variants: {
    direction: {
      row: "flex-row justify-between items-center",
      col: "flex-col",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});
interface ControlType {
  tooltipContent: React.ReactNode;
  toggleTrigger: React.ReactNode;
  value: string;
}

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof controlVariants> {
  controls: ControlType[];
  label?: ReactNode;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  defaultValue?: string;
}

const toggleGroupItemClasses =
  "hover:bg-dark-100  controls-[state=on]:bg-dark-100 flex h-[28px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-hidden";

const ToggleGroupControl = forwardRef<HTMLDivElement, Props>(
  (
    {
      type,
      controls,
      className,
      label,
      responsive,
      fieldName,
      direction,
      mode,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
    const [value, setValue] = useSettings<string | undefined>(
      responsive && mode
        ? `${fieldName}.${currentBreakpoint}.${mode}`
        : responsive
          ? `${fieldName}.${currentBreakpoint}`
          : mode
            ? `${fieldName}.${mode}`
            : fieldName,
      type
    );

    return (
      <div
        className={classNames(
          "mt-4 flex w-full gap-1.5",
          controlVariants({ direction, className })
        )}
        ref={ref}
        {...props}
      >
        {label && (
          <Label className="flex items-center gap-1">
            {label} {responsive && <BreakpointSelector />}
          </Label>
        )}

        <div>
          <ToggleGroup.Root
            loop
            value={value}
            onValueChange={(val) => {
              defaultValue && !val ? setValue(defaultValue) : setValue(val);
            }}
            className="inline-flex rounded-sm border"
            type="single"
          >
            {controls.map(
              ({ toggleTrigger, tooltipContent, value: val }, index) => (
                <Tooltip key={index}>
                  <Tooltip.Trigger asChild>
                    <ToggleGroup.Item
                      className={classNames(
                        toggleGroupItemClasses,
                        "border-r last:border-r-0",
                        {
                          "bg-dark-100": val === value,
                        }
                      )}
                      value={val}
                    >
                      {toggleTrigger}
                    </ToggleGroup.Item>
                  </Tooltip.Trigger>

                  {tooltipContent && (
                    <Tooltip.Content>{tooltipContent}</Tooltip.Content>
                  )}
                </Tooltip>
              )
            )}
          </ToggleGroup.Root>
        </div>
      </div>
    );
  }
);

ToggleGroupControl.displayName = "ToggleGroupControl";

export default ToggleGroupControl;
