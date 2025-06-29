import { FC } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { PresetPropsType } from "../../types";

const PresetTwo: FC<PresetPropsType> = ({ data, meta }) => {
  const locale = meta?.locale || "en";

  const name = data.name?.[locale];

  const position = data.position?.[locale];

  const content = data.content?.[locale];

  return (
    <figure className="testimonial-card">
      {data.showRating && (
        <div className="text-dark-700 mb-3 flex items-center gap-x-1">
          {data.rating}
          <BsStarFill className="text-yellow-400" />
        </div>
      )}

      <blockquote className="review-msg text-dark-800 text-lg tracking-tight">
        <p>{content}</p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-x-6">
        {/* Image wrapper */}
        <div className="image-wrapper flex h-12 w-12 items-center justify-center rounded-full border">
          {data.image ? (
            <img className="bg-dark-50 rounded-full" src={data.image.url} alt={name} />
          ) : (
            <MdFaceRetouchingNatural className="text-dark-400 text-lg" />
          )}
        </div>

        <div className="text-sm leading-4">
          {/* Name */}
          <div className="text-dark-900 font-semibold">{name}</div>

          {/* Position / Title */}
          {position && <div className="text-dark-600 mt-0.5">{position}</div>}
        </div>
      </figcaption>
    </figure>
  );
};

export default PresetTwo;
