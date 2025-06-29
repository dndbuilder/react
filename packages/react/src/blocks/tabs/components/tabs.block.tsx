import { TabsSettingsType, TabType } from "@/blocks/tabs/types";
import AddNewSection from "@/components/base/add-new-section";
import EditorRenderBlock from "@/components/base/editor-render-block";
import { RenderIcon } from "@/components/shared/render-icon";
import { useBlockSettings } from "@/hooks/use-block-settings";
import { BlockProps } from "@/types/block";
import * as Tabs from "@radix-ui/react-tabs";
import { cloneDeep } from "lodash";
import { FC } from "react";

const TabsBlock: FC<BlockProps<TabsSettingsType>> = ({ settings, id, meta, isEditable }) => {
  const [activeTabId, setActiveTabId] = useBlockSettings<string | null>(id, "activeTabId");
  const { 0: orientation } = useBlockSettings<"horizontal" | "vertical">(
    id,
    "list.orientation.{{BREAKPOINT}}"
  );

  const locale = meta?.locale || "en";

  const { 1: setTabs } = useBlockSettings(id, "tabs");

  return (
    <Tabs.Root
      className="tabs"
      value={activeTabId ?? settings.tabs[0].id}
      onValueChange={(value) => setActiveTabId(value)}
      orientation={orientation}
    >
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
          {tab.children.map((block, index) => (
            <EditorRenderBlock
              key={block}
              block={block}
              index={index}
              meta={meta}
              isEditable={isEditable ?? false}
            />
          ))}
          {isEditable && (
            <AddNewSection
              blockId={id}
              showBlockLibrary={false}
              className={"p-4"}
              onBlockAdded={(block) => {
                setTabs((prev: TabType[]) => {
                  const cloneTabs = cloneDeep(prev);
                  const currentTab = cloneTabs.find((t) => t.id === tab.id);
                  if (currentTab) {
                    currentTab.children.push(block.id);
                  }
                  return cloneTabs;
                });
              }}
            />
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsBlock;
