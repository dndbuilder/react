import { BackgroundControl } from "@/components/controls/background.control";
import { ColorControl } from "@/components/controls/color.control";
import { InputControl } from "@/components/controls/input.control";
import { LinkControl } from "@/components/controls/link.control";
import { TextareaControl } from "@/components/controls/textarea.control";
import { Button } from "@/components/shared/button";
import { Label } from "@/components/shared/label";
import { Tabs } from "@/components/shared/tabs";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentLocale } from "@/store/selectors";
import { SettingsType } from "@/types";
import { PseudoClass } from "@/types/style";
import { createId } from "@/utils";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { arrayMoveImmutable } from "array-move";
import { cloneDeep } from "lodash";
import { useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import { BiGridVertical } from "react-icons/bi";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { SliderSettingsType } from "../../types";
import SlideHorizontalPosition from "./slide-horizontal-position.control";
import SlideOverlayBlendControl from "./slide-overlay-blend.control";
import SlideOverlayColorControl from "./slide-overlay-color.control";
import SlideOverlayControl from "./slide-overlay.control";
import SlideTextAlignControl from "./slide-text-align.control";
import SlideVerticalPosition from "./slide-vertical-position.control";

enum SlideTabType {
  BACKGROUND = "Background",
  CONTENT = "Content",
  STYLE = "Style",
}

const SlidesControl = () => {
  const currentLocale = useAppSelector(getCurrentLocale);
  const [slides, setSlides] = useSettings<SliderSettingsType["slides"]>(
    "slides",
    SettingsType.BLOCK
  );
  const [activeSlide, setActiveSlide] = useState<string>("");

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setSlides(arrayMoveImmutable(slides ?? [], oldIndex, newIndex));
  };

  const getTitle = (title: string | undefined, index: number) => {
    const text = title?.replace(/(<([^>]+)>)/gi, "").trim();
    return text ? text : `Item #${index + 1}`;
  };

  return (
    <div>
      <SortableList onSortEnd={onSortEnd} lockAxis="y">
        {slides?.map((slide, index) => (
          <div key={slide.id} className="mb-1.5">
            <SortableItem key={slide.id}>
              <div className="z-[99] bg-[#F8F9F8] px-2">
                <div className="flex min-h-[40px] items-center">
                  <button className={"me-1 cursor-move"}>
                    <BiGridVertical size={14} color={"#828282"} />
                  </button>

                  <Label
                    onClick={() => {
                      setActiveSlide((prevState) => (prevState === slide.id ? "" : slide.id));
                    }}
                    className="flex h-full flex-1 cursor-pointer items-center py-1 text-xs hover:bg-slate-50"
                  >
                    {getTitle(slide.title?.[currentLocale] || slide.title?.en, index)}
                  </Label>

                  <div
                    onClick={() => {
                      // Copy the current slide next to the current slide
                      const newSlides = cloneDeep(slides) ?? [];
                      newSlides.splice(index + 1, 0, {
                        ...slide,
                        id: createId(),
                      });
                      setSlides(newSlides);
                    }}
                    className="me-1.5 flex h-full cursor-pointer items-center justify-center hover:bg-slate-50"
                  >
                    <FaRegCopy />
                  </div>
                  <div
                    // delete the current slide
                    onClick={() => {
                      const newSlides = cloneDeep(slides) ?? [];
                      newSlides.splice(index, 1);
                      setSlides(newSlides);
                    }}
                    className="flex h-full cursor-pointer items-center justify-center hover:bg-slate-50"
                  >
                    <BsTrash />
                  </div>
                </div>
              </div>
            </SortableItem>
            <div
              className={classNames(
                "grid grid-rows-[0fr] overflow-hidden bg-[#F8F9F8] transition-[grid-template-rows] duration-200",
                {
                  "grid-rows-[1fr]": activeSlide === slide.id,
                }
              )}
            >
              <div
                className={classNames(
                  "min-h-0 px-3 transition-[padding-top,padding-bottom] duration-200",
                  {
                    "h-auto pb-3": activeSlide === slide.id,
                  }
                )}
              >
                <Tabs defaultValue={SlideTabType.BACKGROUND}>
                  <Tabs.List className="h-8 w-full rounded-full">
                    <Tabs.Trigger
                      className="flex-1 rounded-full p-[3px] text-[11px]"
                      value={SlideTabType.BACKGROUND}
                    >
                      {SlideTabType.BACKGROUND}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="flex-1 rounded-full p-[3px] text-[11px]"
                      value={SlideTabType.CONTENT}
                    >
                      {SlideTabType.CONTENT}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="flex-1 rounded-full p-[3px] text-[11px]"
                      value={SlideTabType.STYLE}
                    >
                      {SlideTabType.STYLE}
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value={SlideTabType.BACKGROUND}>
                    <BackgroundControl
                      fieldName={`slides.${index}.background`}
                      type={SettingsType.BLOCK}
                      mode={PseudoClass.DEFAULT}
                    />

                    <SlideOverlayControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.showBgOverlay.desktop`}
                      mediaField={`slides.${index}.backgroundImage`}
                    />
                    <SlideOverlayColorControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.overlayColor`}
                      overlayField={`slides.${index}.showBgOverlay.desktop`}
                    />
                    <SlideOverlayBlendControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.blendMode.desktop`}
                      overlayField={`slides.${index}.showBgOverlay.desktop`}
                    />
                  </Tabs.Content>

                  <Tabs.Content value={SlideTabType.CONTENT}>
                    <InputControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.title`}
                      label="Title"
                      direction={"col"}
                      isLocalized
                    />
                    <TextareaControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.description`}
                      label="Description"
                      isLocalized
                    />
                    <InputControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.button.text`}
                      label="Button Text"
                      direction={"col"}
                      isLocalized
                    />
                    <LinkControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.button.link`}
                    />
                  </Tabs.Content>

                  <Tabs.Content value={SlideTabType.STYLE}>
                    <SlideHorizontalPosition
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.horizontalPosition.desktop`}
                    />
                    <SlideVerticalPosition
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.verticalPosition.desktop`}
                    />
                    <SlideTextAlignControl
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.textAlign.desktop`}
                    />
                    <ColorControl
                      label="Content Color"
                      type={SettingsType.BLOCK}
                      fieldName={`slides.${index}.contentColor.default`}
                    />
                  </Tabs.Content>
                </Tabs>
              </div>
            </div>
          </div>
        ))}
      </SortableList>

      <div className="mt-5 flex justify-center">
        <Button
          onClick={() => {
            const newSlides = cloneDeep(slides) ?? [];
            const id = createId();
            newSlides.push({
              id,
              title: {
                en: `Item #${newSlides.length + 1}`,
              },
              description: {
                en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              background: { color: { default: "#BBBBBB" } },
              contentColor: { default: "#FFFFFF" },
              button: {
                text: {
                  en: "Click Here",
                },
              },
              textAlign: { desktop: "center" },
            });
            setSlides(newSlides);
            setActiveSlide(id);
          }}
          variant="outline"
          className="flex"
        >
          <BsPlus size={20} className="me-1" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default SlidesControl;
