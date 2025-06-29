import {
  BorderControl,
  InputControl,
  Label,
  SliderUnitControl,
  SpacingControl,
  Tabs,
  ToggleGroupControl,
  TypographyControl,
} from "@/components";
import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { Accordion } from "@/components/shared/accordion";
import { PseudoClass, SettingsType, Unit } from "@/types";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { TfiAlignJustify } from "react-icons/tfi";

const DrawerStyleControl = () => {
  return (
    <Accordion defaultValue="Trigger" type="single" collapsible>
      <Accordion.Item value="Trigger">
        <Accordion.Trigger className="p-4">Trigger</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <SliderUnitControl
            label="Width"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VW]}
            fieldName="trigger.width"
            type={SettingsType.BLOCK}
            responsive
          />
          <SliderUnitControl
            label="Height"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VH]}
            fieldName="trigger.height"
            type={SettingsType.BLOCK}
            responsive
          />

          <SliderUnitControl
            label="Spacing"
            fieldName="trigger.spacing"
            type={SettingsType.BLOCK}
            responsive
          />

          {/* Alignment */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName={"trigger.align"}
            label={"Alignment"}
            responsive
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: <AiOutlineAlignLeft className="text-sm" />,
                value: "flex-start",
              },
              {
                tooltipContent: "Center",
                toggleTrigger: <AiOutlineAlignCenter className="text-sm" />,
                value: "center",
              },
              {
                tooltipContent: "End",
                toggleTrigger: <AiOutlineAlignRight className="text-sm" />,
                value: "flex-end",
              },
              {
                tooltipContent: "Justified",
                toggleTrigger: <TfiAlignJustify className="text-sm" />,
                value: "space-between",
              },
            ]}
          />

          <SpacingControl
            label="Padding"
            fieldName="trigger.padding"
            type={SettingsType.BLOCK}
            responsive
          />
          <SpacingControl
            label="Margin"
            fieldName="trigger.margin"
            type={SettingsType.BLOCK}
            responsive
          />

          <TypographyControl
            label="Typography"
            fieldName="trigger.typography"
            type={SettingsType.BLOCK}
          />

          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
            <Tabs.List className="h-8 w-full rounded-full">
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.DEFAULT}
              >
                {"Normal"}
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.HOVER}
              >
                {"Hover"}
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.FOCUS}
              >
                {"Focus"}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={PseudoClass.DEFAULT}>
              <ColorControl
                fieldName="trigger.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
              <ColorControl
                label="Background Color"
                fieldName="trigger.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
              <BorderControl
                fieldName="trigger.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="trigger.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />

              <SliderUnitControl
                label="Size"
                fieldName="trigger.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              <ColorControl
                fieldName="trigger.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
              <ColorControl
                label="Background Color"
                fieldName="trigger.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
              <BorderControl
                fieldName="trigger.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="trigger.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />

              <SliderUnitControl
                label="Size"
                fieldName="trigger.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.FOCUS}>
              <ColorControl
                fieldName="trigger.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />
              <ColorControl
                label="Background Color"
                fieldName="trigger.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />
              <BorderControl
                fieldName="trigger.border"
                mode={PseudoClass.FOCUS}
                type={SettingsType.BLOCK}
              />

              <Label className="mt-4 font-semibold">Icon</Label>

              <ColorControl
                label="Color"
                fieldName="trigger.icon.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.FOCUS}
              />

              <SliderUnitControl
                label="Size"
                fieldName="trigger.icon.size"
                type={SettingsType.BLOCK}
                responsive
                mode={PseudoClass.FOCUS}
              />
            </Tabs.Content>
          </Tabs>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Content</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <SliderUnitControl
            label="Width"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VW]}
            fieldName="content.width"
            type={SettingsType.BLOCK}
            responsive
          />
          <SliderUnitControl
            label="Height"
            units={[Unit.PX, Unit.REM, Unit.EM, Unit.PERCENTAGE, Unit.VH]}
            fieldName="content.height"
            type={SettingsType.BLOCK}
            responsive
          />

          <SpacingControl
            label="Padding"
            fieldName="content.padding"
            type={SettingsType.BLOCK}
            responsive
          />
          <SpacingControl
            label="Margin"
            fieldName="content.margin"
            type={SettingsType.BLOCK}
            responsive
          />

          <Tabs defaultValue={PseudoClass.DEFAULT} className="mt-4">
            <Tabs.List className="h-8 w-full rounded-full">
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.DEFAULT}
              >
                {"Normal"}
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex-1 rounded-full p-[3px] text-[13px]"
                value={PseudoClass.HOVER}
              >
                {"Hover"}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={PseudoClass.DEFAULT}>
              {/* Border */}
              <BorderControl
                fieldName="content.border"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Box Shadow */}
              <BoxShadowControl
                fieldName="content.boxShadow"
                mode={PseudoClass.DEFAULT}
                type={SettingsType.BLOCK}
              />

              {/* Background */}
              <ColorControl
                label="Background Color"
                fieldName="content.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.DEFAULT}
              />
            </Tabs.Content>

            <Tabs.Content value={PseudoClass.HOVER}>
              {/* Border */}
              <BorderControl
                fieldName="content.border"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Hover Box Shadow */}
              <BoxShadowControl
                fieldName="content.boxShadow"
                mode={PseudoClass.HOVER}
                type={SettingsType.BLOCK}
              />

              {/* Background */}
              <ColorControl
                label="Background Color"
                fieldName="content.background.color"
                type={SettingsType.BLOCK}
                mode={PseudoClass.HOVER}
              />
            </Tabs.Content>
          </Tabs>

          <ColorControl
            label="Backdrop Color"
            fieldName="content.backdrop.color"
            type={SettingsType.BLOCK}
            mode={PseudoClass.DEFAULT}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DrawerStyleControl;
