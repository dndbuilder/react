"use client";

import RenderChildren from "@/components/base/render-children";
import { Drawer } from "@/components/shared/drawer";
import { RenderIcon } from "@/components/shared/render-icon";
import { Block, BlockProps } from "@/types/block";
import { FC, useState } from "react";
import { DrawerSettingsType } from "../types";

const DrawerPreview: FC<BlockProps<DrawerSettingsType>> = ({ settings, children, meta }) => {
  const locale = meta?.locale || "en";
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  // Determine the direction of the drawer
  const direction = settings.content?.direction?.desktop || "left";

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <Drawer.Trigger className="reset flex items-center gap-2">
        {settings.trigger?.icon && (
          <RenderIcon
            iconSet={settings.trigger.icon.iconSet}
            iconName={settings.trigger.icon.iconName}
            color={settings.trigger.icon.color?.default}
            className="drawer-trigger-icon"
          />
        )}
        <span className="drawer-trigger-text">{settings.trigger?.text?.content?.[locale]}</span>
      </Drawer.Trigger>
      <Drawer.Content direction={direction}>
        <RenderChildren blocks={children as Block[]} meta={meta} />
      </Drawer.Content>
      <Drawer.Backdrop />
    </Drawer>
  );
};

export default DrawerPreview;
