"use client";

import { BlockProps } from "@dndbuilder.com/react";
import { FC } from "react";
import { CardSettingsType } from "../types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CardBlock: FC<BlockProps<CardSettingsType>> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  return (
    <Card className="card w-[350px] overflow-hidden transition-all duration-300">
      {settings.image && (
        <Image
          src={settings.image.url || ""}
          alt={settings.image.altText || "Card Image"}
          width={settings.image.originalHeight || 350}
          height={settings.image.originalWidth || 350}
          className="card-image mb-4 object-cover"
        />
      )}

      <Card.Content className="card-content">
        <Card.Title className="card-title">
          {settings.title?.text?.[locale] || "Card Title"}
        </Card.Title>

        <Card.Description className="card-description">
          {settings.description?.content?.[locale] || "Card Description"}
        </Card.Description>

        {settings.link && (
          <Link
            href={settings.link.url || "#"}
            className="card-link reset-style mt-4 inline-block rounded bg-slate-800 px-4 py-1.5 text-gray-50 transition-all duration-300 hover:bg-slate-900 hover:text-gray-100"
          >
            {settings.link.text?.[locale]}
          </Link>
        )}
      </Card.Content>
    </Card>
  );
};

export default CardBlock;
