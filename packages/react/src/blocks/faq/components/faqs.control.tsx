"use client";

import { useSettings } from "@/hooks/use-settings";
import { SettingsType } from "@/types";
import { Label } from "@/components/shared/label";
import { useState } from "react";
import { cloneDeep } from "lodash";
import { createId } from "@/utils";
import { FaRegCopy } from "react-icons/fa";
import { BsPlus, BsTrash } from "react-icons/bs";
import { classNames } from "@/utils";
import { InputControl } from "@/components/controls/input.control";
import { Button } from "@/components/shared/button";
import { TextareaControl } from "@/components/controls/textarea.control";
import { FaqItem } from "../types";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { BiGridVertical } from "react-icons/bi";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentLocale } from "@/store/selectors";

const FaqsControl = () => {
  const [items, setItems] = useSettings<FaqItem[]>("items", SettingsType.BLOCK);
  const [activeItem, setActiveItem] = useState<string>("");
  const currentLocale = useAppSelector(getCurrentLocale);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems(arrayMoveImmutable(items ?? [], oldIndex, newIndex));
  };

  const getTitle = (title: string | undefined, index: number) => {
    const text = title?.replace(/(<([^>]+)>)/gi, "").trim();
    return text ? text : `Item #${index + 1}`;
  };

  return (
    <div>
      <SortableList onSortEnd={onSortEnd} lockAxis="y">
        {items?.map((item, index) => (
          <div key={item.id} className="mb-1.5">
            <SortableItem key={item.id}>
              <div className="z-[99] bg-[#F8F9F8] px-2" key={item.id}>
                <div className="flex min-h-[40px]  items-center">
                  <button className={"me-1 cursor-move"}>
                    <BiGridVertical size={14} color={"#828282"} />
                  </button>
                  <Label
                    onClick={() => {
                      setActiveItem((prevState) => (prevState === item.id ? "" : item.id));
                    }}
                    className="line-clamp-2 flex h-full flex-1 cursor-pointer items-center py-1 text-xs hover:bg-slate-50"
                  >
                    {getTitle(item.title?.text?.[currentLocale] || item.title?.text?.en, index)}
                  </Label>

                  <div
                    onClick={() => {
                      // Copy the current item next to the current item
                      const newSlides = cloneDeep(items) ?? [];
                      newSlides.splice(index + 1, 0, {
                        ...item,
                        id: createId(),
                      });
                      setItems(newSlides);
                    }}
                    className="me-1.5 flex h-full cursor-pointer items-center justify-center hover:bg-slate-50"
                  >
                    <FaRegCopy />
                  </div>
                  <div
                    // delete the current slide
                    onClick={() => {
                      const newSlides = cloneDeep(items) ?? [];
                      newSlides.splice(index, 1);
                      setItems(newSlides);
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
                {/* Title */}
                <InputControl
                  type={SettingsType.BLOCK}
                  fieldName={`items.${index}.title.text`}
                  label="Title"
                  isLocalized
                />

                {/* Description */}
                <TextareaControl
                  type={SettingsType.BLOCK}
                  fieldName={`items.${index}.description.text`}
                  label="Description"
                  isLocalized
                />
              </div>
            </div>
          </div>
        ))}
      </SortableList>

      <div className="mt-5 flex justify-center">
        <Button
          onClick={() => {
            const newSlides = cloneDeep(items) ?? [];
            newSlides.push({
              id: createId(),
              title: {
                text: {
                  en: `Item #${newSlides.length + 1}`,
                },
              },
              description: {
                text: {
                  en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!",
                },
              },
            });
            setItems(newSlides);
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

export default FaqsControl;
