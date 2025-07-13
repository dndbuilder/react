import { getActiveThemeSettings } from "@/store/selectors";
import { useAppSelector } from "./use-app-selector";
import { useAppDispatch } from "./use-app-dispatch";
import { useCallback } from "react";
import { setActiveThemeSettings } from "@/store/theme-slice";
import { ThemeSettings } from "@/types";

export const useThemeSettings = () => {
  const settings = useAppSelector(getActiveThemeSettings);

  const dispatch = useAppDispatch();

  const setSettings = useCallback(
    (newSettings: ThemeSettings) => {
      dispatch(setActiveThemeSettings(settings));
    },
    [settings, dispatch, setActiveThemeSettings, useAppDispatch, useAppSelector]
  );

  return [settings, setSettings] as const;
};
