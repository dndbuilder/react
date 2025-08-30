"use client";

import {
  Accordion,
  InputControl,
  Label,
  LinkControl,
  MediaControl,
  Separator,
  TextareaControl,
} from "@dndbuilder.com/react/components";
import { SettingsType } from "@dndbuilder.com/react";

const CardContentControl = () => {
  return (
    <Accordion defaultValue={"General"} type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <MediaControl
            label="Image"
            fieldName="image"
            type={SettingsType.BLOCK}
            className="mt-0"
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
            fieldName="description.content"
            type={SettingsType.BLOCK}
            isLocalized
          />

          <Separator className="my-4" />

          <Label className="font-semibold"> Link</Label>

          {/* Link */}
          <InputControl
            label="Text"
            fieldName="link.text"
            type={SettingsType.BLOCK}
            placeholder="Enter link text"
            direction={"col"}
            isLocalized
          />

          <LinkControl label="Url" fieldName="link" type={SettingsType.BLOCK} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default CardContentControl;
