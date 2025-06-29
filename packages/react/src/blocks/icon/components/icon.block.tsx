"use client";

import { RenderIcon } from "@/components/shared/render-icon";
import { BlockProps } from "@/types/block";
import { FC } from "react";
import { IconSettingsType } from "../types";

const Icon: FC<BlockProps<IconSettingsType>> = ({ settings }) => {
  const icon = (
    <RenderIcon iconSet={settings.icon?.iconSet} iconName={settings.icon?.iconName}></RenderIcon>
  );

  return (
    <div className="icon-wrapper">
      <div className="icon">
        {settings.link?.url ? (
          <a
            href={settings.link.url}
            target={settings.link.newWindow ? "_blank" : undefined}
            rel={settings.link.nofollow ? "nofollow" : undefined}
          >
            {icon}
          </a>
        ) : (
          icon
        )}
      </div>
    </div>
  );
};

export default Icon;
