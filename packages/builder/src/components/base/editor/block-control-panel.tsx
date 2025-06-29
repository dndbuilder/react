"use client";

import { ScrollArea } from "@/components/shared/scroll-area";
import { Tabs } from "@/components/shared/tabs";
import { BuilderConfiguration } from "@/config/builder.config";
import { FC, lazy, Suspense, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export type BlockControlPanelProps = {
  type: string;
};

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <CgSpinner size={24} className="animate-spin text-slate-600" />
    <span className="mt-2 text-sm text-slate-600">Loading...</span>
  </div>
);

const AdvancedSettingsControl = lazy(
  () => import("@/components/controls/advance-settings.control")
);

export const BlockControlPanel: FC<BlockControlPanelProps> = ({ type }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const config = BuilderConfiguration.getBlock(type);

  const controls = config?.controls ?? [];

  const disableAdvancedSettings = config?.disableAdvancedSettings ?? false;

  if (controls.length === 0 && disableAdvancedSettings) {
    return <div className="flex justify-center py-10 text-slate-400">No controls found</div>;
  }

  return (
    <div className="h-full bg-white">
      <Tabs
        value={String(currentTabIndex)}
        onValueChange={(val) => setCurrentTabIndex(Number(val))}
        className="w-full"
      >
        <Tabs.List className="w-full rounded-none bg-slate-100 p-0">
          {controls.map((tab, index) => (
            <Tabs.Trigger
              value={String(index)}
              className="h-full w-full rounded-none border-t-2 border-t-transparent font-medium text-slate-700 data-[state=active]:border-t-slate-800 data-[state=active]:shadow-none"
              key={index}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
          {!disableAdvancedSettings && (
            <Tabs.Trigger
              value={String(controls.length)}
              className="h-full w-full rounded-none border-t-2 border-t-transparent font-medium text-slate-700 data-[state=active]:border-t-slate-800 data-[state=active]:shadow-none"
            >
              Advanced
            </Tabs.Trigger>
          )}
        </Tabs.List>

        {controls.map((tab, index) => (
          <Tabs.Content value={String(index)} key={index}>
            <ScrollArea className="h-[calc(100vh-175px)]">
              <div className="panel-scroll-content">
                {<Suspense fallback={<LoadingFallback />}>{<tab.component />}</Suspense>}
              </div>
            </ScrollArea>
          </Tabs.Content>
        ))}
        {!disableAdvancedSettings && (
          <Tabs.Content value={String(controls.length)}>
            <ScrollArea className="h-[calc(100vh-175px)]">
              <div className="panel-scroll-content">
                <Suspense fallback={<LoadingFallback />}>
                  <AdvancedSettingsControl />
                </Suspense>
              </div>
            </ScrollArea>
          </Tabs.Content>
        )}
      </Tabs>
    </div>
  );
};
