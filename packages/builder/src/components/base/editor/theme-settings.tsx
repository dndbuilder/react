"use client";

import { ScrollArea } from "@/components/shared/scroll-area";
import { useActionContext } from "@/contexts/action-context";
import { ThemeSettingsType } from "@/types";
import { BuilderRightPanelType } from "@/store/app-slice";
import { useState } from "react";
import { BsFiletypeCss } from "react-icons/bs";
import { FiLink, FiSettings, FiX } from "react-icons/fi";
import { LiaAngleRightSolid } from "react-icons/lia";
import { RxButton } from "react-icons/rx";
import { TbTypography } from "react-icons/tb";
import { TfiLayout } from "react-icons/tfi";
import { VscSymbolColor } from "react-icons/vsc";
import ThemeActionDropdown from "./theme-action-dropdown";
import ThemeButtonSettings from "./theme-button-settings";
import ThemeColorSettings from "./theme-color-settings";
import ThemeCustomCssSettings from "./theme-custom-css-settings";
import ThemeLayoutSettings from "./theme-layout-settings";
import ThemeLinkSettings from "./theme-link-settings";
import ThemeTypographySettings from "./theme-typography-settings";

interface SettingItemProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const SettingItem = ({ label, icon, onClick }: SettingItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50"
    >
      <div className="flex items-center">
        {icon && <div className="w-4">{icon}</div>}
        <div className="ms-2">{label}</div>
      </div>
      <LiaAngleRightSolid />
    </div>
  );
};

const Navigation = () => {
  const [currentSetting, setCurrentSetting] = useState<ThemeSettingsType>(ThemeSettingsType.GLOBAL);

  const { toggleRightPanel } = useActionContext();

  switch (currentSetting) {
    case ThemeSettingsType.LAYOUT:
      return <ThemeLayoutSettings setCurrentSetting={setCurrentSetting} />;

    case ThemeSettingsType.COLOR:
      return <ThemeColorSettings setCurrentSetting={setCurrentSetting} />;

    case ThemeSettingsType.TYPOGRAPHY:
      return <ThemeTypographySettings setCurrentSetting={setCurrentSetting} />;

    case ThemeSettingsType.BUTTON:
      return <ThemeButtonSettings setCurrentSetting={setCurrentSetting} />;

    case ThemeSettingsType.LINK:
      return <ThemeLinkSettings setCurrentSetting={setCurrentSetting} />;

    case ThemeSettingsType.CUSTOM_CSS:
      return <ThemeCustomCssSettings setCurrentSetting={setCurrentSetting} />;

    default:
      return (
        <div className="relative">
          <div className="flex items-center justify-between gap-2 border-b p-4 text-base font-semibold">
            <div className="flex items-center gap-2">
              <FiSettings />
              Theme Settings
            </div>
            <button
              className="text-slate-600 hover:text-slate-900"
              onClick={() => {
                toggleRightPanel(BuilderRightPanelType.SETTINGS);
              }}
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="border-b">
            <div className="divide-y">
              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.LAYOUT)}
                label="Layout"
                icon={<TfiLayout size={16} />}
              />
              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.COLOR)}
                label="Colors"
                icon={<VscSymbolColor size={16} />}
              />
              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.TYPOGRAPHY)}
                label="Typography"
                icon={<TbTypography size={16} />}
              />
              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.BUTTON)}
                label="Button"
                icon={<RxButton size={16} />}
              />
              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.LINK)}
                label="Link"
                icon={<FiLink />}
              />

              <SettingItem
                onClick={() => setCurrentSetting(ThemeSettingsType.CUSTOM_CSS)}
                label="Custom CSS"
                icon={<BsFiletypeCss size={18} />}
              />
            </div>
          </div>
        </div>
      );
  }
};

const ThemeSettings = () => {
  return (
    <div>
      <ScrollArea className="h-[calc(100vh-115px)]">
        <div className="panel-scroll-content">
          <Navigation />
        </div>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <ThemeActionDropdown />
      </div>
    </div>
  );
};

export default ThemeSettings;
