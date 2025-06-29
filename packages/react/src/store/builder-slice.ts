import { Block, BlockAdvancedSettings, BlockType } from "../types/block";
import { Breakpoint } from "../types/responsive";
import { createBlock, createId, createRootBlock } from "../utils";
import { AnyObject } from "../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import objectPath from "object-path";
import { ContainerSettingsType } from "../blocks/container/types";
import { TabType } from "../blocks/tabs/types";

export interface BuilderState {
  content: Record<string, Block>;
  selectedBlockId: string | null;
  currentBreakpoint: Breakpoint;
  currentLocale: string;
}

const initialState: BuilderState = {
  content: {
    root: createRootBlock(),
  },
  selectedBlockId: null,
  currentBreakpoint: Breakpoint.DESKTOP,
  currentLocale: "en",
};

export const builderSlice = createSlice({
  name: "builder",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Set builder Content
    setContent: (state: BuilderState, action: PayloadAction<Record<string, Block>>) => {
      if (isEmpty(action.payload)) {
        state.content = {
          ["root"]: createRootBlock(),
        };
        return;
      }
      state.content = action.payload;
    },

    // Set Header
    setHeader: (state: BuilderState, action: PayloadAction<Block[]>) => {
      state.content["root"].children.splice(0, 0, ...action.payload.map((block) => block.id));
      action.payload.forEach((block) => {
        state.content[block.id] = block;
      });
    },

    // Clear builder Content
    clearContent: (state: BuilderState) => {
      state.content = {
        ["root"]: createRootBlock(),
      };
    },

    // Add a block to the selected page
    addBlock: (
      state: BuilderState,
      action: PayloadAction<{
        block: Block;
        index?: number;
        select?: boolean;
      }>
    ) => {
      const { block, index, select = true } = action.payload;
      const parentId = block.parentId;

      // Add block data to content
      state.content[block.id] = block;

      // Add the block to the parent's children
      state.content[parentId].children.splice(
        index ?? state.content[parentId].children.length,
        0,
        block.id
      );

      // Set selected block
      state.selectedBlockId = select ? block.id : state.selectedBlockId;
    },

    // Add multiple blocks to the selected page
    addBlocks: (
      state: BuilderState,
      action: PayloadAction<{
        blocks: Block[];
        selectedBlockId: string | null;
        index?: number;
      }>
    ) => {
      const { blocks, selectedBlockId, index } = action.payload;

      // Add the blocks to the content
      blocks.forEach((block) => {
        state.content[block.id] = block;
        const parentId = block.parentId;

        // Add the block to the parent's children
        state.content[parentId]?.children.splice(
          index ?? state.content[parentId].children.length,
          0,
          block.id
        );
      });

      // Set selected block
      state.selectedBlockId = selectedBlockId;
    },

    // Update a block
    updateBlock: (
      state: BuilderState,
      action: PayloadAction<{
        id: string;
        block: Partial<Block> | ((block: Block) => Block);
      }>
    ) => {
      const { id, block } = action.payload;

      state.content[id] = {
        ...state.content[id],
        ...(typeof block === "function" ? block(state.content[id]) : block),
      };
    },

    // Duplicate a block
    duplicateBlock: (
      state: BuilderState,
      action: PayloadAction<{
        blockId: string;
        newId?: string;
        parentId?: string;
        select?: boolean;
      }>
    ) => {
      const targetBlockId = action.payload.blockId;

      const targetBlock = state.content[targetBlockId];

      const targetParentId = action.payload.parentId ?? targetBlock.parentId;

      const targetIndex = state.content[targetBlock.parentId].children.findIndex(
        (id) => id === targetBlockId
      );

      const newBlockId = action.payload.newId ?? createId();

      // Recursive function to duplicate the block and its children
      const duplicate = ({
        targetId,
        targetParentId,
        blockId,
        blockIndex,
      }: {
        targetId: string;
        targetParentId: string;
        blockId?: string;
        blockIndex?: number;
      }) => {
        const target = state.content[targetId];

        if (target.type === BlockType.TABS) {
          builderSlice.caseReducers.duplicateTab(state, {
            payload: { blockId: targetId, parentId: targetParentId },
            type: "builder/duplicateTab",
          });
          return;
        }

        // Duplicate the block
        const newBlock: Block = {
          id: blockId ?? createId(),
          type: target.type,
          parentId: targetParentId,
          children: [],
          settings: cloneDeep(target.settings),
          advancedSettings: cloneDeep(target.advancedSettings),
        };

        // Add the duplicated block to the blocks
        state.content[newBlock.id] = newBlock;

        // Add the duplicated block to the parent's children
        if (blockIndex) {
          state.content[targetParentId].children.splice(blockIndex, 0, newBlock.id);
        } else {
          state.content[targetParentId].children.push(newBlock.id);
        }

        // Duplicate the block's children
        target.children.forEach((id) =>
          duplicate({ targetId: id as string, targetParentId: newBlock.id })
        );
      };

      duplicate({
        targetId: targetBlockId,
        targetParentId: targetParentId,
        blockId: newBlockId,
        blockIndex: targetIndex + 1,
      });

      // Set selected block
      if (action.payload.select !== false) {
        state.selectedBlockId = newBlockId;
      }
    },

    // Remove a block
    removeBlock: (state: BuilderState, action: PayloadAction<string>) => {
      const blockId = action.payload;

      const deleteBlock = (blockId: string) => {
        const block = state.content[blockId];
        const parentId = block.parentId;

        // Remove the block from the parent's children
        state.content[parentId].children = state.content[parentId].children.filter(
          (id) => id !== blockId
        );

        // Remove the block's children
        block.children.forEach((id) => deleteBlock(id as string));

        // Remove the block from the blocks
        delete state.content[blockId];
      };

      deleteBlock(blockId);
    },

    // Move a block
    moveBlock: (
      state: BuilderState,
      action: PayloadAction<{
        sourceId: string;
        targetId: string;
        targetIndex: number;
      }>
    ) => {
      const { sourceId, targetId, targetIndex } = action.payload;
      const sourceBlock = state.content[sourceId];
      const targetBlock = state.content[targetId];

      // Get the current index of the source block in its parent's children
      const sourceParentChildren = state.content[sourceBlock.parentId].children;
      const sourceIndex = sourceParentChildren.indexOf(sourceId);

      // If source and target parent are the same, we need to handle the index adjustment
      if (sourceBlock.parentId === targetBlock.id) {
        if (sourceIndex === targetIndex) return;

        const children = state.content[targetBlock.id].children;
        const newChildren = [...children];

        // Remove the source from its current position
        newChildren.splice(sourceIndex, 1);

        // Insert it at the target position, adjusting for the removal
        const adjustedTargetIndex = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
        newChildren.splice(adjustedTargetIndex, 0, sourceId);

        // Update the children array
        state.content[targetBlock.id].children = newChildren;
      } else {
        // Different parents case - original logic
        // Remove from source parent
        state.content[sourceBlock.parentId].children = sourceParentChildren.filter(
          (id) => id !== sourceId
        );

        // Add to target parent
        state.content[targetBlock.id].children.splice(targetIndex, 0, sourceId);

        // Update the parent reference
        sourceBlock.parentId = targetBlock.id;
      }
    },

    // Select block
    selectBlock: (state: BuilderState, action: PayloadAction<string>) => {
      state.selectedBlockId = action.payload;
    },

    // Unselect block
    unselectBlock: (state: BuilderState) => {
      state.selectedBlockId = null;
    },

    // Set current breakpoint
    setCurrentBreakpoint: (state: BuilderState, action: PayloadAction<Breakpoint>) => {
      state.currentBreakpoint = action.payload;
    },

    // Set current language
    setCurrentLanguage: (state: BuilderState, action: PayloadAction<string>) => {
      state.currentLocale = action.payload;
    },

    // Set block settings
    setBlockSettings: (
      state: BuilderState,
      action: PayloadAction<{
        id: string;
        settings: AnyObject;
      }>
    ) => {
      const { id, settings } = action.payload;
      state.content[id].settings = settings;
    },

    // Set block settings value by key
    setBlockSettingsValueByKey: (
      state: BuilderState,
      action: PayloadAction<{
        id: string;
        values: { key: string; value: unknown }[];
      }>
    ) => {
      const { id, values } = action.payload;

      values.forEach((value) => {
        const key = value.key
          .replace("{{BREAKPOINT}}", state.currentBreakpoint)
          .replace("{{LOCALE}}", state.currentLocale);
        objectPath.set(state.content[id], `settings.${key}`, value.value);
      });
    },

    setSelectedBlockSettingsValueByKey: (
      state: BuilderState,
      action: PayloadAction<{ key: string; value: unknown }[]>
    ) => {
      const values = action.payload;

      const selectedBlockId = state.selectedBlockId;

      if (!selectedBlockId) {
        throw new Error("No selected block");
      }

      values.forEach((value) => {
        const key = value.key
          .replace("{{BREAKPOINT}}", state.currentBreakpoint)
          .replace("{{LOCALE}}", state.currentLocale);
        objectPath.set(state.content[selectedBlockId], `settings.${key}`, value.value);
      });
    },

    // Set block advance settings
    setBlockAdvancedSettings: (
      state: BuilderState,
      action: PayloadAction<{
        id: string;
        settings: AnyObject;
      }>
    ) => {
      const { id, settings } = action.payload;
      state.content[id].advancedSettings = settings;
    },

    // Set block advance settings value by key
    setBlockAdvancedSettingsValueByKey: (
      state: BuilderState,
      action: PayloadAction<{
        id: string;
        values: { key: string; value: unknown }[];
      }>
    ) => {
      const { id, values } = action.payload;

      values.forEach((value) => {
        const key = value.key
          .replace("{{BREAKPOINT}}", state.currentBreakpoint)
          .replace("{{LOCALE}}", state.currentLocale);
        objectPath.set(state.content[id], `advancedSettings.${key}`, value.value);
      });
    },

    // Set selected block advance settings value by key
    setSelectedBlockAdvancedSettingsValueByKey: (
      state: BuilderState,
      action: PayloadAction<{ key: string; value: unknown }[]>
    ) => {
      const values = action.payload;

      const selectedBlockId = state.selectedBlockId;

      if (!selectedBlockId) {
        throw new Error("No selected block");
      }

      values.forEach((value) => {
        const key = value.key
          .replace("{{BREAKPOINT}}", state.currentBreakpoint)
          .replace("{{LOCALE}}", state.currentLocale);
        objectPath.set(state.content[selectedBlockId], `advancedSettings.${key}`, value.value);
      });
    },

    // Duplicate Tab
    duplicateTab: (
      state: BuilderState,
      action: PayloadAction<{ blockId: string; parentId?: string }>
    ) => {
      const { blockId, parentId } = action.payload;

      const targetBlock = cloneDeep(state.content[blockId]);

      if (targetBlock.type !== BlockType.TABS) {
        throw new Error(`Block type is not '${BlockType.TABS}'`);
      }

      const tabs = targetBlock?.settings?.tabs as {
        id: string;
        label: string;
        children: string[];
      }[];

      const newTabs = tabs.map((tab) => {
        return {
          id: createId(),
          label: tab.label,
          children: tab.children.map((child) => {
            return {
              id: child,
              newId: createId(),
            };
          }),
        };
      });

      const newBlock = createBlock({
        ...targetBlock,
        id: createId(),
        parentId: parentId ?? targetBlock.parentId,
        children: [],
        settings: {
          ...targetBlock.settings,
          activeTabId: newTabs[0].id,
          tabs: newTabs.reduce(
            (acc, tab) => {
              acc.push({
                id: tab.id,
                label: tab.label,
                children: tab.children.map((child) => child.newId),
              });
              return acc;
            },
            [] as { id: string; label: string; children: string[] }[]
          ),
        },
      });

      state.content[newBlock.id] = newBlock;

      state.content[newBlock.parentId].children.push(newBlock.id);

      state.selectedBlockId = newBlock.id;

      // Duplicate tab children
      newTabs.forEach((tab) => {
        tab.children.forEach((child) => {
          builderSlice.caseReducers.duplicateBlock(state, {
            payload: {
              blockId: child.id,
              newId: child.newId,
              parentId: newBlock.id,
              select: false,
            },
            type: "builder/duplicateBlock",
          });
        });
      });
    },

    // Duplicate Tab Item
    duplicateTabItem: (
      state: BuilderState,
      action: PayloadAction<{ blockId: string; tabIndex: number }>
    ) => {
      const { blockId, tabIndex } = action.payload;

      const targetBlock = state.content[blockId];

      if (targetBlock.type !== BlockType.TABS) {
        throw new Error(`Block type is not '${BlockType.TABS}'`);
      }

      const tabs = targetBlock?.settings?.tabs as {
        id: string;
        label: string;
        children: string[];
      }[];

      const targetTab = tabs[tabIndex];

      if (!targetTab) {
        return;
      }

      const children = targetTab.children?.map((child) => {
        return {
          id: child,
          newId: createId(),
        };
      });

      children?.forEach((child) => {
        builderSlice.caseReducers.duplicateBlock(state, {
          payload: { blockId: child.id, newId: child.newId, select: false },
          type: "builder/duplicateBlock",
        });
      });

      const newTab = {
        id: createId(),
        label: targetTab.label,
        children: children?.map((child) => child.newId),
      };

      tabs.splice(tabIndex + 1, 0, newTab);
    },

    // Remove Tab Item
    removeTabItem: (
      state: BuilderState,
      action: PayloadAction<{ blockId: string; tabIndex: number }>
    ) => {
      const { blockId, tabIndex } = action.payload;

      const targetBlock = state.content[blockId];

      if (targetBlock.type !== BlockType.TABS) {
        throw new Error(`Block type is not '${BlockType.TABS}'`);
      }

      const tabs = targetBlock?.settings?.tabs as {
        id: string;
        label: string;
        children: string[];
      }[];

      const children = tabs[tabIndex].children;

      children.forEach((child) => {
        builderSlice.caseReducers.removeBlock(state, {
          payload: child,
          type: "builder/removeBlock",
        });
      });

      tabs.splice(tabIndex, 1);

      const activeTabIndex =
        tabIndex - 1 >= 0 ? tabIndex - 1 : tabIndex + 1 < tabs.length ? tabIndex + 1 : 0;

      targetBlock.settings.activeTabId = tabs[activeTabIndex].id;
    },
    // Copy to clipboard
    copyToClipboard: (state: BuilderState, action: PayloadAction<{ blockId: string }>) => {
      const block = state.content[action.payload.blockId];

      if (!block) {
        return;
      }

      function loadBlockChildren(children: string[]): any {
        if (!children || !children.length) {
          return [];
        }
        const childrenBlocks = children.map((childId) => {
          const block = state.content[childId];
          const clip = {
            ...block,
            children: loadBlockChildren(block.children as string[]),
          };
          return clip;
        });

        return childrenBlocks;
      }
      const children = loadBlockChildren(block.children as string[]);

      const clip = {
        ...block,
        children,
      };

      if (!navigator.clipboard) {
        // console.error('Clipboard API is not available');
        return;
      }

      navigator.clipboard
        .writeText(JSON.stringify(clip))
        .then(() => {
          // console.log('Block copied to clipboard');
        })
        .catch((err) => {
          // console.log('Failed to copy block to clipboard', err);
        });
    },
    insertFromClipboard: (
      state: BuilderState,
      action: PayloadAction<{
        data: Block;
        blockId: string;
        containerSettings: {
          settings: ContainerSettingsType;
          advancedSettings: BlockAdvancedSettings;
        };
      }>
    ) => {
      const { data, blockId, containerSettings } = action.payload;
      const closestContainer = builderSlice.caseReducers.getClosestContainerBlock(state, {
        payload: { blockId, containerSettings, data },
        type: "builder/getClosestContainerBlock",
      });

      const block = {
        ...data,
        id: createId(),
        parentId: closestContainer.id,
      };

      const blocks: Block[] = [];

      // Add children blocks recursively
      const addChildren = (block: Block, prev?: Block) => {
        if (!block || !block.children || !block.children.length) return [];
        return (block.children as Block[]).map((child) => {
          const id = createId();
          const newBlock = {
            ...child,
            id,
            parentId: block.id,
          };

          // Tabs block has a special structure
          if (prev && prev.type === BlockType.TABS) {
            prev.settings.tabs = (prev.settings.tabs as TabType[]).map((tab) => {
              return {
                ...tab,
                children: tab.children.map((c) => {
                  if (c === child.id) {
                    return id;
                  }
                  return c;
                }),
              };
            });
          }

          blocks.push({
            ...newBlock,
            children: addChildren(newBlock, child),
          });

          return newBlock.id;
        });
      };

      blocks.push({
        ...block,
        children: addChildren(block),
      });

      builderSlice.caseReducers.addBlocks(state, {
        payload: { blocks, selectedBlockId: block.id },
        type: "builder/addBlocks",
      });
    },
    // Get closest Container block
    getClosestContainerBlock: (
      state: BuilderState,
      action: PayloadAction<{
        blockId: string;
        containerSettings: {
          settings: ContainerSettingsType;
          advancedSettings: BlockAdvancedSettings;
        };
        data?: Block;
      }>
    ): any => {
      const { blockId, containerSettings, data } = action.payload;
      const block = state.content[blockId];

      if (!block) {
        const container = createBlock({
          type: BlockType.CONTAINER,
          id: createId(),
          parentId: "root",
          children: [],
          settings: containerSettings.settings,
          advancedSettings: containerSettings.advancedSettings,
        });

        builderSlice.caseReducers.addBlock(state, {
          payload: {
            block: container,
            select: false,
          },
          type: "builder/addBlock",
        });

        return container;
      }

      if (
        block.type === BlockType.CONTAINER ||
        (blockId === "root" && data?.type === BlockType.CONTAINER)
      ) {
        return block;
      } else if (blockId === "root" && data?.type !== BlockType.CONTAINER) {
        const container = createBlock({
          type: BlockType.CONTAINER,
          id: createId(),
          parentId: "root",
          children: [],
          settings: containerSettings.settings,
          advancedSettings: containerSettings.advancedSettings,
        });

        builderSlice.caseReducers.addBlock(state, {
          payload: {
            block: container,
            select: false,
          },
          type: "builder/addBlock",
        });

        return container;
      }

      return builderSlice.caseReducers.getClosestContainerBlock(state, {
        payload: { blockId: block.parentId, containerSettings },
        type: "builder/getClosestContainerBlock",
      });
    },
  },
});

export const {
  setContent,
  setHeader,
  clearContent,
  addBlock,
  addBlocks,
  updateBlock,
  duplicateBlock,
  removeBlock,
  moveBlock,
  selectBlock,
  unselectBlock,
  setCurrentBreakpoint,
  setCurrentLanguage,
  setBlockSettings,
  setBlockSettingsValueByKey,
  setSelectedBlockSettingsValueByKey,
  setBlockAdvancedSettings,
  setBlockAdvancedSettingsValueByKey,
  setSelectedBlockAdvancedSettingsValueByKey,
  duplicateTab,
  duplicateTabItem,
  removeTabItem,
  copyToClipboard,
  insertFromClipboard,
} = builderSlice.actions;
