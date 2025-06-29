import { combineReducers, configureStore } from "@reduxjs/toolkit";

import undoable from "redux-undo";
import { appSlice } from "./app-slice";
import { builderSlice } from "./builder-slice";
import { themeSlice } from "./theme-slice";

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [builderSlice.name]: undoable(builderSlice.reducer, {
    filter: function filterActions(action) {
      return action.type.includes("builder");
    },
  }),
  [themeSlice.name]: themeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
