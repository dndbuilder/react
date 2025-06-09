import {
  BreakpointSelector,
  Button,
  Input,
  Label,
  ScrollArea,
} from "@/components";
import { RenderIcon } from "@/components/shared/render-icon";
import { collections } from "@/config/icon.config";
import { useIcons, useSettings } from "@/hooks";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { IconType, SettingsType } from "@/types";
import { classNames } from "@/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { FC, useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { HiPlusCircle } from "react-icons/hi";
import useDebounce from "@/hooks/use-debounce";

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

  const renderIcon = () => {
    if (value?.iconSet && value.iconName) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-2xl mb-1">
              <RenderIcon
                iconSet={value.iconSet}
                iconName={value.iconName}
                size="2em"
              />
            </div>
            <div className="text-xs text-gray-500">{value.iconSet}</div>
          </div>
        </div>
      );
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
            <div className="flex h-full w-full items-center justify-center text-2xl text-slate-600">
              {value ? renderIcon() : <HiPlusCircle />}
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
          <Dialog.Content className="fixed left-[50%] top-[50%] z-60 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-hidden data-[state=open]:animate-content-show">
            <Dialog.Title className="flex justify-between p-4 border-b">
              <p className="text-xl font-semibold">Insert Icon</p>

              <Dialog.Close className="cursor-pointer">
                <FiX />
              </Dialog.Close>
            </Dialog.Title>

            <Dialog.Description asChild>
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
                      "flex justify-end items-center space-x-2 mt-2 me-4"
                    }
                  >
                    <Button
                      onClick={() => setOpen(false)}
                      variant={"secondary"}
                    >
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
            </Dialog.Description>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null); // Ref for the sentinel element
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500); // Debounce search text with 500ms delay

  // Use the custom hook to fetch icon data with infinite scrolling
  const {
    data: iconData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useIcons({
    collection: selectedCollection,
    pageSize: 72,
    searchText: debouncedSearchText,
  });

  // Set up Intersection Observer to load more icons when the sentinel element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the sentinel element is intersecting (visible) and we have more pages to load
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "100px", // Start loading a bit before the element is visible
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    // Start observing the sentinel element if it exists
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Clean up the observer when the component unmounts or dependencies change
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    selectedCollection,
    debouncedSearchText, // Use debounced search text instead of raw search text
  ]);

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
            className="px-4 py-3 text-left border-l-2 border-transparent hover:bg-slate-100 data-[state=active]:border-indigo-500 data-[state=active]:bg-indigo-50 text-sm"
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
                <div ref={scrollRef}>
                  <div
                    ref={ref}
                    className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8  gap-4"
                  >
                    {iconData?.pages ? (
                      iconData.pages.flatMap((page) =>
                        Object.keys(page?.icons ?? {}).map((iconName) => (
                          <div
                            key={iconName}
                            className={classNames(
                              "p-4 cursor-pointer rounded text-center transition-colors",
                              selectedIcon === iconName
                                ? "bg-indigo-100"
                                : "hover:bg-slate-100"
                            )}
                            onClick={() => setSelectedIcon(iconName)}
                          >
                            <RenderIcon
                              iconSet={collection.value}
                              iconName={iconName}
                              size="1.5rem"
                              className="text-slate-600"
                            />
                          </div>
                        ))
                      )
                    ) : isError ? (
                      <div className="col-span-full flex justify-center py-10 text-red-500">
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            Error loading icons
                          </div>
                          <div className="text-sm">
                            Please try again or select a different icon set
                          </div>
                        </div>
                      </div>
                    ) : isLoading ? (
                      <div className="col-span-full flex justify-center py-10">
                        <CgSpinner className="animate-spin text-2xl text-slate-600" />
                      </div>
                    ) : null}
                  </div>

                  {/* Sentinel element for intersection observer */}
                  {hasNextPage && (
                    <div
                      ref={loadMoreRef}
                      className="flex justify-center mt-4 mb-2 h-10"
                    >
                      {isFetchingNextPage && (
                        <CgSpinner className="animate-spin text-2xl text-slate-600" />
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
