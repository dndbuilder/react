"use client";

import { IconControl } from "@/components/controls/icon.control";
import { LinkControl } from "@/components/controls/link.control";
import { SelectControl } from "@/components/controls/select.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { SpacingValue, Unit } from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

const IconContentControl = () => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [view] = useSettings("view.desktop", SettingsType.BLOCK);
  const [shape] = useSettings("shape.desktop", SettingsType.BLOCK);
  const [borderRadius, setBorderRadius] = useSettings<SpacingValue>(
    `border.radius.${currentBreakpoint}`,
    SettingsType.BLOCK
  );

  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Select Icon */}
          <IconControl fieldName="icon" label="Select Icon" type={SettingsType.BLOCK} />

          {/* View */}
          <SelectControl
            label="View"
            fieldName="view.desktop"
            options={[
              { content: "Stacked", value: "stacked" },
              { content: "Framed", value: "framed" },
            ]}
            type={SettingsType.BLOCK}
            onValueChange={(val) => {
              if ((val === "stacked" || val === "framed") && shape === "circle") {
                setBorderRadius({
                  top: 50,
                  right: 50,
                  bottom: 50,
                  left: 50,
                  unit: Unit.PERCENTAGE,
                  linked: true,
                });
              } else {
                setBorderRadius({
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  unit: Unit.PX,
                  linked: true,
                });
              }
            }}
          />

          {view !== "default" && (
            <SelectControl
              label="Shape"
              fieldName="shape.desktop"
              options={[
                { content: "Circle", value: "circle" },
                { content: "Square", value: "square" },
              ]}
              type={SettingsType.BLOCK}
              onValueChange={(val) => {
                if (val === "circle") {
                  setBorderRadius({
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                    unit: Unit.PERCENTAGE,
                    linked: true,
                  });
                } else {
                  setBorderRadius({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    unit: Unit.PX,
                    linked: true,
                  });
                }
              }}
            />
          )}

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
            ]}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default IconContentControl;
