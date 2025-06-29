"use client";

import { InputControl } from "@/components/controls/input.control";
import { LinkControl } from "@/components/controls/link.control";
import { MediaControl } from "@/components/controls/media.control";
import { TextareaControl } from "@/components/controls/textarea.control";
import { Accordion } from "@/components/shared/accordion";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";

const BannerContentControl = () => {
  const [buttonText] = useSettings<string>("button.text.{{LOCALE}}", SettingsType.BLOCK);
  return (
    <Accordion defaultValue={"General"} type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <MediaControl
            label="Image"
            fieldName="image.media"
            type={SettingsType.BLOCK}
            className="mt-0"
          />
          {/* Subtitle */}
          <InputControl
            label="Subtitle"
            fieldName="subTitle.text"
            type={SettingsType.BLOCK}
            placeholder="Enter subtitle"
            direction={"col"}
            isLocalized
          />
          {/* Title */}
          <InputControl
            label="Title"
            fieldName="title.text"
            type={SettingsType.BLOCK}
            placeholder="Enter title"
            direction={"col"}
            isLocalized
          />
          {/* Description */}
          <TextareaControl
            label="Description"
            fieldName="description.text"
            type={SettingsType.BLOCK}
            isLocalized
          />
          {buttonText?.trim() !== "" && (
            <>
              <InputControl
                label="Button Text"
                fieldName="button.text"
                type={SettingsType.BLOCK}
                isLocalized
              />
              <LinkControl label="Link" fieldName="button.link" type={SettingsType.BLOCK} />
            </>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default BannerContentControl;
