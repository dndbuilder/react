import { RootState } from "./index";
import { SettingsType } from "../types";
import { AnyObject } from "../types";
import { Block } from "../types/block";
import { createSelector } from "@reduxjs/toolkit";
import objectPath from "object-path";

// Builder
export const getContentRoot = (state: RootState) => state.builder.present.content["root"];

export const getContent = (state: RootState) => state.builder.present.content;

export const getBlock =
  <T extends object = AnyObject>(id: Block["id"]) =>
  (state: RootState) =>
    state.builder.present.content[id] as Block<T>;

export const getBlocks = (ids: Block["id"][]) => (state: RootState) =>
  ids.map((id) => state.builder.present.content[id]);

export const getBlockSettings =
  <T extends object = AnyObject>(id: Block["id"]) =>
  (state: RootState) =>
    state.builder.present.content[id].settings as T;

export const getBlockSettingsValueByKey =
  <T = unknown>(id: Block["id"], key: string) =>
  (state: RootState) => {
    const settingKey = key
      .replace("{{BREAKPOINT}}", state.builder.present.currentBreakpoint)
      .replace("{{LOCALE}}", state.builder.present.currentLocale);
    return objectPath.get(state.builder.present.content[id], `settings.${settingKey}`) as T;
  };

export const getBlockAdvancedSettings =
  <T extends object = AnyObject>(id: Block["id"]) =>
  (state: RootState) =>
    state.builder.present.content[id].advancedSettings as T;

export const getBlockAdvancedSettingsValueByKey =
  <T = unknown>(id: Block["id"], key: string) =>
  (state: RootState) => {
    const settingKey = key.replace("{{BREAKPOINT}}", state.builder.present.currentBreakpoint);
    return objectPath.get(state.builder.present.content[id], `advancedSettings.${settingKey}`) as T;
  };

export const getSelectedBlock = <T extends object = AnyObject>(state: RootState) => {
  if (!state.builder.present.selectedBlockId) {
    return null;
  }

  return state.builder.present.content[state.builder.present.selectedBlockId] as Block<T>;
};

export const getSelectedBlockId = (state: RootState) => state.builder.present.selectedBlockId;

export const getIsAnyChildSelected = (id: Block["id"]) => (state: RootState) => {
  const isAnyChildSelected = (blockId: Block["id"]): boolean => {
    return state.builder.present.content[blockId].children.some((childId) => {
      if (state.builder.present.selectedBlockId === childId) {
        return true;
      }
      return isAnyChildSelected(childId as string);
    });
  };

  return isAnyChildSelected(id);
};

export const getBlockIndex = (id: Block["id"]) => (state: RootState) => {
  const parentBlock = state.builder.present.content[state.builder.present.content[id].parentId];
  return parentBlock.children.indexOf(id);
};

export const getIsBlockSelected = (id: Block["id"]) => (state: RootState) =>
  state.builder.present.selectedBlockId === id;

// Get current breakpoint
export const getCurrentBreakpoint = (state: RootState) => state.builder.present.currentBreakpoint;

// Get current language
export const getCurrentLocale = (state: RootState) => state.builder.present.currentLocale;

// Theme
export const getActiveTheme = (state: RootState) => state.theme.activeTheme;

export const getActiveThemeId = (state: RootState) => state.theme.activeTheme.id;

export const getActiveThemeSettings = (state: RootState) => state.theme.activeTheme.settings;

export const getActiveThemeContainerSettings = createSelector(
  getActiveThemeSettings,
  (settings) => {
    return settings.layout?.container || {};
  }
);

export const getActiveThemeColorSettings = createSelector(getActiveThemeSettings, (settings) => {
  return settings.color || {};
});

export const getActiveThemeSettingsValueByKey =
  <T = unknown>(key: string) =>
  (state: RootState) => {
    return objectPath.get(state.theme.activeTheme.settings, key) as T;
  };

export const getActiveThemeColorPresets = createSelector(getActiveThemeSettings, (settings) => {
  return settings.color.presets;
});

export const getActiveThemeTypographyPresets = createSelector(
  getActiveThemeSettings,
  (settings) => {
    return settings.typography.presets;
  }
);

export const getActiveThemeButtonPresets = createSelector(getActiveThemeSettings, (settings) => {
  return settings.button.presets;
});

// Get settings
export const getSettings =
  <T extends object = AnyObject>(type: "block" | "advanced" | "theme") =>
  (state: RootState) => {
    if (type === "block" || type === "advanced") {
      const selectedBlockId = state.builder.present.selectedBlockId;

      if (!selectedBlockId) {
        throw new Error("No block selected");
      }

      if (type === "block") {
        return state.builder.present.content[selectedBlockId].settings as T;
      }

      return state.builder.present.content[selectedBlockId].advancedSettings as T;
    }

    return state.theme.activeTheme.settings as T;
  };

// Get settings value by key
export const getSettingsValueByKey = <T = unknown>(key: string, type: SettingsType) => {
  return (state: RootState) => {
    if (type === "block" || type === "advanced") {
      const selectedBlockId = state.builder.present.selectedBlockId;

      if (!selectedBlockId) {
        throw new Error("No block selected");
      }

      const settingKey = key.replace("{{BREAKPOINT}}", state.builder.present.currentBreakpoint);

      if (type === "block") {
        return objectPath.get(
          state.builder.present.content[selectedBlockId],
          `settings.${settingKey}`
        ) as T;
      }

      return objectPath.get(
        state.builder.present.content[selectedBlockId],
        `advancedSettings.${settingKey}`
      ) as T;
    }

    return objectPath.get(state.theme.activeTheme.settings, key) as T;
  };
};

// Get children of a block recursively
export const loadBlockChildren =
  (id: Block["id"]) =>
  (state: RootState): any => {
    const children = state.builder.present.content[id].children;
    const childrenBlocks = (children as string[]).map((childId) => {
      return {
        ...state.builder.present.content[childId],
        children: loadBlockChildren(childId)(state),
      };
    });

    return childrenBlocks;
  };
