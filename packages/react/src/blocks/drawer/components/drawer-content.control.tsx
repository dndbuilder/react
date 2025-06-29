import { IconControl, InputControl, Label, Separator, SwitchControl } from "@/components";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { FiSidebar } from "react-icons/fi";

const DrawerContentControl = () => {
  return (
    <Accordion defaultValue="Trigger" type="single" collapsible>
      <Accordion.Item value="Trigger">
        <Accordion.Trigger className="p-4">Trigger</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <Label className="font-semibold">Text</Label>
          <SwitchControl
            label="Show"
            fieldName="trigger.text.show"
            type={SettingsType.BLOCK}
            responsive
          />
          <InputControl
            label="Content"
            fieldName="trigger.text.content"
            type={SettingsType.BLOCK}
            isLocalized
          />

          <InputControl
            label="Order"
            fieldName="trigger.text.order"
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
            fieldName="trigger.icon.show"
            type={SettingsType.BLOCK}
            responsive
          />

          <IconControl label="Icon" fieldName="trigger.icon" type={SettingsType.BLOCK} />

          <InputControl
            label="Order"
            fieldName="trigger.icon.order"
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
          {/* Direction */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"content.direction.desktop"}
            label={"Direction"}
            className="mt-0"
            defaultValue="left"
            controls={[
              {
                tooltipContent: "Left",
                toggleTrigger: <FiSidebar className="text-sm" />,
                value: "left",
              },
              {
                tooltipContent: "Top",
                toggleTrigger: <FiSidebar className="rotate-90 text-sm" />,
                value: "top",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <FiSidebar className="rotate-180 text-sm" />,
                value: "right",
              },
              {
                tooltipContent: "Bottom",
                toggleTrigger: <FiSidebar className="-rotate-90 text-sm" />,
                value: "bottom",
              },
            ]}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DrawerContentControl;
