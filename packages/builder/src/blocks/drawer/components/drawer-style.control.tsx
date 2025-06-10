import { BoxShadowControl } from "@/components/controls/box-shadow.control";
import { ColorControl } from "@/components/controls/color.control";
import { Accordion } from "@/components/shared/accordion";
import { SettingsType } from "@/types";

const DrawerStyleControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <ColorControl
            fieldName="textColor"
            label="Text Color"
            type={SettingsType.BLOCK}
            className="mt-0"
          />
          <ColorControl
            fieldName="backgroundColor"
            label="Background Color"
            type={SettingsType.BLOCK}
          />
          <ColorControl
            fieldName="overlayColor"
            label="Overlay Color"
            type={SettingsType.BLOCK}
          />
          <BoxShadowControl
            fieldName="boxShadow"
            label="Box Shadow"
            type={SettingsType.BLOCK}
          />

          <ColorControl
            fieldName="icon.color.default"
            label="Icon Color"
            type={SettingsType.BLOCK}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DrawerStyleControl;
