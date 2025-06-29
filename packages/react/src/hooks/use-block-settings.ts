import { setBlockSettingsValueByKey } from "@/store/builder-slice";
import { getBlockSettingsValueByKey } from "@/store/selectors";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";

export const useBlockSettings = <T = unknown>(blockId: string, key: string) => {
  const settings = useAppSelector(getBlockSettingsValueByKey<T>(blockId, key));

  const dispatch = useAppDispatch();

  const setSettings = (valueOrCallback: T | ((currentValue: T) => T)) => {
    const value =
      typeof valueOrCallback === "function"
        ? (valueOrCallback as (currentValue: T) => T)(settings)
        : valueOrCallback;

    dispatch(setBlockSettingsValueByKey({ id: blockId, values: [{ key, value }] }));
  };

  return [settings, setSettings] as const;
};
