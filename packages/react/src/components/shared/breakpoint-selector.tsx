"use client";

import { Select } from "@/components/shared/select";
import { Tooltip } from "@/components/shared/tooltip";
import { setCurrentBreakpoint } from "@/store/builder-slice";
import { getCurrentBreakpoint } from "@/store/selectors";
import { Breakpoint } from "@/types/responsive";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC } from "react";
import { FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";

export interface BreakpointSelectorProps {
  className?: string;
}

export const BreakpointSelector: FC<BreakpointSelectorProps> = ({ className }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const dispatch = useAppDispatch();

  return (
    <Select
      onValueChange={(val: Breakpoint) => {
        dispatch(setCurrentBreakpoint(val));
      }}
      value={currentBreakpoint}
      defaultValue={Breakpoint.DESKTOP}
    >
      <Select.Trigger
        className={classNames("h-3 w-7 border-0 p-1 focus:ring-0 focus:ring-offset-0", className)}
        chevronDown={false}
      >
        {currentBreakpoint === Breakpoint.DESKTOP && (
          <Tooltip>
            <Tooltip.Trigger asChild>
              <span>
                <FiMonitor className="text-slate-500" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Desktop</Tooltip.Content>
          </Tooltip>
        )}

        {currentBreakpoint === Breakpoint.TABLET && (
          <Tooltip>
            <Tooltip.Trigger asChild>
              <span>
                <FaTabletAlt className="text-slate-500" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Tablet</Tooltip.Content>
          </Tooltip>
        )}

        {currentBreakpoint === Breakpoint.MOBILE && (
          <Tooltip>
            <Tooltip.Trigger asChild>
              <span>
                <FaMobileAlt className="text-slate-500" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Mobile</Tooltip.Content>
          </Tooltip>
        )}
      </Select.Trigger>

      <Select.Content alignOffset={0} sideOffset={-23} className="min-w-[30px] border-0">
        <Select.Group>
          <Select.Item
            className="flex justify-center px-0 py-1.5"
            value={Breakpoint.DESKTOP}
            showCheck={false}
          >
            <Tooltip>
              <Tooltip.Trigger className="px-1">
                <FiMonitor
                  className={classNames("text-slate-500", {
                    "text-slate-800": currentBreakpoint === Breakpoint.DESKTOP,
                  })}
                />
              </Tooltip.Trigger>
              <Tooltip.Content side="right">Desktop</Tooltip.Content>
            </Tooltip>
          </Select.Item>
          <Select.Item
            className="flex justify-center px-0 py-1.5"
            value={Breakpoint.TABLET}
            showCheck={false}
          >
            <Tooltip>
              <Tooltip.Trigger className="px-1">
                <FaTabletAlt
                  className={classNames("text-slate-500", {
                    "text-slate-800": currentBreakpoint === Breakpoint.TABLET,
                  })}
                />
              </Tooltip.Trigger>
              <Tooltip.Content side="right">Tablet</Tooltip.Content>
            </Tooltip>
          </Select.Item>
          <Select.Item
            className="flex justify-center px-0 py-1.5"
            value={Breakpoint.MOBILE}
            showCheck={false}
          >
            <Tooltip>
              <Tooltip.Trigger className="px-1">
                <FaMobileAlt
                  className={classNames("text-slate-500", {
                    "text-slate-800": currentBreakpoint === Breakpoint.MOBILE,
                  })}
                />
              </Tooltip.Trigger>
              <Tooltip.Content side="right">Mobile</Tooltip.Content>
            </Tooltip>
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  );
};
