"use client";

import { Accordion } from "@/components/shared/accordion";
import { ColorControl } from "@/components/controls/color.control";
import { TextShadowControl } from "@/components/controls/text-shadow.control";
import { TypographyControl } from "@/components/controls/typography.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { PseudoClass } from "@/types/style";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";
import { SettingsType } from "@/types";

const TextStyleControl = () => {
  return (
    <Accordion defaultValue="Text" type="single" collapsible>
      <Accordion.Item value="Text">
        <Accordion.Trigger className="p-4">Text</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* <Alignment /> */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"alignment"}
            label={"Alignment"}
            className="mt-0"
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

          {/* Text Color */}
          <ColorControl
            type={SettingsType.BLOCK}
            fieldName="textColor"
            mode={PseudoClass.DEFAULT}
          />

          {/* Typography */}
          <TypographyControl fieldName="typography" type={SettingsType.BLOCK} />

          {/* Text Shadow */}
          <TextShadowControl fieldName="textShadow.desktop.default" type={SettingsType.BLOCK} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default TextStyleControl;
