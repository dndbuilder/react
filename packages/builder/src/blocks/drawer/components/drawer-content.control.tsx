import { IconControl, InputControl } from "@/components";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";
import { FiSidebar } from "react-icons/fi";

const DrawerContentControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>

        <Accordion.Content className="px-4">
          {/* Direction */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"direction.desktop"}
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
                toggleTrigger: <FiSidebar className="text-sm rotate-90" />,
                value: "top",
              },
              {
                tooltipContent: "Right",
                toggleTrigger: <FiSidebar className="text-sm rotate-180" />,
                value: "right",
              },
              {
                tooltipContent: "Bottom",
                toggleTrigger: <FiSidebar className="text-sm -rotate-90" />,
                value: "bottom",
              },
            ]}
          />

          <IconControl
            label="Icon"
            fieldName="icon"
            type={SettingsType.BLOCK}
          />

          <InputControl
            label="Icon Size"
            fieldName="icon.size.desktop"
            type={SettingsType.BLOCK}
            inputProps={{
              type: "number",
              min: 0,
            }}
          />

          <InputControl
            label="Text"
            fieldName="text.value"
            type={SettingsType.BLOCK}
            isLocalized
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DrawerContentControl;
