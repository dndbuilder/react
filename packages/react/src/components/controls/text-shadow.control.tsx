"use client";
import { ColorPicker } from "@/components/shared/color-picker";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Popover } from "@/components/shared/popover";
import { RangeSlider } from "@/components/shared/range-slider";
import { useSettings } from "@/hooks/use-settings";
import { TextShadow } from "@/types/style";
import { BsFillSquareFill } from "react-icons/bs";
import { useAppSelector } from "@/hooks/use-app-selector";
import { SettingsType } from "@/types";
import { classNames } from "@/utils";
import { FC } from "react";
import { CiEdit } from "react-icons/ci";
import { getCurrentBreakpoint } from "@/store/selectors";

export type TextShadowControlProps = {
  type: SettingsType;
  fieldName?: string;
  label?: string;
  mode?: string;
  responsive?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const TextShadowControl: FC<TextShadowControlProps> = ({
  type,
  responsive,
  mode,
  fieldName = "textShadow",
  label = "Text Shadow",
  className,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [textShadow, setTextShadow] = useSettings<TextShadow | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );
  const innerValue = textShadow ?? {
    color: "rgba(0, 0, 0, 0.3)",
    horizontal: 0,
    vertical: 0,
    blur: 0,
  };

  // const debouncedChangeHandler = useCallback(
  //   debounce((val, field) => {
  //     // Update the value in the store
  //     setTextShadow({
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
    setTextShadow({
      ...innerValue,
      [field]: val,
    });
  };

  return (
    <div className={classNames("mt-4 flex items-center gap-1.5", className)}>
      <Label className="me-auto ">{label}</Label>

      {/* <ResetControl /> */}
      <Popover>
        <Popover.Trigger asChild>
          <div className="cursor-pointer rounded-sm bg-slate-50 px-3 py-1.5 transition-colors duration-200 hover:bg-slate-300">
            <CiEdit />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="end" alignOffset={-8} className="w-[260px] bg-white p-4">
            {/* Color */}
            <div className="flex items-center justify-between">
              <Label>Color</Label>
              <Popover>
                <Popover.Trigger asChild className="rounded-xs border p-1">
                  <div>
                    <BsFillSquareFill style={{ color: innerValue.color }} className="rounded-xs" />
                  </div>
                </Popover.Trigger>
                <Popover.Content className="p-0">
                  <p className="px-4 py-3 shadow-md">Color Picker</p>
                  <div className="p-4">
                    <ColorPicker
                      color={innerValue.color}
                      onChange={(val) => {
                        setTextShadow({
                          ...innerValue,
                          color: val,
                        });
                        // handleValueChange(val, 'color');
                      }}
                    />
                  </div>
                </Popover.Content>
              </Popover>
            </div>

            {/* Blur */}
            <div className="mt-3">
              <Label className="mb-1.5 block ">Blur</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.blur ?? 0]}
                  onValueChange={(val) => {
                    // setTextShadow({
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
                  defaultValue={innerValue.blur}
                  onChange={(e) => {
                    // setTextShadow({
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

            {/* Horizontal */}
            <div className="mt-4">
              <Label className="mb-1.5 block ">Horizontal</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.horizontal ?? 0]}
                  onValueChange={(val) => {
                    // setTextShadow({
                    //   ...innerValue,
                    //   horizontal: val[0],
                    // });
                    handleValueChange(val[0], "horizontal");
                  }}
                  max={100}
                  step={1}
                  min={0}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.horizontal}
                  onChange={(e) => {
                    // setTextShadow({
                    //   ...innerValue,
                    //   horizontal: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "horizontal");
                  }}
                  min={0}
                  max={100}
                  className="w-[60px]"
                />
              </div>
            </div>

            {/* Vertical */}
            <div className="mt-3">
              <Label className="mb-1.5 block ">Vertical</Label>
              <div className="flex gap-1.5">
                <RangeSlider
                  defaultValue={[innerValue.vertical ?? 0]}
                  onValueChange={(val) => {
                    // setTextShadow({
                    //   ...innerValue,
                    //   vertical: val[0],
                    // });
                    handleValueChange(val[0], "vertical");
                  }}
                  max={100}
                  step={1}
                  min={0}
                />
                <Input
                  type="number"
                  defaultValue={innerValue.vertical}
                  onChange={(e) => {
                    // setTextShadow({
                    //   ...innerValue,
                    //   vertical: Number(e.target.value),
                    // });
                    handleValueChange(Number(e.target.value), "vertical");
                  }}
                  min={0}
                  max={100}
                  className="w-[60px]"
                />
              </div>
            </div>

            {/* Arrow */}
            <Popover.Arrow width={16} height={8} fill="white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};
