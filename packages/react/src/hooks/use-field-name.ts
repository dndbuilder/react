import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint, getCurrentLocale } from "../store/selectors";

type Option = {
  key: string;
  responsive?: boolean;
  mode?: string;
  isLocalized?: boolean;
};

export const useFieldName = (option: Option) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const currentLocale = useAppSelector(getCurrentLocale);

  const fieldName = option.key;

  if (option.responsive) {
    return `${fieldName}.${currentBreakpoint}`;
  }

  if (option.mode) {
    return `${fieldName}.${option.mode}`;
  }

  if (option.isLocalized) {
    return `${fieldName}.${currentLocale}`;
  }

  return fieldName;
};
