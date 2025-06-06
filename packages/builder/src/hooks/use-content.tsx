import { getContent } from "@/store/selectors";
import { useAppSelector } from "./use-app-selector";

export const useContent = () => {
  return useAppSelector(getContent);
};
