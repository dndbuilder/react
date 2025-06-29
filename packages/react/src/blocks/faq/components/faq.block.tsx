"use client";

import { BlockProps } from "@/types/block";
import { FC, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { classNames } from "@/utils";
import { FaqSettingsType } from "../types";

const Faq: FC<BlockProps<FaqSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (settings.isOpenFirstItem && settings.items?.length) return [settings.items?.[0].id];
    return [];
  });

  const toggleOpenItems = (id: string) =>
    setOpenItems((prevState) => {
      if (settings.isAccordion) {
        if (prevState.includes(id)) return [];
        else return [id];
      } else {
        if (prevState.includes(id)) return prevState.filter((item) => item !== id);
        else return [...prevState, id];
      }
    });

  return (
    <div className="faqs">
      {settings.items?.map((item) => (
        <div className="item" key={item.id}>
          <div
            onClick={() => toggleOpenItems(item.id)}
            className="flex cursor-pointer items-center justify-between"
          >
            <span className="title">{item.title?.text?.[locale] || item.title?.text?.en}</span>
            {openItems.includes(item.id) ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </div>

          <div
            className={classNames(
              "grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-200",
              {
                "grid-rows-[1fr]": openItems.includes(item.id),
              }
            )}
          >
            <div
              className={classNames("description", "min-h-0", {
                "h-auto": openItems.includes(item.id),
              })}
            >
              {item.description?.text?.[locale]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
