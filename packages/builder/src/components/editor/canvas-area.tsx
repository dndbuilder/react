import AddNewSection from "@/components/base/add-new-section";
import EditorRenderContent from "@/components/base/editor-render-content";
import EditorStyleManager from "@/components/base/editor-style-manager";
import { FrameContextManager } from "@/components/base/frame-context-manager";
import ClientOnlyRenderFrame from "@/components/base/render-frame";
import { ErrorFallback } from "@/components/shared/error-fallback";
import { BreakpointConfiguration } from "@/config/breakpoints.config";
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

const CanvasArea: FC = () => {
  const content = useAppSelector(getContent);

  const themeSettings = useAppSelector(getActiveThemeSettings);

  const { isLeftPanelOpen } = useActionContext();

  const { activeRightPanel } = useActionContext();

  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);

  const currentLocale = useAppSelector(getCurrentLocale);

  const { previewWidth } =
    BreakpointConfiguration.getBreakpoint(currentBreakpoint);

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
        "relative flex grow justify-center p-4 transition-all duration-300 bg-slate-100",
        !isLeftPanelOpen ? "ms-0" : "ms-[290px]",
        !activeRightPanel ? "me-0" : "me-[290px]"
      )}
    >
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <div
          className={classNames(
            "relative flex h-full w-full border shadow-sm transition-width duration-300"
          )}
          onClick={handleUnselect}
          ref={frameWrapperRef}
          style={{
            width:
              currentBreakpoint === Breakpoint.DESKTOP
                ? "100%"
                : `${previewWidth}px`,
          }}
        >
          <ClientOnlyRenderFrame
            className="absolute mx-auto"
            style={frameStyles}
          >
            <FrameContextManager>
              <EditorRenderContent content={content} meta={meta} />

              <AddNewSection className="p-10" />

              <EditorStyleManager
                content={content}
                themeSettings={themeSettings}
              />

              <script src="/scripts/drawer.js" defer />
            </FrameContextManager>
          </ClientOnlyRenderFrame>
        </div>
      </ErrorBoundary>

      {/* Overlay */}
      {/* <div className="fixed left-0 top-0 z-111 flex h-screen w-screen items-center justify-center bg-[#00000095] text-white lg:hidden">
        Resize your browser to be at least 1024px wide to get back into design
        mode.
      </div> */}
    </div>
  );
};

export default CanvasArea;
