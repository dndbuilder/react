import { ActionProvider } from "@/contexts/action-context";
import { store } from "@/store";
import { Block } from "@/types/block";
import { FC } from "react";
import { Provider } from "react-redux";
import Editor from "./editor";

type BuilderProps = {
  content: Record<string, Block>;
};

const Builder: FC<BuilderProps> = ({ content }) => {
  return (
    <>
      <Provider store={store}>
        <ActionProvider>
          <Editor content={content} />
        </ActionProvider>
      </Provider>
    </>
  );
};

export default Builder;
