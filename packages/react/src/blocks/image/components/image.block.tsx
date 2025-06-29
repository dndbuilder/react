"use client";

import { BlockProps } from "@/types/block";
import { FC } from "react";
import { ImageSettingsType } from "../types";
import { generateImageUrl } from "@/utils";
import placeholder from "@/assets/images/placeholder.png";

const ImageBlock: FC<BlockProps<ImageSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";
  const captionText = settings.caption?.text?.[locale];

  const img = (
    <>
      <img
        width={settings.media?.width ?? 500}
        height={settings.media?.height ?? 500}
        src={
          settings.media?.path
            ? generateImageUrl(settings.media.path)
            : (settings.media?.url ?? placeholder)
        }
        alt={settings.media?.name ?? "image"}
      />
      {captionText && <figcaption className="block-img-caption">{captionText}</figcaption>}
    </>
  );

  return (
    <figure className="block-img">
      {settings.link?.url ? (
        <a
          href={settings.link?.url}
          rel={settings.link.nofollow ? "nofollow" : undefined}
          target={settings.link.newWindow ? "_blank" : undefined}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </figure>
  );
};

export default ImageBlock;
