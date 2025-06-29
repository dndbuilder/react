// Popover scroll behavior
export const handlePopoverScroll = (
  open: boolean,
  rootEl: HTMLElement | null,
  popoverHeight: number = 470
): void => {
  if (!rootEl) return;

  const panelScrollEl = rootEl.closest<HTMLDivElement>(".panel-scroll-content");
  const scrollAreaEl = panelScrollEl?.closest<HTMLDivElement>("[data-radix-scroll-area-viewport]");

  if (!panelScrollEl || !scrollAreaEl) return;

  if (open) {
    const elementRect = rootEl.getBoundingClientRect();
    const scrollAreaRect = scrollAreaEl.getBoundingClientRect();

    // Check if there's enough space below the element in viewport
    const spaceBelow = window.innerHeight - elementRect.bottom;

    if (spaceBelow < popoverHeight) {
      // Not enough space - add padding and scroll
      panelScrollEl.style.paddingBottom = `${popoverHeight + 20}px`; // +20px buffer

      // Scroll the element up to make room
      const elementTop = elementRect.top - scrollAreaRect.top + scrollAreaEl.scrollTop;
      const scrollTarget =
        elementTop - Math.max(20, (scrollAreaEl.clientHeight - popoverHeight) / 2);

      scrollAreaEl.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: "smooth",
      });
    }
  } else {
    // Clean up when closing
    panelScrollEl.style.paddingBottom = "0px";
  }
};
