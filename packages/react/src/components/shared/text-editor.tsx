"use client";

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
import { classNames } from "@/utils";

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
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-slate prose-sm min-h-[150px] outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      // html = html.replaceAll(/<p><\/p>/g, '<p><br class="ProseMirror-trailingBreak"></p>');
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

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
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
    <div
      className={classNames(
        "flex flex-col overflow-hidden rounded-md border border-slate-200",
        className
      )}
    >
      <div
        className={classNames(
          "flex flex-wrap items-center border-b border-slate-200 bg-slate-50 p-2"
        )}
      >
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("bold"),
            }
          )}
          type="button"
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("italic"),
            }
          )}
          type="button"
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("strike"),
            }
          )}
          type="button"
          title="Strike"
        >
          <FaStrikethrough />
        </button>

        <span className={classNames("mx-2 h-6 w-px bg-slate-200")}></span>

        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("heading", { level: 1 }),
            }
          )}
          type="button"
          title="Heading 1"
        >
          <FaHeading className="text-lg" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("heading", { level: 2 }),
            }
          )}
          type="button"
          title="Heading 2"
        >
          <FaHeading className="text-sm" />
        </button>

        <span className={classNames("mx-2 h-6 w-px bg-slate-200")}></span>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("bulletList"),
            }
          )}
          type="button"
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("orderedList"),
            }
          )}
          type="button"
          title="Ordered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={classNames(
            "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
            {
              "bg-slate-200 font-medium text-slate-800": editor?.isActive("blockquote"),
            }
          )}
          type="button"
          title="Blockquote"
        >
          <FaQuoteLeft />
        </button>

        <span className={classNames("mx-2 h-6 w-px bg-slate-200")}></span>

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
              className={classNames(
                "mb-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-sm text-slate-600 hover:bg-slate-200",
                {
                  "bg-slate-200 font-medium text-slate-800": editor?.isActive("link"),
                }
              )}
              type="button"
              title={editor?.isActive("link") ? "Unlink" : "Link"}
            >
              {editor?.isActive("link") ? <FaUnlink /> : <FaLink />}
            </button>
          </>
        ) : (
          <div className={classNames("mr-2 flex w-full flex-col gap-2")}>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              onKeyDown={handleKeyDown}
              className={classNames(
                "placeholder:xs w-full rounded border border-slate-200 p-1 px-2 text-sm outline-none"
              )}
              autoFocus
            />
            <div className={classNames("flex gap-1")}>
              <button
                onClick={setLink}
                className={classNames(
                  "text-whit mr-1 cursor-pointer rounded bg-slate-800 p-1 px-2 text-xs hover:bg-slate-900 focus:bg-slate-900"
                )}
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setLinkUrl("");
                  setShowLinkInput(false);
                }}
                className={classNames(
                  "mr-1 cursor-pointer rounded border border-slate-200 bg-slate-100 p-1 px-2 text-xs hover:bg-slate-200"
                )}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <span className={classNames("mx-2 h-6 w-px bg-slate-200")}></span>
      </div>
      <EditorContent editor={editor} {...props} />
    </div>
  );
};
