import { Theme } from "../types/theme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import objectPath from "object-path";
import { ThemeConfiguration } from "../config/theme.config";

export interface ThemeState {
  activeTheme: Theme;
}

const initialState: ThemeState = {
  activeTheme: {
    id: "default",
    name: "Default",
    settings: ThemeConfiguration.settings,
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setActiveTheme: (state: ThemeState, action: PayloadAction<Theme>) => {
      state.activeTheme = action.payload;
    },
    setActiveThemeSettings: (state: ThemeState, action: PayloadAction<Theme["settings"]>) => {
      state.activeTheme.settings = action.payload;
    },
    setActiveThemeSettingsValueByKey: (
      state: ThemeState,
      action: PayloadAction<Array<{ key: string; value: unknown }>>
    ) => {
      action.payload.forEach(({ key, value }) => {
        objectPath.set(state.activeTheme.settings, key, value);
      });
    },
  },
});

export const { setActiveTheme, setActiveThemeSettings, setActiveThemeSettingsValueByKey } =
  themeSlice.actions;
