"use client";

import { FlexGapControl } from "@/components/controls/flex-gap.control";
import { SelectControl } from "@/components/controls/select.control";
import { SliderUnitControl } from "@/components/controls/slider-unit.control";
import { ToggleGroupControl } from "@/components/controls/toggle-group.control";
import { Accordion } from "@/components/shared/accordion";
import { InfoMessage } from "@/components/shared/info-message";
import { Separator } from "@/components/shared/separator";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import {
  AlignItem,
  FlexDirection,
  FlexDirection as FlexDirectionType,
  FlexWrap as FlexWrapType,
  JustifyContent,
  Unit,
} from "@/types/style";
import { classNames } from "@/utils";
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

enum AccordionGroup {
  CONTAINER = "Container",
  ADDITIONAL = "Additional",
}

const ContainerLayoutControl = () => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [flexDirection] = useSettings<FlexDirection>(
    `flexDirection.${currentBreakpoint}`,
    SettingsType.BLOCK
  );

  return (
    <Accordion
      defaultValue={AccordionGroup.CONTAINER}
      type="single"
      collapsible
      className="mt-0 w-full"
    >
      <Accordion.Item value={AccordionGroup.CONTAINER}>
        <Accordion.Trigger className="p-4">Container</Accordion.Trigger>
        <Accordion.Content className="mt-0 px-4 py-1">
          {/* Width */}
          <SliderUnitControl
            fieldName="width"
            label="Width"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM, Unit.VW]}
            responsive
            type={SettingsType.BLOCK}
            className="mt-0"
          />

          {/* Max Width */}
          <SliderUnitControl
            fieldName="maxWidth"
            label="Max Width"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM, Unit.VW]}
            responsive
            type={SettingsType.BLOCK}
          />

          {/* Min Height */}
          <SliderUnitControl
            responsive
            fieldName="minHeight"
            label="Min Height"
            units={[Unit.PX, Unit.PERCENTAGE, Unit.EM, Unit.REM, Unit.VH]}
            type={SettingsType.BLOCK}
          />

          <Separator className="my-4" />

          {/* <Direction /> */}
          <ToggleGroupControl
            fieldName="flexDirection"
            label="Direction"
            responsive
            type={SettingsType.BLOCK}
            controls={[
              {
                tooltipContent: "Row - horizontal",
                toggleTrigger: <HiOutlineArrowNarrowRight className="text-sm" />,
                value: FlexDirectionType.ROW,
              },
              {
                tooltipContent: "Column - vertical",
                toggleTrigger: <HiOutlineArrowNarrowDown className="text-sm" />,
                value: FlexDirectionType.COLUMN,
              },
              {
                tooltipContent: "Row Reverse",
                toggleTrigger: <HiOutlineArrowNarrowLeft className="text-sm" />,
                value: FlexDirectionType.ROW_REVERSE,
              },
              {
                tooltipContent: "Column - Reversed",
                toggleTrigger: <HiOutlineArrowNarrowUp className="text-sm" />,
                value: FlexDirectionType.COLUMN_REVERSE,
              },
            ]}
          />

          {/* Justify Content */}
          <ToggleGroupControl
            type={SettingsType.BLOCK}
            fieldName="justifyContent"
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
            fieldName="alignItems"
            label="Align Items"
            responsive
            type={SettingsType.BLOCK}
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

          {/* Gap between elements */}
          <FlexGapControl
            responsive
            label="Gaps"
            fieldName="gap"
            type={SettingsType.BLOCK}
            min={0}
            units={[Unit.PX, Unit.EM, Unit.REM, Unit.VW]}
          />

          {/* Wrap */}
          <ToggleGroupControl
            fieldName="wrap"
            label="Wrap"
            responsive
            type={SettingsType.BLOCK}
            controls={[
              {
                tooltipContent: "No Wrap",
                toggleTrigger: <BsArrowBarRight className="text-sm" />,
                value: FlexWrapType.NOWRAP,
              },
              {
                tooltipContent: "Wrap",
                toggleTrigger: <PiArrowUUpRightLight className="rotate-180 text-sm" />,
                value: FlexWrapType.WRAP,
              },
            ]}
          />
          <InfoMessage>
            Items within the container can stay in a single line (No wrap), or break into multiple
            lines (Wrap).
          </InfoMessage>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value={AccordionGroup.ADDITIONAL}>
        <Accordion.Trigger className="p-4">Additional Options</Accordion.Trigger>
        <Accordion.Content className="px-4">
          <SelectControl
            fieldName="overflow.desktop"
            label="Overflow"
            className="mt-0"
            options={[
              { content: "Hidden", value: "hidden" },
              { content: "Auto", value: "auto" },
              { content: "Scroll", value: "scroll" },
              { content: "Visible", value: "visible" },
            ]}
            type={SettingsType.BLOCK}
          />

          <SelectControl
            fieldName="HtmlTag"
            label="HTML Tag"
            type={SettingsType.BLOCK}
            options={[
              { content: "div", value: "div" },
              { content: "header", value: "header" },
              { content: "footer", value: "footer" },
              { content: "main", value: "main" },
              { content: "article", value: "article" },
              { content: "section", value: "section" },
              { content: "aside", value: "aside" },
              { content: "nav", value: "nav" },
              { content: "a", value: "a" },
            ]}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default ContainerLayoutControl;
