"use client";

import { IconControl } from "@/components/controls/icon.control";
import { InputControl } from "@/components/controls/input.control";
import { Accordion } from "@/components/shared/accordion";
import { Button } from "@/components/shared/button";
import { Label } from "@/components/shared/label";
import { useSettings } from "@/hooks/use-settings";
import { duplicateTabItem, removeTabItem } from "@/store/builder-slice";
import { getCurrentLocale, getSelectedBlockId } from "@/store/selectors";
import { SettingsType } from "@/types";
import { createId } from "@/utils";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { BiGridVertical } from "react-icons/bi";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { TabsSettingsType } from "../types";

const TabsContentControl = () => {
  const [tabs, setTabs] = useSettings<TabsSettingsType["tabs"]>("tabs", SettingsType.BLOCK);

  const [activeTabId, setActiveTabId] = useSettings<string | null>(
    "activeTabId",
    SettingsType.BLOCK
  );

  const currentLocale = useAppSelector(getCurrentLocale);

  const selectedBlockId = useAppSelector(getSelectedBlockId);

  const dispatch = useAppDispatch();

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setTabs(arrayMoveImmutable(tabs ?? [], oldIndex, newIndex));
  };

  const getTitle = (title: string | undefined, index: number) => {
    const text = title?.replace(/(<([^>]+)>)/gi, "").trim();
    return text ? text : `Item #${index + 1}`;
  };

  const addNewTab = () => {
    if (!selectedBlockId) {
      return;
    }

    const newTab = {
      id: createId(),
      label: {
        en: `Tab ${tabs?.length + 1}`,
      },
      children: [],
    };

    setTabs((prevTabs) => {
      return [...(prevTabs ?? []), newTab];
    });

    setActiveTabId(newTab.id);
  };

  const deleteTab = (index: number) => {
    if (!selectedBlockId) return;
    dispatch(removeTabItem({ blockId: selectedBlockId, tabIndex: index }));
  };

  const duplicateTab = (index: number) => {
    if (!selectedBlockId) return;
    dispatch(duplicateTabItem({ blockId: selectedBlockId, tabIndex: index }));
  };

  return (
    <Accordion defaultValue="Content" type="single" collapsible>
      <Accordion.Item value="Content">
        <Accordion.Trigger className="p-4">Tabs</Accordion.Trigger>

        <Accordion.Content className="px-4">
          <SortableList onSortEnd={onSortEnd} lockAxis="y">
            {tabs?.map((tab, index) => (
              <div key={tab.id} className="mb-1.5">
                <SortableItem key={tab.id}>
                  <div className="z-99 bg-[#F8F9F8] px-2" key={index}>
                    <div className="flex min-h-[40px]  items-center">
                      <button className={"me-1 cursor-move"}>
                        <BiGridVertical size={14} color={"#828282"} />
                      </button>

                      <Label
                        onClick={() => {
                          setActiveTabId(tab.id);
                        }}
                        className="flex h-full flex-1 cursor-pointer items-center py-1 text-xs hover:bg-slate-50"
                      >
                        {getTitle(tab.label?.[currentLocale], index)}
                      </Label>

                      <button
                        onClick={() => duplicateTab(index)}
                        className="me-1.5 flex h-full cursor-pointer items-center justify-center hover:bg-slate-50"
                      >
                        <FaRegCopy />
                      </button>
                      <button
                        onClick={() => deleteTab(index)}
                        className="flex h-full cursor-pointer items-center justify-center hover:bg-slate-50"
                        disabled={tabs?.length === 1}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </SortableItem>
                <div
                  className={classNames(
                    "grid grid-rows-[0fr] overflow-hidden bg-[#F8F9F8] transition-[grid-template-rows] duration-200",
                    {
                      "grid-rows-[1fr]": activeTabId === tab.id,
                    }
                  )}
                >
                  <div
                    className={classNames(
                      "min-h-0 px-3 transition-[padding-top,padding-bottom] duration-200",
                      {
                        "h-auto pb-3": activeTabId === tab.id,
                      }
                    )}
                  >
                    <InputControl
                      label="Label"
                      type={SettingsType.BLOCK}
                      fieldName={`tabs.${index}.label`}
                      isLocalized
                    />

                    <IconControl
                      label="Icon"
                      type={SettingsType.BLOCK}
                      fieldName={`tabs.${index}.icon`}
                      className="mt-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </SortableList>

          <div className="mt-5 flex justify-center">
            <Button onClick={addNewTab} variant="outline" className="flex">
              <BsPlus size={20} className="me-1" />
              Add New
            </Button>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default TabsContentControl;
