import { getContent } from "@/store/selectors";
import { setContent as setBuilderContent } from "@/store/builder-slice";
import { useAppSelector } from "./use-app-selector";
import { Block } from "@/types/block";
import { useCallback } from "react";
import { useAppDispatch } from "./use-app-dispatch";

export const useContent = () => {
  const content = useAppSelector(getContent);

  const dispatch = useAppDispatch();

  const setContent = useCallback((newContent: Record<string, Block>) => {
    dispatch(setBuilderContent(newContent));
  }, []);

  return [content, setContent] as const;
};
