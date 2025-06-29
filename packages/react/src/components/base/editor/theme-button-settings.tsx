"use client";
import { BackgroundControl } from "@/components/controls/background.control";
import { ColorControl } from "@/components/controls/color.control";
import { TextShadowControl } from "@/components/controls/text-shadow.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType, ThemeSettingsType } from "@/types";
import { PseudoClass, Unit, WithPseudoClass } from "@/types/style";
import { FC } from "react";
import { FiX } from "react-icons/fi";
import { RxButton } from "react-icons/rx";
import ThemeButtonPresets from "./theme-button-presets";
import { SelectControl } from "@/components/controls/select.control";
import { useSettings } from "@/hooks/use-settings";
import { SpacingControl } from "@/components/controls/spacing.control";
import { Separator } from "@/components/shared/separator";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const ThemeButtonSettings: FC<Props> = ({ setCurrentSetting }) => {
  const [borderType] = useSettings<WithPseudoClass<string> | undefined>(
    "button.borderStyle",
    SettingsType.THEME
  );

  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <RxButton />
          Button
        </div>
        <button
          className="text-slate-600 hover:text-slate-900"
          onClick={() => setCurrentSetting(ThemeSettingsType.GLOBAL)}
        >
          <FiX size={16} />
        </button>
      </div>

      <Accordion defaultValue={["button", "type"]} type="multiple">
        <Accordion.Item value="button">
          <Accordion.Trigger className="px-4">Button</Accordion.Trigger>
          <Accordion.Content className="px-4">
            <TypographyControl
              type={SettingsType.THEME}
              fieldName="button.typography"
              className="mt-0"
            />
            <TextShadowControl fieldName="button.textShadow" type={SettingsType.THEME} />

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
                  fieldName="button.color"
                  type={SettingsType.THEME}
                  mode={PseudoClass.DEFAULT}
                />

                <BackgroundControl
                  fieldName="button.background"
                  type={SettingsType.THEME}
                  mode={PseudoClass.DEFAULT}
                  showImage={false}
                />
              </Tabs.Content>
              <Tabs.Content value={PseudoClass.HOVER}>
                <ColorControl
                  fieldName="button.color"
                  mode={PseudoClass.HOVER}
                  type={SettingsType.THEME}
                />

                <BackgroundControl
                  fieldName="button.background"
                  type={SettingsType.THEME}
                  mode={PseudoClass.HOVER}
                  showImage={false}
                />
              </Tabs.Content>
            </Tabs>

            <Separator className="my-4" />

            {/* Border Type */}
            <SelectControl
              fieldName="button.borderStyle"
              label="Border Type"
              type={SettingsType.THEME}
              mode={PseudoClass.DEFAULT}
              options={[
                { content: "None", value: "none" },
                { content: "Solid", value: "solid" },
                { content: "Double", value: "double" },
                { content: "Dotted", value: "dotted" },
                { content: "Groove", value: "groove" },
              ]}
            />

            {borderType?.default && borderType.default !== "none" && (
              <>
                <SpacingControl
                  type={SettingsType.THEME}
                  fieldName="button.borderWidth"
                  label="Border Width"
                  mode={PseudoClass.DEFAULT}
                  min={0}
                />

                <ColorControl
                  type={SettingsType.THEME}
                  label="Border Color"
                  fieldName="button.borderColor"
                  mode={PseudoClass.DEFAULT}
                />
              </>
            )}

            {/* Border Radius */}
            <SpacingControl
              fieldName="button.borderRadius"
              label="Border Radius"
              type={SettingsType.THEME}
              mode={PseudoClass.DEFAULT}
              units={[Unit.PX, Unit.EM, Unit.REM]}
            />

            <Separator className="my-4" />

            <SpacingControl
              fieldName="button.padding"
              label="Padding"
              responsive
              units={[Unit.PX, Unit.EM, Unit.REM]}
              type={SettingsType.THEME}
              mode={PseudoClass.DEFAULT}
            />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="type">
          <Accordion.Trigger className="px-4">Type</Accordion.Trigger>
          <Accordion.Content className="px-4">
            <ThemeButtonPresets />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ThemeButtonSettings;
