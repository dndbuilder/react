import { BlockProps } from "@/types/block";
import { FC } from "react";
import { LinkSettingsType } from "../types";

const LinkBlock: FC<BlockProps<LinkSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  if (!settings.text) return null;

  const rules = /^[\/#\?]|^[^:]+:/; // Check if the url is relative or absolute path

  let url = settings.link?.url;

  if (!rules.test(settings.link?.url ?? "")) {
    url = `https://${url}`;
  }

  return (
    <div className="link-block">
      <a
        href={url || "#"}
        target={settings.link?.newWindow ? "_blank" : undefined}
        rel={settings.link?.nofollow ? "nofollow" : undefined}
        className="hover:underline"
        onClick={(e) => e.preventDefault()}
      >
        {settings.text?.[locale]}
      </a>
    </div>
  );
};

export default LinkBlock;
