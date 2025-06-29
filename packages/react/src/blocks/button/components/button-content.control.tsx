"use client";

import { InputControl } from "@/components/controls/input.control";
import { LinkControl } from "@/components/controls/link.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";
import ButtonPresetControl from "./button-preset.control";
import ButtonSizeControl from "./button-size.control";

const ButtonContentControl = () => {
  return (
    <Accordion defaultValue="Button" type="single" collapsible>
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Text */}
          <InputControl
            type={SettingsType.BLOCK}
            fieldName="text"
            label="Text"
            className="mt-0"
            isLocalized
          />

          {/* Type */}
          <ButtonPresetControl fieldName="presetId" label="Type" type={SettingsType.BLOCK} />

          {/* Link */}
          <LinkControl type={SettingsType.BLOCK} />

          {/* Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"alignment"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Left",
                toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
                value: "left",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "right",
              },
              {
                tooltipContent: "Justified",
                toggleTrigger: <TfiAlignJustify className="text-sm" />,
                value: "justify",
              },
            ]}
          />

          {/* Size */}
          <ButtonSizeControl />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ButtonContentControl;
