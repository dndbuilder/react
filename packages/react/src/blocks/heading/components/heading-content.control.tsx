"use client";

import { Accordion } from "@/components/shared/accordion";
import { Separator } from "@/components/shared/separator";

import { LinkControl } from "@/components/controls/link.control";
import { SelectControl } from "@/components/controls/select.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";
import { TextareaControl } from "@/components/controls/textarea.control";
import { SettingsType } from "@/types";

const HeadingContentControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Title */}
          <TextareaControl
            type={SettingsType.BLOCK}
            fieldName="title"
            label="Title"
            className="mt-0"
            isLocalized
          />

          <Separator className="my-4" />

          {/* Link */}
          <LinkControl type={SettingsType.BLOCK} />

          {/* Size */}
          <SelectControl
            responsive
            options={[
              { content: "Small", value: "sm" },
              { content: "Medium", value: "md" },
              { content: "Large", value: "lg" },
              { content: "XL", value: "xl" },
              { content: "XXL", value: "xxl" },
            ]}
            type={SettingsType.BLOCK}
            fieldName="size"
            label="Size"
          />

          {/* Html tag */}
          <SelectControl
            options={[
              { content: "H1", value: "h1" },
              { content: "H2", value: "h2" },
              { content: "H3", value: "h3" },
              { content: "H4", value: "h4" },
              { content: "H5", value: "h5" },
              { content: "H6", value: "h6" },
              { content: "div", value: "div" },
              { content: "span", value: "span" },
              { content: "p", value: "p" },
            ]}
            type={SettingsType.BLOCK}
            fieldName="htmlTag"
            label="HTML Tag"
          />

          {/* <Alignment /> */}
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

export default HeadingContentControl;
