"use client";

import { BannerSettingsType } from "@/blocks/banner/types";
import { BlockProps } from "@/types/block";
import { FC } from "react";

const Banner: FC<BlockProps<BannerSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  const title = settings.title?.text?.[locale];
  const subTitle = settings.subTitle?.text?.[locale];
  const description = settings.description?.text?.[locale];
  const buttonText = settings.button?.text?.[locale];

  return (
    <div className="banner">
      <div className="content">
        {title?.trim() !== "" && <div className="sub-title ">{title}</div>}
        {subTitle?.trim() !== "" && <div className="title">{subTitle}</div>}
        {description?.trim() !== "" && <div className="description">{description}</div>}

        {buttonText?.trim() !== "" && (
          <div className="button-wrapper">
            {settings.button?.link?.url ? (
              <a
                href={settings.button?.link.url}
                target={settings.button?.link?.newWindow ? "_blank" : undefined}
                rel={settings.button?.link?.nofollow ? "nofollow" : undefined}
              >
                <button className="btn">{buttonText}</button>
              </a>
            ) : (
              <button className="btn">{buttonText}</button>
            )}
          </div>
        )}
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Banner;
