import { ContainerConfig } from "@/blocks/container";
import { BuilderRegistry } from "../registry";
import { HeadingConfig } from "@/blocks/heading";
import { TextConfig } from "@/blocks/text";
import { LinkConfig } from "@/blocks/link";
import { ButtonConfig } from "@/blocks/button";
import { ImageConfig } from "@/blocks/image";
import { IconConfig } from "@/blocks/icon";
import { TabsConfig } from "@/blocks/tabs";
import { DrawerConfig } from "@/blocks/drawer";
import { DropdownConfig } from "@/blocks/dropdown";
import { HtmlConfig } from "@/blocks/html";
import { BannerConfig } from "@/blocks/banner";
import { SliderConfig } from "@/blocks/slider";
import { FaqConfig } from "@/blocks/faq";
import { TestimonialConfig } from "@/blocks/testimonial";
import { ProgressBarConfig } from "@/blocks/progress-bar";
import { BlockGroup, Breakpoint } from "@/types";
import { FiMonitor } from "react-icons/fi";
import { AiOutlineMobile, AiOutlineTablet } from "react-icons/ai";

const builderRegistry = new BuilderRegistry();

builderRegistry.registerBlocks([
  ContainerConfig,
  HeadingConfig,
  TextConfig,
  ButtonConfig,
  LinkConfig,
  ImageConfig,
  IconConfig,
  TabsConfig,
  DrawerConfig,
  DropdownConfig,

  // Advanced blocks
  HtmlConfig,
  BannerConfig,
  SliderConfig,
  FaqConfig,
  TestimonialConfig,
  ProgressBarConfig,
]);

// Set the order of block groups
builderRegistry.setGroupsOrder([BlockGroup.BASIC, BlockGroup.ADVANCED]);

// Register Breakpoints
builderRegistry.registerBreakpoints([
  {
    label: "Desktop",
    key: Breakpoint.DESKTOP,
    icon: FiMonitor,
    previewWidth: 1280,
    maxWidth: 999999,
    minWidth: 1024,
  },
  {
    label: "Tablet",
    key: Breakpoint.TABLET,
    icon: AiOutlineTablet,
    previewWidth: 768,
    maxWidth: 1023,
    minWidth: 641,
  },
  {
    label: "Mobile",
    key: Breakpoint.MOBILE,
    icon: AiOutlineMobile,
    previewWidth: 400,
    maxWidth: 640,
    minWidth: 0,
  },
]);

export const BuilderConfiguration = builderRegistry;
