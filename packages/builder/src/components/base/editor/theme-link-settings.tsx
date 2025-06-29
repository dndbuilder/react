"use client";
import { ColorControl } from "@/components/controls/color.control";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import { SettingsType, ThemeSettingsType } from "@/types";
import { PseudoClass } from "@/types/style";
import { FC } from "react";
import { FiLink, FiX } from "react-icons/fi";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const ThemeLinkSettings: FC<Props> = ({ setCurrentSetting }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <FiLink />
          Link
        </div>
        <button
          className="text-slate-600 hover:text-slate-900"
          onClick={() => setCurrentSetting(ThemeSettingsType.GLOBAL)}
        >
          <FiX size={16} />
        </button>
      </div>

      <Accordion defaultValue={["button"]} type="multiple">
        <Accordion.Item value="button">
          <Accordion.Trigger className="px-4">Link</Accordion.Trigger>
          <Accordion.Content className="px-4">
            <Tabs defaultValue={PseudoClass.DEFAULT}>
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
                  type={SettingsType.THEME}
                  fieldName="link.color"
                  mode={PseudoClass.DEFAULT}
                />
              </Tabs.Content>
              <Tabs.Content value={PseudoClass.HOVER}>
                <ColorControl
                  type={SettingsType.THEME}
                  fieldName="link.color"
                  mode={PseudoClass.HOVER}
                />
              </Tabs.Content>
            </Tabs>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ThemeLinkSettings;
