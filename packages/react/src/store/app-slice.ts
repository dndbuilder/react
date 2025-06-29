import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export enum BuilderRightPanelType {
  SETTINGS = "settings",
  LAYER = "layer",
}

export interface AppState {
  isSidebarOpen: boolean;
  isBuilderLeftPanelOpen: boolean;
  activeBuilderRightPanel: null | BuilderRightPanelType;
}

const initialState: AppState = {
  isSidebarOpen: false,
  isBuilderLeftPanelOpen: true,
  activeBuilderRightPanel: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsSidebarOpen: (state: AppState, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleBuilderLeftPanel: (state: AppState) => {
      state.isBuilderLeftPanelOpen = !state.isBuilderLeftPanelOpen;
    },
    toggleBuilderRightPanel: (
      state: AppState,
      action: { payload: AppState["activeBuilderRightPanel"] }
    ) => {
      if (state.activeBuilderRightPanel === action.payload) state.activeBuilderRightPanel = null;
      else state.activeBuilderRightPanel = action.payload;
    },
  },
});

export const { setIsSidebarOpen, toggleBuilderLeftPanel, toggleBuilderRightPanel } =
  appSlice.actions;

export const getIsSidebarOpen = (state: RootState) => state.app.isSidebarOpen;

export const getIsBuilderLeftPenelOpen = (state: RootState) => state.app.isBuilderLeftPanelOpen;

export const getActiveBuilderRightPanel = (state: RootState) => state.app.activeBuilderRightPanel;
