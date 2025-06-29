"use client";
import { classNames } from "@/utils";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useVirtualizer } from "@tanstack/react-virtual";
import axios from "axios";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { LuChevronsUpDown } from "react-icons/lu";
import { Button } from "./button";
import { Popover } from "./popover";
import { useQuery } from "@tanstack/react-query";

interface Font {
  family: string;
}

interface FontsResponse {
  items: Font[];
}

const ITEM_HEIGHT = 35; // Height of each font item in pixels

const apiKey = "AIzaSyCn6E9t1_hK5zgcgbY2qHEwNDFHvhycgBc";

export const FontSelector: FC<{
  value?: string;
  onChange?: (fontFamily: string) => void;
  className?: string;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  avoidCollisions?: boolean;
}> = ({
  value: controlledValue,
  onChange,
  className,
  side = "bottom",
  align = "center",
  avoidCollisions = true,
}) => {
  const [selectedFont, setSelectedFont] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const [WebFont, setWebFont] = useState<typeof import("webfontloader") | undefined>(undefined);

  const value = controlledValue ?? selectedFont;

  const {
    data: fonts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fonts", apiKey],
    queryFn: async () => {
      const response = await axios.get<FontsResponse>(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
      );
      return response.data.items;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const filteredFonts = fonts.filter((font) =>
    font.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const virtualizer = useVirtualizer({
    count: filteredFonts.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 0, // Number of items to render outside of the visible area
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchQuery("");
    }
    setIsOpen(open);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFontChange = (fontFamily: string, index: number) => {
    setSelectedFont(fontFamily);
    setIsOpen(false);
    onChange?.(fontFamily);
  };

  useEffect(() => {
    import("webfontloader").then((WebFont) => {
      setWebFont(WebFont.default);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const visibleItems = virtualizer.getVirtualItems();
      const visibleFonts = visibleItems
        .map((item) => filteredFonts[item.index]?.family)
        .filter(Boolean);

      if (visibleFonts.length > 0) {
        WebFont?.load({
          google: {
            families: visibleFonts,
          },
        });
      }
    }
  }, [WebFont, virtualizer.getVirtualItems(), isOpen, filteredFonts]);

  useEffect(() => {
    if (value) {
      WebFont?.load({
        google: {
          families: [value],
        },
      });
    }
  }, [WebFont, value]);

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading fonts...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Error loading fonts</div>;
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={classNames(
            "border-dark-300 w-full justify-between whitespace-nowrap",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {value ?? "Select a font"}
          <LuChevronsUpDown className="ms-2 h-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className="w-[260px] p-0"
        side={side}
        align={align}
        avoidCollisions={avoidCollisions}
      >
        <div className="flex items-center border-b">
          <div className="ms-2.5 flex w-7 items-center justify-center">
            <BiSearch className=" text-dark-500" size={18} />
          </div>
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="text"
            className="w-full border-0 px-1 text-sm placeholder:text-sm focus:ring-0"
            placeholder="Search..."
          />
        </div>

        {filteredFonts.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">No fonts found</div>
        ) : (
          <ScrollArea.Root
            className="w-full"
            style={{
              height: filteredFonts.length > 8 ? "285px" : "auto",
            }}
          >
            <ScrollArea.Viewport ref={scrollParentRef} className="h-full w-full">
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const font = filteredFonts[virtualItem.index];
                  // const isFocused = focusedIndex === virtualItem.index;

                  return (
                    <Popover.Close key={virtualItem.key}>
                      <div
                        // data-is-focused={isFocused}
                        className={classNames(
                          "font-item hover:bg-dark-100 absolute left-0 top-0 flex w-full cursor-pointer items-center gap-2 px-4 text-sm",
                          font.family.length > 25 ? "text-xs" : "text-sm"
                        )}
                        style={{
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                          fontFamily: font.family,
                        }}
                        onClick={() => handleFontChange(font.family, virtualItem.index)}
                        role="option"
                        aria-selected={value === font.family}
                      >
                        {font.family}
                        {value === font.family && (
                          <FiCheck
                            className={classNames(
                              "ms-auto h-4 w-4",
                              value === font.family ? "opacity-100" : "opacity-0"
                            )}
                          />
                        )}
                      </div>
                    </Popover.Close>
                  );
                })}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-zinc-100 p-0.5 transition-colors duration-150 ease-out hover:bg-zinc-200 data-[orientation=vertical]:w-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-zinc-400" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-zinc-200" />
          </ScrollArea.Root>
        )}
      </Popover.Content>
    </Popover>
  );
};
