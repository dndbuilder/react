"use client";
import { classNames } from "@/utils";
import { FC, ReactNode, useEffect, useState } from "react";
import Frame, { type FrameProps } from "./frame";

export type RenderFrameProps = {
  children: ReactNode;
} & FrameProps;

export const RenderFrame: FC<RenderFrameProps> = ({ children, className, ...rest }) => {
  const [frameContent, setFrameContent] = useState<string | null>();

  useEffect(() => {
    // Create html document
    const html = document.implementation.createHTMLDocument();
    html.documentElement.setAttribute("class", "h-full");
    html.body.setAttribute("class", "h-full");
    //   Add builder styles
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach((link) => {
      html.head.appendChild(link.cloneNode(true));
    });
    setFrameContent(html.documentElement.outerHTML);
  }, []);

  if (!frameContent) return null;

  return (
    <Frame
      initialContent={frameContent}
      className={classNames("h-full w-full", className)}
      {...rest}
    >
      {children}
    </Frame>
  );
};

/**
 * Client-side only wrapper for RenderFrame to prevent hydration mismatches
 * in server-side rendering environments like Next.js.
 *
 * This component uses the useEffect hook to initialize browser-specific code
 * only on the client side, and ensures the initial server render matches
 * what will be rendered on the client before any effects run.
 */
export function ClientOnlyRenderFrame({ children, ...props }: RenderFrameProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return <RenderFrame {...props}>{children}</RenderFrame>;
}

export default ClientOnlyRenderFrame;
