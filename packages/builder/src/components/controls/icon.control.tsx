"use client";

import { useAppSelector } from "@/hooks/use-app-selector";
import { classNames } from "@/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { FC, useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";
import { LiaTimesSolid } from "react-icons/lia";
import { useSettings } from "../../hooks/use-settings";
import { getCurrentBreakpoint } from "../../store/selectors";
import { IconType, SettingsType } from "../../types";
import { getIcons } from "../../utils";
import BreakpointSelector from "../shared/breakpoint-selector";
import Button from "../shared/button";
import Input from "../shared/input";
import Label from "../shared/label";
import { ScrollArea } from "../shared/scroll-area";

type Props = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  className?: string;
};

const IconControl: FC<Props> = ({
  label = "Select Icon",
  fieldName,
  mode,
  responsive,
  type,
  className,
}) => {
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

  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>(
    value?.iconName ?? ""
  );
  const [icons, setIcons] = useState<any>();

  useEffect(() => {
    getIcons(value?.iconSet ?? "fi").then((icons) => {
      setIcons(icons);
    });
  }, []);

  const renderIcon = () => {
    const Icon = icons?.[value?.iconName ?? ""];
    if (icons && value?.iconSet && value.iconName && Icon) {
      return <Icon size={50}></Icon>;
    }
    return null;
  };

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
            <div className="flex h-full w-full items-center justify-center text-2xl text-dark-600">
              {value && renderIcon()}

              {!value && <HiPlusCircle />}
            </div>
            <div className="absolute -bottom-full z-10 flex w-full justify-between bg-dark-700 p-1 text-center text-xs text-dark-50 transition-all duration-200 group-hover:bottom-0">
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
            <div className="flex justify-between pb-2 ps-5 pe-4 pt-5 border-b">
              <p className="text-xl font-semibold">Insert Icon</p>

              <Dialog.Close className="cursor-pointer">
                <LiaTimesSolid />
              </Dialog.Close>
            </div>

            <div className="flex justify-end py-3 pe-5">
              <Input
                placeholder="Search..."
                className="w-[200px]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="h-[500px]">
              {/* Right side Icon list */}
              <ScrollArea className="h-[450px]">
                <div className="p-5">
                  <IconSetViewer
                    searchText={searchText}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    icons={icons}
                  />
                </div>
              </ScrollArea>

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
                        iconSet: value?.iconSet ?? "fi",
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

type IconSetViewerProps = {
  icons: any;
  selectedIcon?: string;
  searchText?: string;
  setSelectedIcon: (key: string) => void;
};

function IconSetViewer({
  icons,
  selectedIcon,
  setSelectedIcon,
  searchText,
}: IconSetViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const selected = ref.current?.querySelector(".selected");
    if (selected) {
      selected.scrollIntoView({ block: "center" });
    }
  }, []);

  return (
    <>
      <div ref={ref} className="grid grid-cols-7 gap-4">
        {icons &&
          Object.keys(icons)
            .filter((key) => {
              if (searchText) {
                return key.toLowerCase().includes(searchText.toLowerCase());
              }
              return true;
            })
            ?.map((key) => {
              const Icon = icons[key];
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
                        "ring-2 ring-violet-500 selected": selectedIcon === key,
                      }
                    )}
                  >
                    <Icon size={35} />
                  </div>
                  <p
                    className={classNames("text-[12px] text-center mt-2", {
                      "text-violet-500": selectedIcon === key,
                    })}
                  >
                    {key}
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default IconControl;
