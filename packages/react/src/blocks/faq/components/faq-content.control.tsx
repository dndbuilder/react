"use client";
import { Accordion } from "@/components/shared/accordion";
import { Label } from "@/components/shared/label";
import FaqsControl from "./faqs.control";
import { Separator } from "@/components/shared/separator";
import { SwitchControl } from "@/components/controls/switch.control";
import { SettingsType } from "@/types";

const FaqContentControl = () => {
  return (
    <Accordion defaultValue={"General"} type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <Label className="mb-2">FAQs</Label>
          <FaqsControl />

          <Separator className="my-4" />

          <SwitchControl type={SettingsType.BLOCK} fieldName="isAccordion" label="Accordion" />
          <SwitchControl
            type={SettingsType.BLOCK}
            fieldName="isOpenFirstItem"
            label="Open first item by default"
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default FaqContentControl;
