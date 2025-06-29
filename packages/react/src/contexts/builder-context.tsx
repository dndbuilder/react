"use client";

import { store } from "../store";
import { Provider } from "react-redux";
import { ActionProvider } from "./action-context";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type BuilderContextType = {
  store: typeof store;
  children: React.ReactNode;
};

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export const BuilderProvider = ({ store, children }: BuilderContextType) => {
  return (
    <Provider store={store}>
      <ActionProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ActionProvider>
    </Provider>
  );
};
