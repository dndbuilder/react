"use client";

import { FC } from "react";

export type RenderIconProps = {
  iconSet?: string;
  iconName?: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const RenderIcon: FC<RenderIconProps> = ({
  iconName,
  iconSet,
  size,
  color,
  className,
  style,
  ...props
}) => {
  if (!iconSet || !iconName) {
    return null;
  }

  const iconString = `${iconSet}:${iconName}`;

  return (
    <>
      {/* @ts-expect-error: Custom web component, not recognized by TSX */}
      <iconify-icon
        icon={iconString}
        width={size}
        height={size}
        color={color}
        class={className}
        style={style}
        {...props}
      />
    </>
  );
};
