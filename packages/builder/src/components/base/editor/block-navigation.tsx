"use client";
import { BuilderConfiguration } from "@/config/builder.config";
import BlockNavigationItem from "./block-navigation-item";
import { Accordion } from "@/components/shared/accordion";
import { ScrollArea } from "@/components/shared/scroll-area";
import { BiSearch } from "react-icons/bi";
import { useMemo, useState } from "react";
import { classNames, objectKeys } from "@/utils";
import { BlockGroup, BlockConfig } from "@/types/block";

export const BlockNavigation = () => {
  const [search, setSearch] = useState("");

  const availableGroups = useMemo(() => {
    return BuilderConfiguration.getBlocks()
      .filter((block) => block.label.toLowerCase().includes(search.toLowerCase()))
      .reduce(
        (acc, block) => {
          const group = block.group ?? "Others";
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(block);
          return acc;
        },
        {} as Record<BlockGroup, BlockConfig[]>
      );
  }, [search]);

  return (
    <div>
      <div className="mt-4 h-14 w-full bg-white px-4">
        <div className="group flex items-center  overflow-hidden rounded-sm  ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-slate-600">
          <div className="ms-2.5 flex w-7 items-center justify-center">
            <BiSearch className=" text-slate-500 group-focus-within:text-slate-700" size={18} />
          </div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="focus:outline-hidden w-full rounded-sm border-0 px-1 py-2 text-sm placeholder:text-sm placeholder:text-slate-500 focus:ring-0"
            placeholder="Search..."
          />
        </div>
      </div>

      {objectKeys(availableGroups).length === 0 && (
        <div className="py-2 text-center text-sm text-slate-600">No blocks found</div>
      )}

      <ScrollArea className="h-[calc(100vh-145px)]">
        <Accordion defaultValue={Object.keys(availableGroups)} type="multiple">
          {objectKeys(availableGroups)
            .sort((a, b) => {
              const indexA = BuilderConfiguration.getGroupOrder(a);
              const indexB = BuilderConfiguration.getGroupOrder(b);

              // If both groups are in the order array, sort by their position
              if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
              }

              // If only one group is in the order array, prioritize it
              if (indexA !== -1) return -1;
              if (indexB !== -1) return 1;

              // If neither group is in the order array, maintain original order
              return 0;
            })
            .map((group, index) => {
              return (
                <Accordion.Item value={group} key={group}>
                  <Accordion.Trigger
                    className={classNames("px-4", {
                      "pt-1": index === 0,
                    })}
                  >
                    {group}
                  </Accordion.Trigger>
                  <Accordion.Content className="px-4">
                    <div className="grid grid-cols-2 gap-3 py-2">
                      {availableGroups[group].map((block) => {
                        return <BlockNavigationItem block={block} key={block.type} />;
                      })}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
        </Accordion>
      </ScrollArea>
    </div>
  );
};
