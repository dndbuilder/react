import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import { lazy } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { HtmlSettingsType } from "./types";

const HtmlConfig = createBlockConfig<HtmlSettingsType>({
  type: BlockType.HTML,
  label: "HTML",
  icon: IoCodeSlashOutline,
  component: lazy(() => import("./components/html.block")),
  group: BlockGroup.ADVANCED,
  settings: {},
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/html-content.control")),
    },
  ],
});

export default HtmlConfig;
