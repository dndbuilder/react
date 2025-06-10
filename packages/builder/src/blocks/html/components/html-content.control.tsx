"use client";
import { Accordion } from "@/components/shared/accordion";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import Editor from "@monaco-editor/react";

const HtmlContentControl = () => {
  const [code, setCode] = useSettings<string | undefined>(
    "code",
    SettingsType.BLOCK
  );
  return (
    <Accordion defaultValue="HTML" type="single" collapsible>
      <Accordion.Item value="HTML">
        <Accordion.Trigger className="p-4">HTML Code</Accordion.Trigger>
        <Accordion.Content className="px-4 pb-5">
          <Label className="mb-1.5">HTML Code</Label>

          <Editor
            value={code}
            onChange={setCode}
            defaultLanguage="html"
            height="150px"
            options={{
              minimap: { enabled: false },
            }}
            className=" rounded border"
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default HtmlContentControl;
