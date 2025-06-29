import { ButtonSettingsType } from "../types";
import { BlockProps } from "@/types/block";
import { FC } from "react";

const Button: FC<BlockProps<ButtonSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";
  const buttonText = settings.text?.[locale];

  return (
    <div className="button-wrapper">
      {settings.link?.url ? (
        <a
          href={settings.link.url}
          target={settings.link.newWindow ? "_blank" : undefined}
          rel={settings.link.nofollow ? "nofollow" : undefined}
          className="btn transition-colors duration-300"
        >
          {buttonText}
        </a>
      ) : (
        <button className="btn transition-colors duration-300">{buttonText}</button>
      )}
    </div>
  );
};

export default Button;
