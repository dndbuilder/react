import { useAppSelector } from "@/hooks/use-app-selector";
import { BuilderConfiguration } from "@/config/builder.config";
import { BlockAdvancedSettings, BlockType, BlockConfig } from "@/types/block";
import { getActiveThemeContainerSettings } from "@/store/selectors";
import { ContainerSettingsType } from "@/blocks/container/types";
import deepmerge from "deepmerge";

export const useContainerSettings = () => {
  const ContainerConfig = BuilderConfiguration.getBlock(BlockType.CONTAINER);

  const themeContainerSettings = useAppSelector(getActiveThemeContainerSettings);

  const settings: ContainerSettingsType = {
    ...ContainerConfig.settings,
    width: deepmerge(ContainerConfig.settings.width ?? {}, themeContainerSettings?.width ?? {}),
    maxWidth: deepmerge(
      ContainerConfig.settings.maxWidth ?? {},
      themeContainerSettings?.maxWidth ?? {}
    ),
    gap: deepmerge(ContainerConfig.settings.gap ?? {}, themeContainerSettings?.gap ?? {}),
  };

  const advancedSettings: BlockAdvancedSettings = {
    ...ContainerConfig.advancedSettings,
    padding: deepmerge(
      ContainerConfig.advancedSettings?.padding ?? {},
      themeContainerSettings?.padding ?? {}
    ),
  };

  return { settings, advancedSettings };
};
