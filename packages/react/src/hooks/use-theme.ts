import { getActiveTheme } from "@/store/selectors";
import { setActiveTheme } from "@/store/theme-slice";
import { Theme } from "@/types/theme";
import { useCallback } from "react";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";

export const useTheme = () => {
  const theme = useAppSelector(getActiveTheme);

  const dispatch = useAppDispatch();

  const setTheme = useCallback(
    (theme: Theme) => {
      dispatch(setActiveTheme(theme));
    },
    [dispatch, setActiveTheme]
  );

  return [theme, setTheme] as const;
};
