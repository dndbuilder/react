"use client";

import AddNewSection from "@/components/base/add-new-section";
import EditorRenderChildren from "@/components/base/editor-render-children";
import { Drawer } from "@/components/shared/drawer";
import { RenderIcon } from "@/components/shared/render-icon";
import { BlockProps } from "@/types/block";
import { FC, useState } from "react";
import { DrawerSettingsType } from "../types";

const DrawerBlock: FC<BlockProps<DrawerSettingsType>> = ({
  id,
  settings,
  children,
  meta,
  isEditable,
}) => {
  const locale = meta.locale;
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  // Determine the direction of the drawer
  const direction = settings.direction?.desktop || "left";

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <Drawer.Trigger asChild>
        <div className="cursor-pointer">
          {settings.trigger?.desktop === "icon" ? (
            <RenderIcon
              iconSet={settings.icon?.iconSet}
              iconName={settings.icon?.iconName}
              size={settings.icon?.size?.desktop}
              color={settings.icon?.color?.default}
            />
          ) : (
            <div>
              {settings.text?.value?.[locale] || settings.text?.value?.en}
            </div>
          )}
        </div>
      </Drawer.Trigger>
      <Drawer.Content direction={direction}>
        <EditorRenderChildren
          blocks={children}
          meta={meta}
          isEditable={isEditable ?? false}
        />
        <AddNewSection blockId={id} showBlockLibrary={false} className="p-2" />
      </Drawer.Content>
      <Drawer.Backdrop />
    </Drawer>
  );
};

export default DrawerBlock;
