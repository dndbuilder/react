"use client";
import { CustomCSSControl } from "@/components/controls/custom-css.control";
import { SettingsType, ThemeSettingsType } from "@/types";
import React, { FC } from "react";
import { BsFiletypeCss } from "react-icons/bs";
import { FiX } from "react-icons/fi";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const ThemeCustomCssSettings: FC<Props> = ({ setCurrentSetting }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <BsFiletypeCss />
          Custom CSS
        </div>
        <button
          className="text-slate-600 hover:text-slate-900"
          onClick={() => setCurrentSetting(ThemeSettingsType.GLOBAL)}
        >
          <FiX size={16} />
        </button>
      </div>

      <div className="p-4">
        <CustomCSSControl
          type={SettingsType.THEME}
          fieldName="customCss"
          label="Add your own custom CSS"
          // height="300px"
        />
      </div>
    </>
  );
};

export default ThemeCustomCssSettings;
