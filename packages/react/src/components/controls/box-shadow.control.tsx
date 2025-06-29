"use client";

import { Input } from "@/components/shared/input";
import { Popover } from "@/components/shared/popover";
import { RangeSlider } from "@/components/shared/range-slider";
import { BsFillSquareFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

import { ColorPicker } from "@/components/shared/color-picker";
import { Label } from "@/components/shared/label";
import { Select } from "@/components/shared/select";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { BoxShadow } from "@/types/style";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { BreakpointSelector } from "../shared/breakpoint-selector";

export type BoxShadowControlProps = {
  mode?: string;
  fieldName?: string;
  label?: string;
  responsive?: boolean;
  type: SettingsType;
} & HTMLAttributes<HTMLDivElement>;

export const BoxShadowControl: FC<BoxShadowControlProps> = ({
  mode,
  className,
  responsive,
  fieldName = "boxShadow",
  label = "Box Shadow",
  type,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [boxShadow, setBoxShadow] = useSettings<BoxShadow | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const innerValue = boxShadow ?? {
    color: "#ddd",
    horizontal: 0,
    vertical: 0,
    blur: 0,
    spread: 0,
    position: "",
  };

  // const debouncedChangeHandler = useCallback(
  //   debounce((val, field) => {
  //     // Update the value in the store
  //     setBoxShadow({
  //       ...innerValue,
  //       [field]: val,
  //     });
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   // Cleanup the debounced function on component unmount
  //   return () => {
  //     debouncedChangeHandler.cancel();
  //   };
  // }, [debouncedChangeHandler]);

  const handleValueChange = (val: number | string | undefined, field: string) => {
    // debouncedChangeHandler(val, field);
    setBoxShadow({
      ...innerValue,
      [field]: val,
    });
  };

  return (
    <div className={classNames("mt-4 flex justify-between", className)}>
      {label && (
        <Label className="flex items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      {/* Popover */}
      <Popover>
        <Popover.Trigger asChild>
          <button className="rounded border bg-slate-50 px-3 py-1.5 transition-colors duration-200 hover:bg-slate-300">
            <CiEdit />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="end" alignOffset={-8} className="w-[260px] bg-white p-4">
            {/* Color */}
            <div className="flex items-center justify-between">
              <Label>Color</Label>
              <Popover>
                <Popover.Trigger className="rounded-xs border p-1">
                  <BsFillSquareFill style={{ color: innerValue.color }} className="rounded-xs" />
                </Popover.Trigger>
                <Popover.Content className="p-0">
                  <p className="px-4 py-3 shadow-md">Color Picker</p>
                  <div className="p-4">
                    <ColorPicker
                      color={innerValue.color}
                      onChange={(val) => {
                        setBoxShadow({
                          ...innerValue,
                          color: val,
                        });
                      }}
                    />
                  </div>
                </Popover.Content>
              </Popover>
            </div>
            {/* Horizontal */}
            <div className="mt-4">
              <Label className="mb-1.5 block text-xs text-slate-800">Horizontal</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.horizontal ?? 0]}
                  onValueChange={(val) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   horizontal: val[0],
                    // });
                    handleValueChange(val[0], "horizontal");
                  }}
                  max={100}
                  step={1}
                  min={-100}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.horizontal ?? ""}
                  min={-100}
                  max={100}
                  className="w-[60px]"
                  onChange={(e) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   horizontal: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "horizontal");
                  }}
                />
              </div>
            </div>

            {/* Vertical */}
            <div className="mt-3">
              <Label className="mb-1.5 block text-xs text-slate-800">Vertical</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.vertical ?? 0]}
                  onValueChange={(val) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   vertical: val[0],
                    // });
                    handleValueChange(val[0], "vertical");
                  }}
                  max={100}
                  step={1}
                  min={-100}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.vertical ?? ""}
                  onChange={(e) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   vertical: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "vertical");
                  }}
                  min={-100}
                  max={100}
                  className="w-[60px]"
                />
              </div>
            </div>

            {/* Blur */}
            <div className="mt-3">
              <Label className="mb-1.5 block text-xs text-slate-800">Blur</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.blur ?? 0]}
                  onValueChange={(val) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   blur: val[0],
                    // });
                    handleValueChange(val[0], "blur-sm");
                  }}
                  max={100}
                  step={1}
                  min={0}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.blur ?? ""}
                  onChange={(e) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   blur: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "blur-sm");
                  }}
                  min={0}
                  max={100}
                  className="w-[60px]"
                />
              </div>
            </div>

            {/* Spread */}
            <div className="mt-3">
              <Label className="mb-1.5 block text-xs text-slate-800">Spread</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.spread ?? 0]}
                  onValueChange={(val) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   spread: val[0],
                    // });
                    handleValueChange(val[0], "spread");
                  }}
                  max={100}
                  step={1}
                  min={0}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.spread ?? ""}
                  onChange={(e) => {
                    // setBoxShadow({
                    //   ...innerValue,
                    //   spread: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "spread");
                  }}
                  min={0}
                  max={100}
                  className="w-[60px]"
                />
              </div>
            </div>

            {/* Position */}
            <div className="mt-4 grid grid-cols-2 items-center gap-1.5">
              <Label>Position</Label>
              <Select
                value={innerValue.position || ""}
                onValueChange={(val) => {
                  // setBoxShadow({
                  //   ...innerValue,
                  //   position: val,
                  // });
                  handleValueChange(val, "position");
                }}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="">Outset</Select.Item>
                  <Select.Item value="inset">Inset</Select.Item>
                </Select.Content>
              </Select>
            </div>

            {/* Arrow */}
            <Popover.Arrow width={16} height={8} fill="white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};
