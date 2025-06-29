"use client";

import { TabsSettingsType } from "@/blocks/tabs/types";
import { RenderBlock } from "@/components";
import { RenderIcon } from "@/components/shared/render-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { Block, BlockProps } from "@/types/block";
import * as Tabs from "@radix-ui/react-tabs";
import { FC } from "react";

const TabsBlock: FC<BlockProps<TabsSettingsType>> = ({ settings, meta, children }) => {
  const locale = meta?.locale || "en";

  const breakpoint = useBreakpoint();

  const orientation = settings.list?.orientation?.[breakpoint] || "horizontal";

  const childrenMap = children.reduce(
    (acc, child) => {
      if (typeof child === "string") {
        return acc;
      }

      acc[child.id] = child;

      return acc;
    },
    {} as Record<string, Block>
  );

  return (
    <Tabs.Root className="tabs" defaultValue={settings.tabs[0].id} orientation={orientation}>
      <Tabs.List className="tab-list">
        {settings.tabs.map((tab) => (
          <Tabs.Trigger key={tab.id} value={tab.id} asChild>
            <div
              role="button"
              className="tab-button data-[state=active]:text-primary-500 gap-2 whitespace-nowrap px-2 py-1 transition-colors duration-150 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current"
            >
              <RenderIcon
                iconSet={tab.icon?.iconSet}
                iconName={tab.icon?.iconName}
                size={24}
              ></RenderIcon>
              {tab.label?.[locale] || tab.label?.en}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {settings.tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} className="tab-content">
          {tab.children.map((child, index) => {
            if (childrenMap[child]) {
              return (
                <RenderBlock key={child} block={childrenMap[child]} index={index} meta={meta} />
              );
            }
            return null;
          })}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsBlock;
