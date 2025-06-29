"use client";

import * as React from "react";
import { JSX, useEffect, useRef } from "react";
import deepEqual from "fast-deep-equal";

function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>");
}

function replaceCaret(el: HTMLElement) {
  // Only run in browser environment
  if (typeof document === "undefined" || typeof window === "undefined") return;

  try {
    // Place the caret at the end of the element
    const target = document.createTextNode("");
    el.appendChild(target);

    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      const sel = window.getSelection();
      if (sel !== null) {
        const range = document.createRange();
        range.setStart(target, target.nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (el instanceof HTMLElement) el.focus();
    }
  } catch (error) {
    console.error("Error in replaceCaret:", error);
  }
}

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
  target: { value: string };
};
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<
  JSX.IntrinsicElements["div"],
  { onChange: (event: ContentEditableEvent) => void }
>;

export interface Props extends DivProps {
  html: string;
  disabled?: boolean;
  tagName?: string;
  className?: string;
  style?: Object;
  innerRef?: React.RefObject<HTMLElement> | Function;
  placeholder?: string;
}

/**
 * A simple component for an html element with editable contents.
 */
export const ContentEditable = (props: Props) => {
  const { tagName, html, innerRef, ...restProps } = props;

  const lastHtmlRef = useRef<string>(html);
  const defaultRef = useRef<HTMLElement | null>(null);

  const getEl = () => {
    if (innerRef) {
      return typeof innerRef === "function" ? null : innerRef.current;
    }
    return defaultRef.current;
  };

  const emitChange = (originalEvt: React.SyntheticEvent<any>) => {
    const el = getEl();
    if (!el) return;

    const html = el.innerHTML;
    if (props.onChange && html !== lastHtmlRef.current) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html,
        },
      });
      props.onChange(evt);
    }
    lastHtmlRef.current = html;
  };

  useEffect(() => {
    const el = getEl();
    if (!el) return;

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (props.html !== el.innerHTML) {
      el.innerHTML = props.html;
    }
    lastHtmlRef.current = props.html;
    replaceCaret(el);
  }, [props.html]);

  // Handle the ref based on whether innerRef is a function or object
  const refCallback =
    typeof innerRef === "function"
      ? (current: HTMLElement) => {
          innerRef(current);
          defaultRef.current = current;
        }
      : innerRef || defaultRef;

  return React.createElement(
    tagName || "div",
    {
      ...restProps,
      ref: refCallback,
      onInput: emitChange,
      onBlur: props.onBlur || emitChange,
      onKeyUp: props.onKeyUp || emitChange,
      onKeyDown: props.onKeyDown || emitChange,
      contentEditable: !props.disabled,
      dangerouslySetInnerHTML: { __html: html },
    },
    props.children
  );
};

export default React.memo(ContentEditable, (prevProps, nextProps) => {
  const el = prevProps.innerRef
    ? typeof prevProps.innerRef !== "function"
      ? prevProps.innerRef.current
      : null
    : null;

  // We need not rerender if the change of props simply reflects the user's edits.
  // Rerendering in this case would make the cursor/caret jump

  // Rerender if there is no element yet... (somehow?)
  if (!el) return false; // Returning false means the component should update

  // ...or if html really changed... (programmatically, not by user edit)
  if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
    return false; // Component should update
  }

  // Handle additional properties
  return (
    prevProps.disabled === nextProps.disabled &&
    prevProps.tagName === nextProps.tagName &&
    prevProps.className === nextProps.className &&
    prevProps.innerRef === nextProps.innerRef &&
    prevProps.placeholder === nextProps.placeholder &&
    deepEqual(prevProps.style, nextProps.style)
  );
});
