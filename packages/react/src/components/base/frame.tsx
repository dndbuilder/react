"use client";
import { FrameContextProvider } from "@/contexts/frame-context";
import React, {
  FunctionComponent,
  IframeHTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
} from "react";
import ReactDOM from "react-dom";

export type FrameProps = {
  style?: React.CSSProperties;
  head?: ReactNode;
  initialContent?: string;
  mountTarget?: string;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
  children?: ReactElement | ReactElement[];
} & IframeHTMLAttributes<HTMLIFrameElement>;

const Frame: FunctionComponent<FrameProps> = ({
  style = {},
  head,
  initialContent = '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
  mountTarget,
  contentDidMount = () => {},
  contentDidUpdate = () => {},
  children,
  ...otherProps
}) => {
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const nodeRef = React.useRef<HTMLIFrameElement | null>(null);

  const handleLoad = () => {
    clearInterval(loadCheck);
    if (!iframeLoaded) {
      setIframeLoaded(true);
    }
  };

  const loadCheck = setInterval(() => {
    handleLoad();
  }, 500);

  React.useEffect(() => {
    if (!nodeRef.current) return;

    const doc = nodeRef.current?.contentDocument;

    if (doc) {
      nodeRef.current.contentWindow?.addEventListener("DOMContentLoaded", handleLoad);

      return () => {
        nodeRef.current?.contentWindow?.removeEventListener("DOMContentLoaded", handleLoad);
      };
    }
  }, []);

  const getDoc = (): Document | null => (nodeRef.current ? nodeRef.current.contentDocument : null);

  const getWin = () => {
    const doc = getDoc();
    return doc?.defaultView;
  };

  const renderFrameContents = () => {
    if (!nodeRef.current) {
      return null;
    }

    const doc = getDoc();

    if (!doc) {
      return null;
    }

    const win = getWin();

    if (!win) {
      return null;
    }

    const contents = (
      <Content contentDidMount={contentDidMount} contentDidUpdate={contentDidUpdate}>
        <FrameContextProvider value={{ document: doc, window: win }}>
          {children}
        </FrameContextProvider>
      </Content>
    );
    return [ReactDOM.createPortal(head, doc.head), ReactDOM.createPortal(contents, doc.body)];
  };

  return (
    <iframe {...otherProps} style={style} ref={nodeRef} onLoad={handleLoad} srcDoc={initialContent}>
      {iframeLoaded && renderFrameContents()}
    </iframe>
  );
};

interface ContentProps {
  children: ReactNode;
  contentDidMount: () => void;
  contentDidUpdate: () => void;
}

const Content: React.FC<ContentProps> = ({ children, contentDidMount, contentDidUpdate }) => {
  useEffect(() => {
    contentDidMount();
    return () => {
      contentDidUpdate();
    };
  }, [contentDidMount, contentDidUpdate]);

  return React.Children.only(children);
};

export default Frame;
