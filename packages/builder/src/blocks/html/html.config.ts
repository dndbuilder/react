import { createBlockConfig } from "@/utils";
import { BlockGroup, BlockType } from "@/types/block";
import { IoCodeSlashOutline } from "react-icons/io5";
import HtmlContentControl from "./components/html-content.control";
import { HtmlSettingsType } from "./types";
import { lazy } from "react";

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
      component: HtmlContentControl,
    },
  ],
});

export default HtmlConfig;
