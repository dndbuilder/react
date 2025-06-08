import {
  BreakpointSelector,
  Button,
  Input,
  Label,
  ScrollArea,
} from "@/components";
import { collections } from "@/config/icon.config";
import { useSettings } from "@/hooks";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { IconType, SettingsType } from "@/types";
import { classNames } from "@/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { FC, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { HiPlusCircle } from "react-icons/hi";


export type IconControlProps = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  className?: string;
};

export const IconControl: FC<IconControlProps> = ({
  label = "Select Icon",
  fieldName,
  mode,
  responsive,
  type,
  className,
}) => {
  const iconCollections = collections;
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<IconType | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>(
    value?.iconName ?? ""
  );
  const [selectedCollection, setSelectedCollection] = useState<string>(
    value?.iconSet ?? iconCollections[0]?.value ?? ""
  );

  // useEffect(() => {
  //   getIcons(value?.iconSet ?? "fi").then((icons) => {
  //     setIcons(icons);
  //   });
  // }, []);

  // const renderIcon = () => {
  //   const Icon = icons?.[value?.iconName ?? ""];
  //   if (icons && value?.iconSet && value.iconName && Icon) {
  //     return <Icon size={50}></Icon>;
  //   }
  //   return null;
  // };

  return (
    <div className={classNames("mt-4", className)}>
      {label && (
        <Label className="flex flex-1 items-center gap-1 mb-1.5">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div className="group p-0  relative h-32 w-full cursor-pointer overflow-hidden  transition duration-200 control-media-area">
            <div className="flex h-full w-full items-center justify-center text-2xl text-slate-600">
              {/* {value && renderIcon()} */}

              {!value && <HiPlusCircle />}
            </div>
            <div className="absolute -bottom-full z-10 flex w-full justify-between bg-slate-700 p-1 text-center text-xs text-slate-50 transition-all duration-200 group-hover:bottom-0">
              <span>Icon Library</span>

              {value && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(undefined);
                  }}
                  className="p-0.5"
                >
                  <BsTrash className="hover:text-danger-500" />
                </button>
              )}
            </div>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] data-[state=open]:animate-overlay-show" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-60 w-[750px] lg:w-[1000px]  xl:w-[1150px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-hidden data-[state=open]:animate-content-show">
            <Dialog.Title className="flex justify-between pb-2 ps-5 pe-4 pt-5 border-b">
              <p className="text-xl font-semibold">Insert Icon</p>

              <Dialog.Close className="cursor-pointer">
                <FiX />
              </Dialog.Close>
            </Dialog.Title>

            <div className="h-[500px]">
              {/* Icon collections and list */}
              <div className="flex h-[450px]">
                <IconSetViewer
                  selectedIcon={selectedIcon}
                  setSelectedIcon={setSelectedIcon}
                  iconCollections={iconCollections}
                  selectedCollection={selectedCollection}
                  setSelectedCollection={setSelectedCollection}
                />
              </div>

              {/* Footer */}
              <div className={" border-t border-[#E9E9E9]"}>
                <div
                  className={
                    "flex justify-end items-center space-x-3 mt-2 me-4"
                  }
                >
                  <Button onClick={() => setOpen(false)} variant={"secondary"}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setValue({
                        ...value,
                        iconSet: selectedCollection,
                        iconName: selectedIcon as string,
                      });
                    }}
                    disabled={!selectedIcon}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export type IconSetViewerProps = {
  iconCollections: { name: string; value: string }[];
  selectedCollection: string;
  setSelectedCollection: (value: string) => void;
  selectedIcon?: string;
  setSelectedIcon: (key: string) => void;
};

export function IconSetViewer({
  iconCollections,
  selectedCollection,
  setSelectedCollection,
  selectedIcon,
  setSelectedIcon,
}: IconSetViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <Tabs.Root
      value={selectedCollection}
      onValueChange={setSelectedCollection}
      className="flex w-full h-full"
    >
      {/* Vertical tabs for icon collections */}
      <Tabs.List className="flex flex-col w-[200px] border-r overflow-y-auto">
        {iconCollections.map((collection) => (
          <Tabs.Trigger
            key={collection.value}
            value={collection.value}
            className="px-4 py-3 text-left border-l-2 border-transparent hover:bg-slate-100 data-[state=active]:border-indigo-500 data-[state=active]:bg-slate-100 text-sm"
          >
            {collection.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Content area for icons */}
      <div className="flex-1 overflow-hidden">
        {iconCollections.map((collection) => (
          <Tabs.Content
            key={collection.value}
            value={collection.value}
            className="h-full"
          >
            <div className="flex flex-col h-full">
              {/* Search bar inside the IconSetViewer */}
              <div className="flex justify-end py-3 px-5">
                <Input
                  placeholder="Search..."
                  className="w-[200px]"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Icons grid */}
              <ScrollArea className="flex-1">
                <div className="p-5">
                  <div ref={ref} className="grid grid-cols-7 gap-4">
                    {/* This is a placeholder. In a real implementation, you would fetch icons for the selected collection */}
                    {Array.from({ length: 30 })
                      .map((_, index) => `icon-${index}`)
                      .filter((key) => {
                        if (searchText) {
                          return key.toLowerCase().includes(searchText.toLowerCase());
                        }
                        return true;
                      })
                      .map((key) => {
                        return (
                          <div
                            key={key}
                            onClick={() => setSelectedIcon(key)}
                            className="cursor-pointer group"
                          >
                            <div
                              className={classNames(
                                "flex justify-center items-center shadow-sm rounded-sm py-5 group-hover:shadow-md",
                                {
                                  "ring-2 ring-indigo-500 selected": selectedIcon === key,
                                }
                              )}
                            >
                              Icon
                            </div>
                            <p
                              className={classNames("text-[12px] text-center mt-2", {
                                "text-indigo-500": selectedIcon === key,
                              })}
                            >
                              {key}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
