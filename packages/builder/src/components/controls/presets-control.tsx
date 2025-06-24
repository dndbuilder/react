"use client";
import { classNames } from "@/utils";
import { HTMLAttributes } from "react";
import { useSettings } from "../../hooks/use-settings";
import { SettingsType } from "../../types";
import { Tooltip } from "../shared/tooltip";

type DesignItem<T> = {
  id: T;
  title?: string;
  image: string;
};

export type PresetsControlProps<T> = {
  fieldName?: string;
  designs: DesignItem<T>[];
} & HTMLAttributes<HTMLDivElement>;

export function PresetsControl<T extends string>({
  designs,
  fieldName = "preset.desktop",
  className,
}: PresetsControlProps<T>) {
  const [value, setValue] = useSettings<string | undefined>(
    fieldName,
    SettingsType.BLOCK
  );

  return (
    <div className={className}>
      <p className="text-xs mb-1.5">Designs</p>
      <div className="grid gap-1.5 grid-cols-1">
        {designs.map((design, index) => (
          <Tooltip key={index}>
            <Tooltip.Trigger>
              <div
                onClick={() => setValue(design.id)}
                className={classNames(
                  "rounded border-[3px] border-transparent hover:border-dark-300 cursor-pointer",
                  {
                    "border-dark-300":
                      value === design.id || (!value && index === 0),
                  }
                )}
              >
                <img src={design.image} alt="Not found" />
              </div>
              <Tooltip.Content>
                {design.title ?? `Design ${index + 1}`}
              </Tooltip.Content>
            </Tooltip.Trigger>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
