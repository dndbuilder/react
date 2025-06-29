"use client";

import { BreakpointSelector } from "@/components/shared/breakpoint-selector";
import { Label } from "@/components/shared/label";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useSettings } from "@/hooks/use-settings";
import { getCurrentBreakpoint } from "@/store/selectors";
import { SettingsType } from "@/types";
import { classNames, fileToBase64, generateUniqueId } from "@/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";

import { Media } from "@/types/media";
import { ChangeEvent, FC, HTMLAttributes, useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { BsTrash, BsUpload } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { HiPlusCircle } from "react-icons/hi";
import { Button } from "../shared/button";

export type MediaProps = {
  label?: string;
  type: SettingsType;
  fieldName: string;
  mode?: string;
  responsive?: boolean;
  multiple?: boolean;
  helpText?: string;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
} & HTMLAttributes<HTMLDivElement>;

export const MediaControl: FC<MediaProps> = ({
  label,
  responsive,
  type,
  fieldName,
  mode,
  className,
  multiple,
  helpText,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<Media | undefined>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const [open, setOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle URL input change
  const handleUrlInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setError(null);
  };

  // Handle URL submission
  const handleUrlSubmit = async () => {
    if (!urlInput) {
      setError("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch the image to check its size
      const response = await fetch(urlInput);
      const blob = await response.blob();

      // Check if the image size exceeds the limit
      if (blob.size > maxSize) {
        setError(`File size exceeds the limit of ${maxSize / 1024 / 1024}MB.`);
        return;
      }

      // Convert blob to base64
      const base64Data = await fileToBase64(blob as File);

      // Create new media object
      const newMedia: Media = {
        id: generateUniqueId(),
        url: urlInput,
        source: "url",
        base64Data,
        size: blob.size,
        updatedAt: new Date().toISOString(),
      };

      setValue(newMedia);
      setOpen(false);
      setUrlInput("");
    } catch (err) {
      setError("Failed to load image from URL. Please check the URL and try again.");
      console.error("Error loading image from URL:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file drop
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsLoading(true);
        setError(null);

        if (acceptedFiles.length === 0) {
          return;
        }

        const file = acceptedFiles[0];

        // Convert file to base64
        const base64Data = await fileToBase64(file);

        // Create new media object
        const newMedia: Media = {
          id: generateUniqueId(),
          url: URL.createObjectURL(file),
          source: "local",
          base64Data,
          name: file.name,
          size: file.size,
          updatedAt: new Date().toISOString(),
        };

        setValue(newMedia);
        setOpen(false);
      } catch (err) {
        setError("Failed to process the image. Please try again.");
        console.error("Error processing image:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [setValue]
  );

  // Handle rejected files
  const onDropRejected = useCallback(
    (fileRejections: any[]) => {
      if (fileRejections.length === 0) return;

      const rejection = fileRejections[0];
      const errorCode = rejection.errors[0]?.code;

      if (errorCode === "file-too-large") {
        setError(`File size exceeds the limit of ${maxSize / 1024 / 1024}MB.`);
      } else if (errorCode === "file-invalid-type") {
        setError("File type not supported. Please upload a valid image file.");
      } else {
        setError("File upload failed. Please try again with a different file.");
      }
    },
    [maxSize]
  );

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxSize,
    maxFiles,
  });

  return (
    <div className={classNames("mt-4 grid w-full gap-1.5", className)}>
      {label && (
        <Label className="flex flex-1 items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div className="group relative h-32 w-full cursor-pointer overflow-hidden bg-slate-300 transition duration-200 hover:bg-slate-400">
            {value?.url && (
              <img
                src={value.url}
                alt={value?.altText ?? ""}
                className="h-full w-full object-contain"
              />
            )}

            {!value?.url && (
              <div className="flex h-full w-full items-center justify-center text-2xl text-white">
                <HiPlusCircle />
              </div>
            )}
            <div className="absolute bottom-[-100%] flex w-full justify-between bg-slate-700 p-1 text-center text-xs text-slate-50 transition-all duration-200 group-hover:bottom-0">
              <span>Choose Image</span>

              {value?.url && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(undefined);
                  }}
                  className="p-0.5"
                >
                  <BsTrash className="hover:text-danger-500" />
                </button>
              )}
            </div>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlay-show fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)]" />
          <Dialog.Content className="data-[state=open]:animate-content-show fixed left-[50%] top-[50%] z-[60] max-h-[600px] w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white focus:outline-none">
            <Dialog.Title className="flex justify-between border-b p-4">
              <p className="text-base font-semibold">Upload Image</p>

              <Dialog.Close className="cursor-pointer">
                <FiX />
              </Dialog.Close>
            </Dialog.Title>

            <Tabs.Root defaultValue="url" className="flex flex-col">
              <Tabs.List className="flex border-b">
                <Tabs.Trigger
                  value="url"
                  className="border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-slate-500 data-[state=active]:font-semibold"
                >
                  From URL
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="local"
                  className="border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-slate-500 data-[state=active]:font-semibold"
                >
                  From Device
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="url" className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <input
                    id="image-url"
                    type="url"
                    value={urlInput}
                    onChange={handleUrlInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded px-3 py-2 text-sm ring-1 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                  />
                </div>

                {error && <p className="text-danger-500 text-sm">{error}</p>}

                <Button onClick={handleUrlSubmit} disabled={isLoading} className="w-full">
                  {isLoading ? "Loading..." : "Upload Image"}
                </Button>
              </Tabs.Content>

              <Tabs.Content value="local" className="flex flex-col gap-4 p-4">
                <div
                  {...getRootProps()}
                  className={classNames(
                    "cursor-pointer rounded border-2 border-dashed p-8 text-center transition-colors",
                    isDragActive
                      ? "border-slate-600 bg-slate-50"
                      : "border-slate-300 hover:border-slate-600"
                  )}
                >
                  <input {...getInputProps()} />
                  <BsUpload className="mx-auto mb-2 text-3xl text-slate-400" />
                  <p className="text-sm text-slate-600">
                    {isDragActive
                      ? "Drop the image here"
                      : "Drag and drop an image here, or click to select"}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Supported formats: JPG, PNG, GIF, WEBP (Max size: {maxSize / 1024 / 1024}MB)
                  </p>
                </div>

                {error && <p className="text-danger-500 text-sm">{error}</p>}

                {isLoading && <p className="text-center">Loading...</p>}
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
