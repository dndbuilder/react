"use client";

import { Accordion } from "@/components/shared/accordion";
// import Separator from '@/components/shared/Separator';
// import DropCap from './controls/DropCap';
// import Columns from './controls/Columns';
// import ColumnGap from './controls/ColumnGap';
import TextEditorContent from "./text-editor.control";
import { SettingsType } from "@/types";

const TextContentControl = () => {
  return (
    <Accordion defaultValue="General" type="single" collapsible>
      <Accordion.Item value="General">
        <Accordion.Trigger className="p-4">General</Accordion.Trigger>
        <Accordion.Content className="px-4">
          {/* Text Content */}
          <TextEditorContent
            className="mt-0"
            label="Text Content"
            type={SettingsType.BLOCK}
            fieldName="text"
            isLocalized
          />

          {/* Drop Cap */}
          {/* <DropCap /> */}

          {/* Seperator */}
          {/* <Separator className="my-5" /> */}

          {/* Column */}
          {/* <Columns /> */}

          {/* Column Gap */}
          {/* <ColumnGap /> */}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default TextContentControl;
