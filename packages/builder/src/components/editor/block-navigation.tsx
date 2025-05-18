import { BlockConfiguration } from "@/config/editor.config";
import BlockNavigationItem from "./block-navigation-item";
import Accordion from "@/components/shared/accordion";
import { ScrollArea } from "@/components/shared/scroll-area";
import { BiSearch } from "react-icons/bi";
import { useMemo, useState } from "react";
import { classNames, objectKeys } from "@/utils";
import { EditorBlockConfig } from "@/types/block";
import { GroupConfiguration } from "@/config/group.config";

const BlockNavigation = () => {
  const [search, setSearch] = useState("");

  const availableGroups = useMemo(() => {
    return BlockConfiguration.getBlocks()
      .filter((block) =>
        block.label.toLowerCase().includes(search.toLowerCase())
      )

      .reduce(
        (acc, block) => {
          const group = block.group ?? "Others";
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(block);
          return acc;
        },
        {} as Record<string, EditorBlockConfig[]>
      );
  }, [search]);

  return (
    <div>
      <div className="h-14 w-full bg-white px-4 mt-4">
        <div className="flex items-center border focus-within:border-dokan-500 rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-dokan-500">
          <div className="ms-2.5 flex w-7 items-center justify-center">
            <BiSearch className=" text-dark-500" size={18} />
          </div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="w-full border-0 px-1 py-2 rounded-sm focus:ring-0 focus:outline-hidden placeholder:text-sm text-sm"
            placeholder="Search..."
          />
        </div>
      </div>

      {objectKeys(availableGroups).length === 0 && (
        <div className="text-center py-2 text-sm text-dark-600">
          No blocks found
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-145px)]">
        <Accordion defaultValue={Object.keys(availableGroups)} type="multiple">
          {objectKeys(availableGroups)
            .sort(
              (a, b) =>
                GroupConfiguration.getGroup(a).order -
                GroupConfiguration.getGroup(b).order
            )
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
                    <div className="grid grid-cols-2 gap-3">
                      {availableGroups[group].map((block) => {
                        return (
                          <BlockNavigationItem block={block} key={block.type} />
                        );
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

export default BlockNavigation;
