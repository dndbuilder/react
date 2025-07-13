"use client";
import { Tooltip } from "@/components/shared/tooltip";
import { setCurrentBreakpoint } from "@/store/builder-slice";
import { getCurrentBreakpoint } from "@/store/selectors";
import { Breakpoint } from "@/types/responsive";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC } from "react";
import { BuilderConfiguration } from "@/config/builder.config";

export type BreakpointSwitcherProps = {
  className?: string;
};

export const BreakpointSwitch: FC<BreakpointSwitcherProps> = ({ className }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);

  const dispatch = useAppDispatch();

  const breakpoints = BuilderConfiguration.getBreakpoints();

  const changeBreakpoint = (val: Breakpoint) => {
    dispatch(setCurrentBreakpoint(val));
  };

  return (
    <div
      className={classNames(
        "flex h-10 items-center rounded-sm px-2 text-lg ring-1 ring-inset ring-gray-300 transition-colors duration-150 hover:bg-gray-100 hover:ring-gray-600",
        className
      )}
    >
      {breakpoints.map((breakpoint) => {
        return (
          <Tooltip key={breakpoint.key}>
            <Tooltip.Trigger asChild>
              <div
                onClick={() => changeBreakpoint(breakpoint.key)}
                className={classNames("cursor-pointer p-2 text-gray-400 hover:text-gray-800", {
                  "text-gray-800": currentBreakpoint === breakpoint.key,
                })}
              >
                {<breakpoint.icon />}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{breakpoint.label}</Tooltip.Content>
          </Tooltip>
        );
      })}
    </div>
  );
};
