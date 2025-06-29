"use client";

import { InputControl } from "@/components/controls/input.control";
import { LinkControl } from "@/components/controls/link.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";

const LinkContentControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Text */}
          <InputControl
            label="Text"
            fieldName="text"
            type={SettingsType.BLOCK}
            className="mt-0"
            isLocalized
          />

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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default LinkContentControl;
