"use client";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import {
  AlignItem,
  DisplayType,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  Unit,
} from "@/types/style";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { FC } from "react";
import { BsArrowBarRight } from "react-icons/bs";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { LuAlignCenter, LuAlignVerticalSpaceAround } from "react-icons/lu";
import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdFormatAlignCenter,
  MdOutlineAlignHorizontalCenter,
  MdOutlineAlignVerticalBottom,
  MdOutlineAlignVerticalTop,
  MdVerticalAlignCenter,
} from "react-icons/md";
import { PiArrowUUpRightLight } from "react-icons/pi";
import { FlexGapControl } from "./flex-gap.control";
import { SelectControl } from "./select.control";
import { ToggleGroupControl } from "./toggle-group.control";

export type DisplayControlProps = {
  type: SettingsType;
  fieldName?: string;
};

export const DisplayControl: FC<DisplayControlProps> = ({ type, fieldName = "display" }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const { 0: display } = useSettings<DisplayType | undefined>(
    `${fieldName}.value.${currentBreakpoint}`,
    type
  );

  const { 0: flexDirection } = useSettings<FlexDirection | undefined>(
    `${fieldName}.flexDirection.${currentBreakpoint}`,
    type
  );

  return (
    <div>
      <SelectControl
        type={type}
        fieldName={`${fieldName}.value`}
        label="Display"
        responsive
        options={[
          { content: "Block", value: DisplayType.BLOCK },
          { content: "Inline", value: DisplayType.INLINE },
          { content: "Inline Block", value: DisplayType.INLINE_BLOCK },
          { content: "Flex", value: DisplayType.FLEX },
          { content: "Inline Flex", value: DisplayType.INLINE_FLEX },
          { content: "None", value: DisplayType.NONE },
        ]}
      />
      {display && [DisplayType.FLEX, DisplayType.INLINE_FLEX].includes(display) && (
        <div>
          {/* <Direction /> */}
          <ToggleGroupControl
            fieldName={`${fieldName}.flexDirection`}
            label="Direction"
            responsive
            type={type}
            controls={[
              {
                tooltipContent: "Row - horizontal",
                toggleTrigger: <HiOutlineArrowNarrowRight className="text-sm" />,
                value: FlexDirection.ROW,
              },
              {
                tooltipContent: "Column - vertical",
                toggleTrigger: <HiOutlineArrowNarrowDown className="text-sm" />,
                value: FlexDirection.COLUMN,
              },
              {
                tooltipContent: "Row Reverse",
                toggleTrigger: <HiOutlineArrowNarrowLeft className="text-sm" />,
                value: FlexDirection.ROW_REVERSE,
              },
              {
                tooltipContent: "Column - Reversed",
                toggleTrigger: <HiOutlineArrowNarrowUp className="text-sm" />,
                value: FlexDirection.COLUMN_REVERSE,
              },
            ]}
          />

          {/* Justify Content */}
          <ToggleGroupControl
            type={type}
            fieldName={`${fieldName}.justifyContent`}
            responsive
            label="Justify Content"
            direction={"col"}
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: (
                  <MdAlignHorizontalLeft
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-90": flexDirection === FlexDirection.COLUMN,
                      "rotate-180": flexDirection === FlexDirection.ROW_REVERSE,
                      "-rotate-90": flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.START,
              },
              {
                tooltipContent: "Center",
                toggleTrigger: (
                  <MdOutlineAlignHorizontalCenter
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-90":
                        flexDirection === FlexDirection.COLUMN ||
                        flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.CENTER,
              },
              {
                tooltipContent: "End",
                toggleTrigger: (
                  <MdAlignHorizontalRight
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-90": flexDirection === FlexDirection.COLUMN,
                      "rotate-180": flexDirection === FlexDirection.ROW_REVERSE,
                      "-rotate-90": flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.END,
              },
              {
                tooltipContent: "Space Between",
                toggleTrigger: (
                  <LuAlignVerticalSpaceAround
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-0": flexDirection === FlexDirection.COLUMN,
                      "rotate-90":
                        flexDirection === FlexDirection.ROW ||
                        flexDirection === FlexDirection.ROW_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.SPACE_BETWEEN,
              },
              {
                tooltipContent: "Space Around",
                toggleTrigger: (
                  <MdFormatAlignCenter
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-0": flexDirection === FlexDirection.COLUMN,
                      "rotate-90":
                        flexDirection === FlexDirection.ROW ||
                        flexDirection === FlexDirection.ROW_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.SPACE_AROUND,
              },
              {
                tooltipContent: "Space Evently",
                toggleTrigger: (
                  <LuAlignCenter
                    className={classNames("text-sm transition-transform duration-200", {
                      "rotate-0": flexDirection === FlexDirection.COLUMN,
                      "rotate-90":
                        flexDirection === FlexDirection.ROW ||
                        flexDirection === FlexDirection.ROW_REVERSE,
                    })}
                  />
                ),
                value: JustifyContent.SPACE_EVENTLY,
              },
            ]}
          />

          {/* <Align Items /> */}
          <ToggleGroupControl
            fieldName={`${fieldName}.alignItems`}
            label="Align Items"
            responsive
            type={type}
            controls={[
              {
                tooltipContent: "Start",
                toggleTrigger: (
                  <MdOutlineAlignVerticalTop
                    className={classNames("text-sm transition-transform duration-200", {
                      "-rotate-90":
                        flexDirection === FlexDirection.COLUMN ||
                        flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: AlignItem.START,
              },
              {
                tooltipContent: "Center",
                toggleTrigger: (
                  <MdVerticalAlignCenter
                    className={classNames("text-sm transition-transform duration-200", {
                      "-rotate-90":
                        flexDirection === FlexDirection.COLUMN ||
                        flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: AlignItem.CENTER,
              },
              {
                tooltipContent: "End",
                toggleTrigger: (
                  <MdOutlineAlignVerticalBottom
                    className={classNames("text-sm transition-transform duration-200", {
                      "-rotate-90":
                        flexDirection === FlexDirection.COLUMN ||
                        flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: AlignItem.END,
              },
              {
                tooltipContent: "Stretch",
                toggleTrigger: (
                  <LuAlignCenter
                    className={classNames("text-sm transition-transform duration-200", {
                      "-rotate-90":
                        flexDirection === FlexDirection.COLUMN ||
                        flexDirection === FlexDirection.COLUMN_REVERSE,
                    })}
                  />
                ),
                value: AlignItem.STRETCH,
              },
            ]}
          />

          {/* Wrap */}
          <ToggleGroupControl
            fieldName={`${fieldName}.flexWrap`}
            label="Wrap"
            responsive
            type={type}
            controls={[
              {
                tooltipContent: "No Wrap",
                toggleTrigger: <BsArrowBarRight className="text-sm" />,
                value: FlexWrap.NOWRAP,
              },
              {
                tooltipContent: "Wrap",
                toggleTrigger: <PiArrowUUpRightLight className="rotate-180 text-sm" />,
                value: FlexWrap.WRAP,
              },
            ]}
          />

          {/* Gap between elements */}
          <FlexGapControl
            responsive
            label="Gaps"
            fieldName={`${fieldName}.gap`}
            type={type}
            min={0}
            units={[Unit.PX, Unit.EM, Unit.REM, Unit.VW]}
          />
        </div>
      )}
    </div>
  );
};
