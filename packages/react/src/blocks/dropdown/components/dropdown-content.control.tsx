"use client";

import { IconControl } from "@/components/controls/icon.control";
import { InputControl } from "@/components/controls/input.control";
import { MediaControl } from "@/components/controls/media.control";
import { SwitchControl } from "@/components/controls/switch.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { Label } from "@/components/shared/label";
import { Separator } from "@/components/shared/separator";
import { SettingsType } from "@/types";
import { GoSidebarExpand } from "react-icons/go";
import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdOutlineAlignHorizontalCenter,
} from "react-icons/md";

const DropdownContentControl = () => {
  return (
    <Accordion defaultValue="Button" type="single" collapsible>
      <Accordion.Item value="Button">
        <Accordion.Trigger className="p-4">Button</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <Label className="font-semibold">Text</Label>
          <SwitchControl
            label="Show"
            fieldName="button.text.show"
            type={SettingsType.BLOCK}
            responsive
          />
          <InputControl
            label="Content"
            fieldName="button.text.content"
            type={SettingsType.BLOCK}
            isLocalized
          />
          <InputControl
            label="Order"
            fieldName="button.text.order"
            type={SettingsType.BLOCK}
            responsive
            inputProps={{
              type: "number",
            }}
          />

          <Separator className="my-4" />
          <Label className="font-semibold">Icon</Label>

          <SwitchControl
            label="Show"
            fieldName="button.icon.show"
            type={SettingsType.BLOCK}
            responsive
          />
          <IconControl label="Icon" fieldName="button.icon" type={SettingsType.BLOCK} />
          <InputControl
            label="Order"
            fieldName="button.icon.order"
            type={SettingsType.BLOCK}
            responsive
            inputProps={{
              type: "number",
            }}
          />

          <Separator className="my-4" />
          <Label className="font-semibold">Image</Label>

          <SwitchControl
            label="Show"
            fieldName="button.image.show"
            type={SettingsType.BLOCK}
            responsive
          />
          <MediaControl label="Media" fieldName="button.image.media" type={SettingsType.BLOCK} />
          <InputControl
            label="Order"
            fieldName="button.image.order"
            type={SettingsType.BLOCK}
            responsive
            inputProps={{
              type: "number",
            }}
          />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Content</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Side */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"content.side"}
            label={"Side"}
            className="mt-0"
            responsive
            controls={[
              {
                tooltipContent: "Top",
                toggleTrigger: <GoSidebarExpand className="rotate-90 text-sm" />,
                value: "top",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <GoSidebarExpand className="rotate-180 text-sm" />,
                value: "right",
              },
              {
                tooltipContent: "Bottom",
                toggleTrigger: <GoSidebarExpand className="-rotate-90 text-sm" />,
                value: "bottom",
              },
              {
                tooltipContent: "Left",
                toggleTrigger: <GoSidebarExpand className="text-sm" />,
                value: "left",
              },
            ]}
          />

          {/* Side Offset */}
          <InputControl
            label="Side Offset"
            fieldName="content.sideOffset"
            type={SettingsType.BLOCK}
            responsive
          />

          {/* Align */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"content.align"}
            label={"Align"}
            className="mt-4"
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: <MdAlignHorizontalLeft className="text-sm" />,
                value: "start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <MdOutlineAlignHorizontalCenter className="rotate-90 text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger: <MdAlignHorizontalRight className="text-sm" />,
                value: "end",
              },
            ]}
          />

          {/* Align Offset */}
          <InputControl
            label="Align Offset"
            fieldName="content.alignOffset"
            type={SettingsType.BLOCK}
            responsive
            inputProps={{
              type: "number",
            }}
          />

          {/* Avoid Collisions */}
          <SwitchControl
            label="Avoid Collisions"
            fieldName="content.avoidCollisions"
            type={SettingsType.BLOCK}
            responsive
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DropdownContentControl;
