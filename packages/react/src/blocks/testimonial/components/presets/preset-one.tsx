"use client";

import { PresetPropsType } from "@/blocks/testimonial/types";
import { Rating } from "@/components/shared/rating";
import { FC } from "react";
import { MdFaceRetouchingNatural } from "react-icons/md";

const PresetOne: FC<PresetPropsType> = ({ data, meta }) => {
  const locale = meta?.locale || "en";

  const name = data.name?.[locale];

  const position = data.position?.[locale];

  const content = data.content?.[locale];

  return (
    <figure className="testimonial-card">
      <blockquote className="review-msg text-dark-800 text-lg tracking-tight">
        <p>{content}</p>
      </blockquote>

      {data.showRating && (
        <div className="text-dark-700 mt-3 flex gap-x-1">
          <Rating count={5} value={data.rating ?? 0} size={14} />
        </div>
      )}

      <figcaption className="mt-4 flex items-center gap-x-6">
        {/* Image */}
        <div className="image-wrapper flex h-12 w-12 items-center justify-center rounded-full border">
          {data.image ? (
            <img
              className="bg-dark-50 h-full w-full rounded-full"
              src={data.image.url}
              alt={name}
            />
          ) : (
            <MdFaceRetouchingNatural className="text-dark-400 text-lg" />
          )}
        </div>

        <div className="text-sm leading-4">
          {/* Name */}
          <div className="text-dark-900 font-semibold">{name}</div>

          {/* Positio */}
          {position && <div className="text-dark-600 mt-0.5">{position}</div>}
        </div>
      </figcaption>
    </figure>
  );
};

export default PresetOne;
