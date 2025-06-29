"use client";

import { RenderChildren } from "@/components/server";
import { Popover } from "@/components/shared/popover";
import { RenderIcon } from "@/components/shared/render-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { Block, BlockProps } from "@/types/block";
import { generateImageUrl } from "@/utils";
import { FC } from "react";
import { DropdownSettingsType } from "../types";

const Dropdown: FC<BlockProps<DropdownSettingsType>> = ({ settings, children, meta }) => {
  const breakpoint = useBreakpoint();

  const locale = meta?.locale || "en";

  const buttonText = settings?.button?.text?.content?.[locale];
  const imageUrl = settings?.button?.image?.media?.path
    ? generateImageUrl(settings?.button?.image?.media?.path)
    : settings?.button?.image?.media?.url;

  const side = settings?.content?.side?.[breakpoint] ?? "bottom";

  const sideOffset = settings?.content?.sideOffset?.[breakpoint] ?? 0;

  const align = settings?.content?.align?.[breakpoint] ?? "start";

  const alignOffset = settings?.content?.alignOffset?.[breakpoint] ?? 0;

  return (
    <div className="dropdown">
      <Popover>
        <Popover.Trigger className="reset dropdown-button flex items-center gap-1">
          {imageUrl && (
            <img
              className="dropdown-button-image h-6 w-6"
              src={imageUrl}
              alt={settings?.button?.image?.media?.name ?? "dropdown-image"}
            />
          )}
          {<span className="dropdown-button-text">{buttonText}</span>}
          {
            <RenderIcon
              className="dropdown-button-icon"
              iconName={settings?.button?.icon?.iconName}
              iconSet={settings?.button?.icon?.iconSet}
            />
          }
        </Popover.Trigger>
        <Popover.Content
          className="dropdown-content z-[1000]"
          side={side}
          sideOffset={Number(sideOffset)}
          align={align}
          alignOffset={Number(alignOffset)}
          avoidCollisions={settings?.content?.avoidCollisions?.[breakpoint] ?? false}
        >
          <RenderChildren blocks={children as Block[]} meta={meta} />
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default Dropdown;
