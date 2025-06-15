import { Tooltip } from "@/components/shared/tooltip";
import { setCurrentBreakpoint } from "@/store/builder-slice";
import { getCurrentBreakpoint } from "@/store/selectors";
import { Breakpoint } from "@/types/responsive";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC } from "react";
import { BuilderConfiguration } from "@/config/editor.config";

type BreakpointSwitcherProps = {
  className?: string;
};

const BreakpointSwitch: FC<BreakpointSwitcherProps> = ({ className }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);

  const dispatch = useAppDispatch();

  const breakpoints = BuilderConfiguration.getBreakpoints();

  const changeBreakpoint = (val: Breakpoint) => {
    dispatch(setCurrentBreakpoint(val));
  };

  return (
    <div
      className={classNames(
        "flex items-center rounded-sm bg-slate-800 px-2 h-10",
        className
      )}
    >
      {breakpoints.map((breakpoint) => {
        return (
          <Tooltip key={breakpoint.key}>
            <Tooltip.Trigger>
              <div
                onClick={() => changeBreakpoint(breakpoint.key)}
                className={classNames(
                  "cursor-pointer p-2 text-slate-100 hover:text-indigo-400",
                  {
                    "text-indigo-400": currentBreakpoint === breakpoint.key,
                  }
                )}
              >
                {<breakpoint.icon />}
              </div>
              <Tooltip.Content>{breakpoint.label}</Tooltip.Content>
            </Tooltip.Trigger>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default BreakpointSwitch;
