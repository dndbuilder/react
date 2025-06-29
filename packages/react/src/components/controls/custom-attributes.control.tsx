"use client";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { AttributeType } from "@/types/style";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { BsTrash } from "react-icons/bs";
import { cloneDeep } from "lodash";
import { SettingsType } from "@/types";

export const CustomAttributeControl = () => {
  const [customAttributes, setCustomAttributes] = useSettings<AttributeType[] | undefined>(
    "customAttributes",
    SettingsType.ADVANCED
  );
  return (
    <div>
      <Label className="mb-1.5 block">Custom Attributes</Label>

      {customAttributes?.map((attribute, index, arr) => (
        <div className="mb-3 flex items-center gap-3" key={index}>
          <Input
            placeholder="Name"
            value={attribute.name}
            onChange={(e) => {
              const newCustomAttributes = cloneDeep([...arr]);
              newCustomAttributes[index].name = e.target.value;
              setCustomAttributes(newCustomAttributes);
            }}
          />
          <Input
            placeholder="Value"
            value={attribute.value}
            onChange={(e) => {
              const newCustomAttributes = cloneDeep([...arr]);
              newCustomAttributes[index].value = e.target.value;
              setCustomAttributes(newCustomAttributes);
            }}
          />

          <div>
            <BsTrash
              onClick={() => {
                const newCustomAttributes = [...customAttributes];
                newCustomAttributes.splice(index, 1);
                setCustomAttributes(newCustomAttributes);
              }}
              className="hover:text-danger-500 cursor-pointer"
            />
          </div>
        </div>
      ))}

      <Button
        onClick={() => {
          const newCustomAttributes = customAttributes ? [...customAttributes] : [];
          newCustomAttributes.push({ name: "", value: "" });
          setCustomAttributes(newCustomAttributes);
        }}
        disabled={
          Boolean(customAttributes?.length) &&
          !customAttributes?.every((attribute) => attribute.name && attribute.value)
        }
        variant="secondary"
        className="w-full"
      >
        Add new
      </Button>
    </div>
  );
};
