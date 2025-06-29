"use client";
import { FlexGapControl } from "@/components/controls/flex-gap.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { SpacingControl } from "@/components/controls/spacing.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType, ThemeSettingsType } from "@/types";
import { Unit } from "@/types/style";
import React, { FC } from "react";
import { FiX } from "react-icons/fi";
import { TfiLayout } from "react-icons/tfi";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const ThemeLayoutSettings: FC<Props> = ({ setCurrentSetting }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <TfiLayout />
          Layout
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
          <Accordion.Trigger className="px-4">Container</Accordion.Trigger>
          <Accordion.Content className="px-4">
            <SliderUnitControl
              className="mt-0"
              fieldName="layout.container.width"
              type={SettingsType.THEME}
              label="Width"
              responsive
            />
            <SliderUnitControl
              fieldName="layout.container.maxWidth"
              type={SettingsType.THEME}
              label="Max Width"
              responsive
            />
            <SpacingControl
              fieldName="layout.container.padding"
              type={SettingsType.THEME}
              label="Padding"
              responsive
            />
            {/* Gap between elements */}
            <FlexGapControl
              responsive
              label="Gaps"
              fieldName="layout.container.gap"
              type={SettingsType.THEME}
              min={0}
              units={[Unit.PX, Unit.EM, Unit.REM, Unit.VW]}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ThemeLayoutSettings;
