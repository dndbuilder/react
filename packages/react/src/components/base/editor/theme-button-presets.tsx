"use client";
import { BackgroundControl } from "@/components/controls/background.control";
import { ColorControl } from "@/components/controls/color.control";
import { TextShadowControl } from "@/components/controls/text-shadow.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Button } from "@/components/shared/button";
import { Popover } from "@/components/shared/popover";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { PseudoClass } from "@/types/style";
import { createId } from "@/utils";
import { cloneDeep } from "lodash";
import { ContentEditable } from "@/components/shared/content-editable";
import { BsPlus } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const ThemeButtonPresets = () => {
  const [presets, setPresets] = useSettings<
    Array<{ name: string; value: Record<string, unknown>; id: string }>
  >("button.presets", SettingsType.THEME);
  return (
    <>
      {presets.map((preset, index) => (
        <div key={index} className="mt-2 flex items-center justify-between">
          {/* <Label>{preset.name}</Label> */}
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

          <Popover>
            <Popover.Trigger asChild>
              <div className="cursor-pointer rounded-sm border bg-slate-50 px-3 py-1.5">
                <CiEdit />
              </div>
            </Popover.Trigger>
            <Popover.Content align="center" side="left">
              <TypographyControl
                type={SettingsType.THEME}
                fieldName={`button.presets.${index}.value.typography`}
                className="mt-0"
              />
              <TextShadowControl
                fieldName={`button.presets.${index}.value.textShadow`}
                type={SettingsType.THEME}
              />

              <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
                <Tabs.List className="h-8 w-full rounded-full">
                  <Tabs.Trigger
                    className="flex-1 rounded-full p-[3px] text-[13px]"
                    value={PseudoClass.DEFAULT}
                  >
                    {"Normal"}
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="flex-1 rounded-full p-[3px] text-[13px]"
                    value={PseudoClass.HOVER}
                  >
                    {"Hover"}
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value={PseudoClass.DEFAULT}>
                  <ColorControl
                    fieldName={`button.presets.${index}.value.color`}
                    type={SettingsType.THEME}
                    mode={PseudoClass.DEFAULT}
                  />

                  <BackgroundControl
                    fieldName={`button.presets.${index}.value.background`}
                    type={SettingsType.THEME}
                    mode={PseudoClass.DEFAULT}
                    showImage={false}
                  />
                </Tabs.Content>
                <Tabs.Content value={PseudoClass.HOVER}>
                  <ColorControl
                    fieldName={`button.presets.${index}.value.color`}
                    mode={PseudoClass.HOVER}
                    type={SettingsType.THEME}
                  />
                  <BackgroundControl
                    fieldName={`button.presets.${index}.value.background`}
                    type={SettingsType.THEME}
                    mode={PseudoClass.HOVER}
                    showImage={false}
                  />
                </Tabs.Content>
              </Tabs>
              <Popover.Arrow width={16} height={8} fill="white" />
            </Popover.Content>
          </Popover>
        </div>
      ))}
      <div className="mt-5 flex justify-center">
        <Button
          onClick={() => {
            const newPresets = cloneDeep(presets);
            newPresets.push({
              name: `Type #${presets.length + 1}`,
              value: {},
              id: createId(),
            });
            setPresets(newPresets);
          }}
          variant="outline"
          className="flex"
        >
          <BsPlus size={20} className="me-1" />
          Add Type
        </Button>
      </div>
    </>
  );
};

export default ThemeButtonPresets;
