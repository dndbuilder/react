import { BlockProps } from "@dndbuilder.com/react";
import Link from "next/link";
import { FC } from "react";

// We're using the same type as the original LinkBlock
type LinkSettingsType = {
  text?: { [locale: string]: string };
  link?: {
    url?: string;
    newWindow?: boolean;
    nofollow?: boolean;
  };
};

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
      <Link
        href={url || "#"}
        target={settings.link?.newWindow ? "_blank" : undefined}
        rel={settings.link?.nofollow ? "nofollow" : undefined}
        className="hover:underline"
      >
        {settings.text?.[locale]}
      </Link>
    </div>
  );
};

export default LinkBlock;
