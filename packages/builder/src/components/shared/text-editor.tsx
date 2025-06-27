"use client";

import "@/assets/styles/text-editor.css";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect, useState } from "react";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaStrikethrough,
  FaUnlink,
} from "react-icons/fa";

export interface TextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const TextEditor: FC<TextEditorProps> = ({
  value,
  onChange,
  placeholder,
  className,
  ...props
}) => {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  // Update content when value prop changes
  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const setLink = () => {
    if (!linkUrl) return;

    // Check if the URL has a protocol, if not add https://
    const url =
      linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
        ? linkUrl
        : `https://${linkUrl}`;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLink();
    }
  };

  return (
    <div className={`tiptap-editor ${className || ""}`}>
      <div className="tiptap-toolbar">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "is-active" : ""}
          type="button"
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "is-active" : ""}
          type="button"
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={editor?.isActive("strike") ? "is-active" : ""}
          type="button"
          title="Strike"
        >
          <FaStrikethrough />
        </button>

        <span className="tiptap-toolbar-divider"></span>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor?.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
          type="button"
          title="Heading 1"
        >
          <FaHeading className="text-lg" />
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor?.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
          type="button"
          title="Heading 2"
        >
          <FaHeading className="text-sm" />
        </button>

        <span className="tiptap-toolbar-divider"></span>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? "is-active" : ""}
          type="button"
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderedList") ? "is-active" : ""}
          type="button"
          title="Ordered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive("blockquote") ? "is-active" : ""}
          type="button"
          title="Blockquote"
        >
          <FaQuoteLeft />
        </button>

        <span className="tiptap-toolbar-divider"></span>

        {!showLinkInput ? (
          <>
            <button
              onClick={() => {
                if (editor?.isActive("link")) {
                  editor.chain().focus().unsetLink().run();
                } else {
                  setShowLinkInput(true);
                }
              }}
              className={editor?.isActive("link") ? "is-active" : ""}
              type="button"
              title={editor?.isActive("link") ? "Unlink" : "Link"}
            >
              {editor?.isActive("link") ? <FaUnlink /> : <FaLink />}
            </button>
          </>
        ) : (
          <div className="tiptap-link-input-container">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              onKeyDown={handleKeyDown}
              className="tiptap-link-input"
              autoFocus
            />
            <button onClick={setLink} className="tiptap-link-button">
              Apply
            </button>
            <button
              onClick={() => {
                setLinkUrl("");
                setShowLinkInput(false);
              }}
              className="tiptap-link-button"
            >
              Cancel
            </button>
          </div>
        )}

        <span className="tiptap-toolbar-divider"></span>
      </div>
      <EditorContent editor={editor} {...props} />
    </div>
  );
};
