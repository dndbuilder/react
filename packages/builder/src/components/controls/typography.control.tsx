import { useSettings } from "@/hooks/use-settings";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { TypographyType, Unit } from "@/types/style";
import { FC, HTMLAttributes, useRef, useState } from "react";
import { classNames } from "@/utils";
import { SettingsType } from "@/types";
import Label from "../shared/label";
import Tooltip from "../shared/tooltip";
import Popover from "../shared/popover";
import { AiOutlineGlobal } from "react-icons/ai";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { CiEdit } from "react-icons/ci";
import Button from "../shared/button";
import { LuChevronsUpDown } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { ScrollArea } from "../shared/scroll-area";
import { BsCheck2 } from "react-icons/bs";
import SliderUnitControl from "./slider-unit.control";
import SelectControl from "./select.control";
import { generateUnitValue } from "@/utils/style";
import { FontConfiguration } from "@/config/fonts.config";

type Props = {
  type: SettingsType;
  fieldName: string;
  label?: string;
  showPresets?: boolean;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  // avoidCollisions?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const TypographyControl: FC<Props> = ({
  type,
  fieldName,
  label = "Typography",
  className,
  showPresets = true,
  side = "bottom",
  align = "end",
  // avoidCollisions = false,
}) => {
  const [typography, setTypography] = useSettings<TypographyType | undefined>(
    fieldName,
    type
  );
  const [presets] = useSettings<
    Array<{ id: string; name: string; value: TypographyType }>
  >("typography.presets", SettingsType.THEME);
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [searchText, setSearchText] = useState("");
  const [isTypographyOpen, setIsTypographyOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const globalPopoverContentRef = useRef<HTMLDivElement>(null);
  const customPopoverContentRef = useRef<HTMLDivElement>(null);

  const handleTypographyOpenChange = (open: boolean) => {
    setIsTypographyOpen(open);
    setSearchText("");
  };

  // const onOpenChange = (open: boolean, isGlobal: boolean) => {
  //   if (open) {
  //     setTimeout(() => {
  //       const panelScrollContent = document.querySelector<HTMLDivElement>('.panel-scroll-content');
  //       const closestScrollArea = panelScrollContent?.closest('.scroll-area');
  //       const scrollAreaViewport = closestScrollArea?.querySelector('[data-radix-scroll-area-viewport]');
  //       const controlPosition = rootRef?.current?.getBoundingClientRect().top;

  //       if (!controlPosition || !panelScrollContent || !closestScrollArea) return;

  //       const avilableSpace = window.innerHeight - controlPosition;

  //       const popoverHeight = isGlobal
  //         ? globalPopoverContentRef?.current?.clientHeight ?? 0
  //         : customPopoverContentRef?.current?.clientHeight ?? 0;

  //       if (popoverHeight > avilableSpace) {
  //         const missingHeight = popoverHeight - avilableSpace;
  //         panelScrollContent.style.height = `${closestScrollArea.clientHeight + missingHeight + 70}px`;

  //         scrollAreaViewport?.scrollTo({
  //           top: scrollAreaViewport.scrollHeight,
  //           behavior: 'smooth',
  //         });
  //       }
  //     }, 100);
  //   }
  // };

  const onOpenChange = (open: boolean) => {
    const panelScrollContent = document.querySelector<HTMLDivElement>(
      ".panel-scroll-content"
    );
    if (!panelScrollContent) return;
    if (open) {
      panelScrollContent.style.paddingBottom = "80vh";
    } else {
      panelScrollContent.style.paddingBottom = "0px";
    }
  };

  return (
    <div
      className={classNames("mt-4 flex items-center", className)}
      ref={rootRef}
    >
      {label && <Label className="grow">{label}</Label>}

      <ToggleGroup.Root className="inline-flex rounded-sm border" type="single">
        {showPresets && (
          <ToggleGroup.Item value="" className="border-r last:border-r-0">
            <Popover onOpenChange={(open: boolean) => onOpenChange(open)}>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Popover.Trigger asChild>
                    <div className="px-[10px] py-2">
                      <AiOutlineGlobal className="text-sm" />
                    </div>
                  </Popover.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Custom</Tooltip.Content>
              </Tooltip>
              <Popover.Content
                className="w-[260px] p-0"
                avoidCollisions={false}
                side={side}
                align={align}
                alignOffset={-35}
                ref={globalPopoverContentRef}
              >
                <p className="border-b px-5 py-3">Custom Fonts</p>
                {presets?.map((preset) => (
                  <div
                    onClick={() => {
                      setTypography({
                        presetId: preset.id,
                      });
                      setIsTypographyOpen(false);
                    }}
                    key={preset.id}
                    className="flex cursor-pointer items-center p-3 hover:bg-slate-50"
                  >
                    <BsCheck2
                      className={classNames(
                        "me-2 h-4 w-4",
                        typography?.presetId === preset.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <p
                      style={{
                        fontFamily: preset.value?.fontFamily?.desktop,
                        fontSize: generateUnitValue(
                          preset.value?.fontSize?.[currentBreakpoint]
                        ),
                        fontWeight:
                          preset.value?.fontWeight?.[currentBreakpoint],
                        textTransform:
                          preset.value?.textTransform?.[currentBreakpoint],
                        fontStyle: preset.value?.fontStyle?.[currentBreakpoint],
                        textDecoration:
                          preset.value?.textDecoration?.[currentBreakpoint],
                        lineHeight: generateUnitValue(
                          preset.value?.lineHeight?.[currentBreakpoint]
                        ),
                        letterSpacing: generateUnitValue(
                          preset.value?.letterSpacing?.[currentBreakpoint]
                        ),
                        wordSpacing: generateUnitValue(
                          preset.value?.wordSpacing?.[currentBreakpoint]
                        ),
                      }}
                    >
                      {preset.name}
                    </p>
                  </div>
                ))}

                <Popover.Arrow width={16} height={8} fill="white" />
              </Popover.Content>
            </Popover>
          </ToggleGroup.Item>
        )}

        <ToggleGroup.Item value="" className="border-r last:border-r-0">
          <Popover onOpenChange={(open: boolean) => onOpenChange(open)}>
            <Popover.Trigger asChild>
              <div className="px-[10px] py-2">
                <CiEdit />
              </div>
            </Popover.Trigger>

            <Popover.Content
              ref={customPopoverContentRef}
              className="w-[260px]"
              avoidCollisions={false}
              side={side}
              align={align}
            >
              <h3>Typography </h3>

              {/* Font Family */}
              <div className="mt-5 grid grid-cols-2 items-center gap-1.5">
                <Label>Family</Label>

                <Popover
                  open={isTypographyOpen}
                  onOpenChange={handleTypographyOpenChange}
                >
                  <Popover.Trigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between whitespace-nowrap border-dark-300"
                      >
                        {typography?.fontFamily?.desktop ?? "Select"}
                        <LuChevronsUpDown className="ms-2 h-4 shrink-0 opacity-50" />
                      </Button>
                    </div>
                  </Popover.Trigger>
                  <Popover.Content className="w-[200px] p-0">
                    <div className="flex items-center border-b">
                      <div className="ms-2.5 flex w-7 items-center justify-center">
                        <BiSearch className=" text-dark-500" size={18} />
                      </div>
                      <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        className="w-full border-0 px-1  focus:ring-0 placeholder:text-sm"
                        placeholder="Search..."
                      />
                    </div>

                    <div className="p-1">
                      <ScrollArea className="h-[200px]">
                        {Object.keys(FontConfiguration)
                          .filter((font) => {
                            if (searchText === "") return true;
                            return font
                              .toLowerCase()
                              .includes(searchText.toLowerCase());
                          })
                          .map((font) => (
                            <div
                              key={font}
                              className="flex items-center whitespace-nowrap rounded-sm p-2 text-xs font-normal text-dark-700 hover:bg-dark-100 "
                              onClick={() => {
                                setTypography({
                                  ...typography,
                                  fontFamily: {
                                    [currentBreakpoint]: font,
                                  },
                                });
                                setIsTypographyOpen(false);
                              }}
                            >
                              <BsCheck2
                                className={classNames(
                                  "me-2 h-4 w-4",
                                  typography?.fontFamily === font
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <p
                                className="text-sm"
                                style={{
                                  fontFamily: font,
                                }}
                              >
                                {font}
                              </p>
                            </div>
                          ))}
                      </ScrollArea>
                    </div>
                  </Popover.Content>
                </Popover>
              </div>

              {/* Size */}
              <SliderUnitControl
                responsive
                type={type}
                label="Size"
                fieldName={`${fieldName}.fontSize`}
                units={[Unit.PX, Unit.REM, Unit.EM]}
              />

              {/* Weight */}
              <SelectControl
                responsive
                fieldName={`${fieldName}.fontWeight`}
                type={type}
                label="Weight"
                options={[
                  { content: "100 (Thin)", value: "100" },
                  { content: "200 (Extra Light)", value: "200" },
                  { content: "300 (Light)", value: "300" },
                  { content: "400 (Normal)", value: "400" },
                  { content: "500 (Medium)", value: "500" },
                  { content: "600 (Semi Bold)", value: "600" },
                  { content: "700 (Bold)", value: "700" },
                  { content: "800 (Extra Bold)", value: "800" },
                  { content: "900 (Black)", value: "900" },
                  { content: "Default", value: "" },
                  { content: "Normal", value: "normal" },
                  { content: "Bold", value: "bold" },
                ]}
                className="mt-4"
              />

              {/* Transform */}
              <SelectControl
                responsive
                type={type}
                fieldName={`${fieldName}.textTransform`}
                label="Transform"
                options={[
                  { content: "Default", value: "" },
                  { content: "Uppercase", value: "uppercase" },
                  { content: "Lowercase", value: "lowercase" },
                  { content: "Capitalize", value: "capitalize" },
                  { content: "Normal", value: "none" },
                ]}
              />

              {/* Style */}
              <SelectControl
                responsive
                type={type}
                fieldName={`${fieldName}.fontStyle`}
                label="Style"
                options={[
                  { content: "Default", value: "" },
                  { content: "Normal", value: "normal" },
                  { content: "Italic", value: "italic" },
                  { content: "Oblique", value: "oblique" },
                ]}
              />

              {/* Decoration */}
              <SelectControl
                responsive
                type={type}
                fieldName={`${fieldName}.textDecoration`}
                label="Decoration"
                options={[
                  { content: "Default", value: "" },
                  { content: "Underline", value: "underline" },
                  { content: "Overline", value: "overline" },
                  { content: "Line Through", value: "line-through" },
                  { content: "None", value: "none" },
                ]}
              />

              {/* Line-Height */}
              <SliderUnitControl
                responsive
                type={type}
                label="Line Height"
                fieldName={`${fieldName}.lineHeight`}
                units={[Unit.PX, Unit.REM, Unit.EM]}
              />

              {/* Letter Spacing */}
              <SliderUnitControl
                responsive
                type={type}
                label="Letter Spacing"
                fieldName={`${fieldName}.letterSpacing`}
                units={[Unit.PX, Unit.REM, Unit.EM]}
              />

              {/* Word Spacing */}
              <SliderUnitControl
                responsive
                type={type}
                label="Word Spacing"
                fieldName={`${fieldName}.wordSpacing`}
                units={[Unit.PX, Unit.REM, Unit.EM]}
              />

              <Popover.Arrow width={16} height={8} fill="white" />
            </Popover.Content>
          </Popover>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
};

export default TypographyControl;
