import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { useState } from "react";
import { Label } from "@/components/shared/label";
import { cloneDeep } from "lodash";
import { createId } from "@/utils";
import { classNames } from "@/utils";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { Button } from "@/components/shared/button";
import { InputControl } from "@/components/controls/input.control";
import { TextareaControl } from "@/components/controls/textarea.control";
import { SwitchControl } from "@/components/controls/switch.control";
import { TestimonialItemType } from "../types";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { BiGridVertical } from "react-icons/bi";
import { MediaControl } from "@/components/controls/media.control";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentLocale } from "@/store/selectors";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useSettings<TestimonialItemType[]>(
    "testimonials",
    SettingsType.BLOCK
  );
  const [activeItem, setActiveItem] = useState<string>("");
  const currentLocale = useAppSelector(getCurrentLocale);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setTestimonials(arrayMoveImmutable(testimonials ?? [], oldIndex, newIndex));
  };

  const getTitle = (title: string | undefined, index: number) => {
    const text = title?.replace(/(<([^>]+)>)/gi, "").trim();
    return text ? text : `Item #${index + 1}`;
  };

  return (
    <div>
      <SortableList onSortEnd={onSortEnd} lockAxis="y">
        {testimonials?.map((item, index) => (
          <div key={item.id} className="mb-1.5">
            <SortableItem key={item.id}>
              <div className="z-[99] bg-[#F8F9F8] px-2" key={index}>
                <div className="flex min-h-[40px]  items-center">
                  <button className={"me-1 cursor-move"}>
                    <BiGridVertical size={14} color={"#828282"} />
                  </button>

                  <Label
                    onClick={() => {
                      setActiveItem((prevState) => (prevState === item.id ? "" : item.id));
                    }}
                    className="flex h-full flex-1 cursor-pointer items-center "
                  >
                    {getTitle(item.name?.[currentLocale] || item.name?.en, index)}
                  </Label>

                  <div
                    onClick={() => {
                      // Copy the current item next to the current item
                      const newSlides = cloneDeep(testimonials) ?? [];
                      newSlides.splice(index + 1, 0, {
                        ...item,
                        id: createId(),
                      });
                      setTestimonials(newSlides);
                    }}
                    className="me-1.5 flex h-full cursor-pointer items-center justify-center "
                  >
                    <FaRegCopy />
                  </div>
                  <div
                    // delete the current slide
                    onClick={() => {
                      const newSlides = cloneDeep(testimonials) ?? [];
                      newSlides.splice(index, 1);
                      setTestimonials(newSlides);
                    }}
                    className="flex h-full cursor-pointer items-center justify-center "
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
                  "grid-rows-[1fr]": activeItem === item.id,
                }
              )}
            >
              <div
                className={classNames(
                  "min-h-0 px-3 transition-[padding-top,padding-bottom] duration-200",
                  {
                    "h-auto pb-3": activeItem === item.id,
                  }
                )}
              >
                {/* Name */}
                <InputControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.name`}
                  label="Name"
                  isLocalized
                />
                {/* Position */}
                <InputControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.position`}
                  label="Position"
                  isLocalized
                />

                {/* Review */}
                <TextareaControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.content`}
                  label="Review"
                  isLocalized
                />

                {/* Media Image */}
                <MediaControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.image`}
                  label="Image"
                />

                {/* Show start rating */}
                <SwitchControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.showRating`}
                  label="Show Ratings"
                />
                {/* Rating */}
                <InputControl
                  type={SettingsType.BLOCK}
                  fieldName={`testimonials.${index}.rating`}
                  label="Rating"
                  inputProps={{
                    type: "number",
                    inputMode: "numeric",
                    min: 0,
                    max: 5,
                    step: 1,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </SortableList>
      <div className="mt-5 flex justify-center">
        <Button
          onClick={() => {
            const newSlides = cloneDeep(testimonials) ?? [];
            newSlides.push({
              id: createId(),
              content: {
                en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
              },
              name: { en: "John Doe" },
              position: { en: "CEO" },
              rating: 3,
            });
            setTestimonials(newSlides);
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

export default Testimonials;
