import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import { generateBoxShadow } from "@/utils/style";
import { lazy } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import DrawerContentControl from "./components/drawer-content.control";
import DrawerStyleControl from "./components/drawer-style.control";
import { DrawerSettingsType } from "./types";

const DrawerConfig = createBlockConfig<DrawerSettingsType>({
  type: BlockType.DRAWER,
  label: "Drawer",
  icon: GoSidebarCollapse,
  component: lazy(() => import("./components/drawer.block")),
  group: BlockGroup.BASIC,
  settings: {
    direction: { desktop: "left" },
    trigger: { desktop: "icon" },
    icon: {
      iconSet: "ant-design",
      iconName: "menu-outlined",
      size: { desktop: 25 },
    },
    text: {
      value: { en: "Drawer" },
    },
    overlayColor: "rgba(0, 0, 0, 0.4)",
    boxShadow: {
      color: "rgba(0, 0, 0, 0.1)",
      horizontal: 0,
      vertical: 0,
      blur: 10,
      spread: 5,
    },
  },
  style: ({ settings }) => {
    return {
      "& .drawer-block": {
        "& .drawer": {
          "& .drawer-content": {
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            boxShadow: generateBoxShadow(settings.boxShadow),
          },
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: DrawerContentControl,
    },
    {
      label: "Style",
      component: DrawerStyleControl,
    },
  ],
});

export default DrawerConfig;
