import { ButtonConfig } from "@/blocks/button";
import { ContainerConfig } from "@/blocks/container";
import { HeadingConfig } from "@/blocks/heading";
import { IconConfig } from "@/blocks/icon";
import { ImageConfig } from "@/blocks/image";
import { LinkConfig } from "@/blocks/link";
import { TabsConfig } from "@/blocks/tabs";
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
]);
