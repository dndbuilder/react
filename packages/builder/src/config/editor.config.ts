import { BannerConfig } from "@/blocks/banner";
import { ButtonConfig } from "@/blocks/button";
import { ContainerConfig } from "@/blocks/container";
import { DrawerConfig } from "@/blocks/drawer";
import { DropdownConfig } from "@/blocks/dropdown";
import { FaqConfig } from "@/blocks/faq";
import { HeadingConfig } from "@/blocks/heading";
import { HtmlConfig } from "@/blocks/html";
import { IconConfig } from "@/blocks/icon";
import { ImageConfig } from "@/blocks/image";
import { LinkConfig } from "@/blocks/link";
import { ProgressBarConfig } from "@/blocks/progress-bar";
import { SliderConfig } from "@/blocks/slider";
import { TabsConfig } from "@/blocks/tabs";
import { TestimonialConfig } from "@/blocks/testimonial";
import { TextConfig } from "@/blocks/text";
import { registerEditorBlocks } from "@/core";

export const BlockConfiguration = registerEditorBlocks([
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
