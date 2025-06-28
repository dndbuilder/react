"use client";

import AddNewSection from "@/components/base/add-new-section";
import EditorRenderContent from "@/components/base/editor-render-content";
import { EditorStyleManager } from "@/components/base/editor-style-manager";
import { FrameContextManager } from "@/components/base/frame-context-manager";
import { RenderFrame } from "@/components/base/render-frame";
import { ErrorFallback } from "@/components/shared/error-fallback";
import { BuilderConfiguration } from "@/config/builder.config";
import { useActionContext } from "@/contexts/action-context";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { unselectBlock } from "@/store/builder-slice";
import {
  getActiveThemeSettings,
  getContent,
  getCurrentBreakpoint,
  getCurrentLocale,
} from "@/store/selectors";
import { Breakpoint } from "@/types/responsive";
import { classNames } from "@/utils";
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const CanvasArea: FC = () => {
  const content = useAppSelector(getContent);

  const themeSettings = useAppSelector(getActiveThemeSettings);

  const { isLeftPanelOpen } = useActionContext();

  const { activeRightPanel } = useActionContext();

  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);

  const currentLocale = useAppSelector(getCurrentLocale);

  const { previewWidth } = BuilderConfiguration.getBreakpoint(currentBreakpoint);

  const frameWrapperRef = useRef<HTMLDivElement>(null);

  const [frameStyles, setFrameStyles] = useState<CSSProperties>({});

  const dispatch = useAppDispatch();

  const handleUnselect = () => {
    dispatch(unselectBlock());
  };

  const meta = useMemo(() => ({ locale: currentLocale }), [currentLocale]);

  useEffect(() => {
    if (!frameWrapperRef.current) return;

    const frameWrapper = frameWrapperRef.current;

    const observer = new ResizeObserver((entries) => {
      const element = entries[0].target;

      const { width, height } = window.getComputedStyle(element);

      const wrapperWidth = parseInt(width, 10);

      const wrapperHeight = parseInt(height, 10);

      const frameScale = wrapperWidth / previewWidth;

      const frameHeight = wrapperHeight / frameScale;

      if (frameScale > 1) {
        setFrameStyles({
          width: "100%",
          minWidth: `${previewWidth}px`,
          height: `100%`,
        });
        return;
      }

      setFrameStyles({
        width: `${previewWidth}px`,
        height: `${frameHeight}px`,
        transform: frameScale > 1 ? "scale(1)" : `scale(${frameScale})`,
        transformOrigin: "top left",
      });
    });

    observer.observe(frameWrapper);

    return () => {
      observer.disconnect();
    };
  }, [previewWidth]);

  return (
    <div
      className={classNames(
        "relative flex grow justify-center bg-slate-100 p-4 transition-all duration-300",
        !isLeftPanelOpen ? "ms-0" : "ms-[290px]",
        !activeRightPanel ? "me-0" : "me-[290px]"
      )}
    >
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <div
          className={classNames(
            "transition-width relative flex h-full w-full border border-slate-200 shadow-sm duration-300"
          )}
          onClick={handleUnselect}
          ref={frameWrapperRef}
          style={{
            width: currentBreakpoint === Breakpoint.DESKTOP ? "100%" : `${previewWidth}px`,
          }}
        >
          <RenderFrame className="absolute mx-auto" style={frameStyles}>
            <FrameContextManager>
              <EditorRenderContent content={content} meta={meta} />

              <AddNewSection className="p-10" />

              <EditorStyleManager content={content} themeSettings={themeSettings} />
            </FrameContextManager>
          </RenderFrame>
        </div>
      </ErrorBoundary>
    </div>
  );
};
