import {
  setSelectedBlockAdvancedSettingsValueByKey,
  setSelectedBlockSettingsValueByKey,
} from "@/store/builder-slice";
import { getSettingsValueByKey } from "@/store/selectors";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { SettingsType } from "@/types";
import { setActiveThemeSettingsValueByKey } from "@/store/theme-slice";

export const useSettings = <T = unknown>(key: string, type: SettingsType) => {
  const settings = useAppSelector(getSettingsValueByKey<T>(key, type));
  const dispatch = useAppDispatch();

  const setSettings = (valueOrCallback: T | ((currentValue: T) => T)) => {
    const newValue =
      typeof valueOrCallback === "function"
        ? (valueOrCallback as (currentValue: T) => T)(settings)
        : valueOrCallback;

    if (type === "block") {
      dispatch(setSelectedBlockSettingsValueByKey([{ key, value: newValue }]));
      return;
    }

    if (type === "advanced") {
      dispatch(setSelectedBlockAdvancedSettingsValueByKey([{ key, value: newValue }]));
      return;
    }

    dispatch(setActiveThemeSettingsValueByKey([{ key, value: newValue }]));
  };

  return [settings, setSettings] as const;
};
