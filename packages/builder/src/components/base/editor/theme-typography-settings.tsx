"use client";
import { TypographyControl } from "@/components/controls/typography.control";
import { Accordion } from "@/components/shared/accordion";
import { Button } from "@/components/shared/button";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType, ThemeSettingsType } from "@/types";
import { TypographyType } from "@/types/style";
import { createId } from "@/utils";
import { cloneDeep } from "lodash";
import { FC } from "react";
import { ContentEditable } from "@/components/shared/content-editable";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { TbTypography } from "react-icons/tb";

type Props = {
  setCurrentSetting: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
};

const TypographySettings: FC<Props> = ({ setCurrentSetting }) => {
  const [presets, setPresets] = useSettings<
    Array<{ id: string; name: string; value?: TypographyType }>
  >("typography.presets", SettingsType.THEME);
  return (
    <>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <TbTypography size={18} />
          Typography
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
          <Accordion.Trigger className="px-4">System</Accordion.Trigger>
          <Accordion.Content className="px-4">
            {/* Body Text */}
            <TypographyControl
              label="Body"
              fieldName="typography.body"
              type={SettingsType.THEME}
              showPresets={false}
              className="mt-0"
            />

            {/* H1 Text */}
            <TypographyControl
              label="H1"
              fieldName="typography.h1"
              type={SettingsType.THEME}
              showPresets={false}
            />

            {/* H2 Text */}
            <TypographyControl
              label="H2"
              fieldName="typography.h2"
              type={SettingsType.THEME}
              showPresets={false}
            />

            {/* H3 Text */}
            <TypographyControl
              label="H3"
              fieldName="typography.h3"
              type={SettingsType.THEME}
              showPresets={false}
            />

            {/* H4 Text */}
            <TypographyControl
              label="H4"
              fieldName="typography.h4"
              type={SettingsType.THEME}
              showPresets={false}
            />

            {/* H5 Text */}
            <TypographyControl
              label="H5"
              fieldName="typography.h5"
              type={SettingsType.THEME}
              showPresets={false}
            />

            {/* H6 Text */}
            <TypographyControl
              label="H6"
              fieldName="typography.h6"
              type={SettingsType.THEME}
              showPresets={false}
            />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="custom">
          <Accordion.Trigger className="px-4">Custom</Accordion.Trigger>
          <Accordion.Content className="pe-4 ps-2">
            {presets.map((preset, index) => (
              <div key={index} className="group mb-4 flex items-center justify-between gap-2">
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
                  <BsTrash
                    onClick={() => {
                      const newPresets = cloneDeep(presets);
                      newPresets.splice(index, 1);
                      setPresets(newPresets);
                    }}
                    className="hover:text-danger-500  mx-2 cursor-pointer "
                  />
                </Label>

                <TypographyControl
                  type={SettingsType.THEME}
                  fieldName={`typography.presets.${index}.value`}
                  label=""
                  className="mt-0"
                  showPresets={false}
                />
              </div>
            ))}

            <div className="mt-5 flex justify-center">
              <Button
                onClick={() => {
                  const newPresets = cloneDeep(presets);
                  newPresets.push({
                    id: createId(),
                    name: `Typography #${presets.length + 1}`,
                    value: undefined,
                  });
                  setPresets(newPresets);
                }}
                variant="outline"
                className="flex"
              >
                <BsPlus size={20} className="me-1" />
                Add Typography
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default TypographySettings;
