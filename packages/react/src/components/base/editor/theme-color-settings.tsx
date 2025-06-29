"use client";
import { Accordion } from "@/components/shared/accordion";
import { Button } from "@/components/shared/button";
import { ColorPicker } from "@/components/shared/color-picker";
import { Label } from "@/components/shared/label";
import { Popover } from "@/components/shared/popover";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType, ThemeSettingsType } from "@/types";
import { createId } from "@/utils";
import { cloneDeep } from "lodash";
import React, { FC } from "react";
import { ContentEditable } from "@/components/shared/content-editable";
import { BsFillSquareFill, BsPlus, BsTrash } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { VscSymbolColor } from "react-icons/vsc";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const ThemeColorSettings: FC<Props> = ({ setCurrentSetting }) => {
  const [textColor, setTextColor] = useSettings<string>("color.textColor", SettingsType.THEME);
  const [accentColor, setAccentColor] = useSettings<string>(
    "color.accentColor",
    SettingsType.THEME
  );
  const [backgroundColor, setBackgroundColor] = useSettings<string>(
    "color.backgroundColor",
    SettingsType.THEME
  );
  const [presets, setPresets] = useSettings<Array<{ id: string; name: string; value?: string }>>(
    "color.presets",
    SettingsType.THEME
  );
  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <VscSymbolColor />
          Global Colors
        </div>
        <button
          className="text-slate-600 hover:text-slate-900"
          onClick={() => setCurrentSetting(ThemeSettingsType.GLOBAL)}
        >
          <FiX size={16} />
        </button>
      </div>

      <Accordion defaultValue={["system", "custom"]} type="multiple">
        <Accordion.Item value="system">
          <Accordion.Trigger className="px-4">System Colors</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Background */}
            <div className="flex items-center gap-2 ">
              <p className="me-auto text-xs text-slate-700">Background</p>

              {/* <span className="me-1 text-xs text-slate-700">{backgroundColor}</span> */}

              <Popover>
                <Popover.Trigger className="cursor-pointer rounded-sm border p-1.5">
                  <BsFillSquareFill color={backgroundColor} className=" text-sm" />
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content align="end" alignOffset={-10} className="w-[270px] p-0">
                    <p className="px-4 py-3 shadow-md">Color Picker</p>
                    <div className="p-4">
                      <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                    </div>

                    <Popover.Arrow width={16} height={8} fill="white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover>
            </div>

            {/* Accent */}
            <div className="mt-4 flex items-center gap-2 ">
              <p className="me-auto text-xs text-slate-700">Accent</p>

              {/* <span className="me-1 text-xs text-slate-700">{accentColor}</span> */}

              <Popover>
                <Popover.Trigger className="cursor-pointer rounded-sm border p-1.5">
                  <BsFillSquareFill color={accentColor} className=" text-sm" />
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content align="end" alignOffset={-10} className="w-[270px] p-0">
                    <p className="px-4 py-3 shadow-md">Color Picker</p>
                    <div className="p-4">
                      <ColorPicker disableAlpha color={accentColor} onChange={setAccentColor} />
                    </div>

                    <Popover.Arrow width={16} height={8} fill="white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover>
            </div>

            {/* Text */}
            <div className="mt-4 flex items-center gap-2">
              <p className="me-auto text-xs text-slate-700">Text</p>

              {/* <span className="me-1 text-xs text-slate-700">{textColor}</span> */}

              <Popover>
                <Popover.Trigger className="cursor-pointer rounded-sm border p-1.5">
                  <BsFillSquareFill color={textColor} className=" text-sm" />
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content align="end" alignOffset={-10} className="w-[270px] p-0">
                    <p className="px-4 py-3 shadow-md">Color Picker</p>
                    <div className="p-4">
                      <ColorPicker color={textColor} onChange={setTextColor} />
                    </div>

                    <Popover.Arrow width={16} height={8} fill="white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="custom">
          <Accordion.Trigger className="px-4">Custom Colors</Accordion.Trigger>
          <Accordion.Content className="pe-4 ps-2">
            {presets.map((preset, index) => (
              <div key={index} className="group mt-4 flex items-center gap-2 first:mt-2 ">
                <ContentEditable
                  onChange={(e) => {
                    const value = e.target.value;
                    const newPresets = cloneDeep(presets);
                    newPresets[index].name = value;
                    setPresets(newPresets);
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && e.preventDefault()}
                  html={preset.name}
                  tagName="p"
                  className="me-auto rounded-sm border border-transparent px-2 py-1 text-xs hover:border-slate-100 focus-visible:border-slate-100 focus-visible:outline-0"
                />
                <Label>
                  {/* <span className="group-hover:hidden">{preset.value}</span> */}
                  <BsTrash
                    onClick={() => {
                      const newPresets = cloneDeep(presets);
                      newPresets.splice(index, 1);
                      setPresets(newPresets);
                    }}
                    className="hover:text-danger-500 mx-2 hidden cursor-pointer group-hover:block"
                  />
                </Label>

                <Popover>
                  <Popover.Trigger className="cursor-pointer rounded-sm border p-1.5">
                    <BsFillSquareFill color={preset.value} className=" text-sm" />
                  </Popover.Trigger>

                  <Popover.Portal>
                    <Popover.Content align="end" alignOffset={-10} className="w-[270px] p-0">
                      <p className="px-4 py-3 shadow-md">Color Picker</p>
                      <div className="p-4">
                        <ColorPicker
                          color={preset.value}
                          onChange={(value) => {
                            const newPresets = cloneDeep(presets);
                            newPresets[index].value = value;
                            setPresets(newPresets);
                          }}
                        />
                      </div>

                      <Popover.Arrow width={16} height={8} fill="white" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              </div>
            ))}

            <div className="mt-5 flex justify-center">
              <Button
                onClick={() => {
                  const newPresets = cloneDeep(presets);
                  newPresets.push({
                    id: createId(),
                    name: `Color #${presets.length + 1}`,
                    value: "#000000",
                  });
                  setPresets(newPresets);
                }}
                variant="outline"
                className="flex"
              >
                <BsPlus size={20} className="me-1" />
                Add Color
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ThemeColorSettings;
