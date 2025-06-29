"use client";

import { InputControl } from "@/components/controls/input.control";
import { LinkControl } from "@/components/controls/link.control";
import { MediaControl } from "@/components/controls/media.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { FC, HTMLAttributes } from "react";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ImageContentControl: FC<Props> = () => {
  return (
    <Accordion defaultValue="Image" type="single" collapsible>
      <Accordion.Item value="Image">
        <Accordion.Trigger className="p-4">Image</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Choose Image */}
          <MediaControl
            type={SettingsType.BLOCK}
            fieldName="media"
            label="Choose Image"
            className="mt-0"
          />

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
                value: "flex-start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "flex-end",
              },
            ]}
          />

          {/* Link */}
          <LinkControl type={SettingsType.BLOCK} />

          {/* Caption */}
          <InputControl
            type={SettingsType.BLOCK}
            fieldName="caption.text"
            label="Caption"
            direction={"col"}
            isLocalized
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ImageContentControl;
