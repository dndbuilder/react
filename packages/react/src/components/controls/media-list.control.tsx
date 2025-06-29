"use client";
import { Label } from "@/components/shared/label";
import { Input } from "@/components/shared/input";
import { ScrollArea } from "@/components/shared/scroll-area";
import { FC } from "react";

interface MediaListProps {
  onImageSelect: (image: string) => void;
}

export const MediaList: FC<MediaListProps> = ({ onImageSelect }) => {
  // Generate some fake images for the list
  const images = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/${i + 1}/400/200`,
  }));

  return (
    <div>
      <Label className="ms-auto block w-[200px]">
        <span>Search</span>
        <Input className="mt-1.5" />
      </Label>

      <div className="mt-4">
        <ScrollArea className="h-[calc(90vh-160px)]">
          <div className="grid grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image.id} onDoubleClick={() => onImageSelect(image.src)}>
                <div
                  className="relative w-full cursor-pointer overflow-hidden bg-slate-300 transition duration-200 hover:bg-slate-400 hover:shadow-xl"
                  style={{ paddingBottom: "100%" }}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={image.src}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
