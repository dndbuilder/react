import { Input } from "@/components/shared/input";
import { classNames } from "@/utils";
import { FC, HTMLAttributes, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import { LinkType, SettingsType } from "@/types";
import { useSettings } from "@/hooks/use-settings";
import { createId } from "@/utils";

export type LinkControlProps = {
  type: SettingsType;
  fieldName?: string;
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

export const LinkControl: FC<LinkControlProps> = ({
  type,
  fieldName = "link",
  label = "Link",
  className,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [link, setLink] = useSettings<LinkType | undefined>(fieldName, type);

  const handleChange = (val: unknown, property: keyof LinkType) => {
    setLink({
      ...link,
      [property]: val,
    });
  };

  const autoId = createId();
  return (
    <div className={classNames("mt-4 grid gap-1.5", className)}>
      {label && <Label>{label}</Label>}

      <div className="flex">
        <Input
          id={autoId}
          value={link?.url ?? ""}
          onChange={(e) => handleChange(e.target.value, "url")}
          type="url"
          placeholder="Paste URL or type"
          className="rounded-r-none "
        />
        <button
          onClick={() => setShowSettings((prevState) => !prevState)}
          className="rounded-r-md border border-l-0 border-slate-300 bg-slate-100 px-2 hover:bg-slate-300"
        >
          <CiSettings />
        </button>
      </div>

      <div
        className={classNames(
          "grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-200",
          {
            "grid-rows-[1fr]": showSettings,
          }
        )}
      >
        <div className={classNames("min-h-0", { "h-auto": showSettings })}>
          <Label className="mt-3 flex">
            <Checkbox
              checked={Boolean(link?.newWindow)}
              onCheckedChange={(val) => handleChange(val, "newWindow")}
              className="me-1.5"
            />
            Open in new window
          </Label>
          <Label className="mt-2 flex">
            <Checkbox
              checked={Boolean(link?.nofollow)}
              onCheckedChange={(val) => handleChange(val, "nofollow")}
              className="me-1.5"
            />
            Add nofollow
          </Label>

          {/* <Label className="mt-4 grid gap-1.5">
            Custom Attributers
            <Input
              placeholder="key|value"
              value={link.attributers}
              onChange={(e) => handleChange(e.target.value, 'attributers')}
            />
          </Label>

          <InfoMessage>
            Set custom attributes for the link element. Separate attribute keys from values using the | (pipe)
            character. Separate key-value pairs with a comma. <span className="text-slate-800">Learn More</span>
          </InfoMessage> */}
        </div>
      </div>
    </div>
  );
};
