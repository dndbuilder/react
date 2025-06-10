import { FC } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { PresetPropsType } from '../../types';

const PresetTwo: FC<PresetPropsType> = ({ data, meta: { locale } }) => {
  const name = data.name?.[locale] || data.name?.en;

  const position = data.position?.[locale] || data.position?.en;

  const content = data.content?.[locale] || data.content?.en;

  return (
    <figure className="testimonial-card">
      {data.showRating && (
        <div className="mb-3 flex items-center gap-x-1 text-dark-700">
          {data.rating}
          <BsStarFill className="text-yellow-400" />
        </div>
      )}

      <blockquote className="text-lg review-msg tracking-tight text-dark-800">
        <p>{content}</p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-x-6">
        {/* Image wrapper */}
        <div className="image-wrapper flex h-12 w-12 items-center justify-center rounded-full border">
          {data.image ? (
            <img className="rounded-full bg-dark-50" src={data.image.url} alt={name} />
          ) : (
            <MdFaceRetouchingNatural className="text-lg text-dark-400" />
          )}
        </div>

        <div className="text-sm leading-4">
          {/* Name */}
          <div className="font-semibold text-dark-900">{name}</div>

          {/* Position / Title */}
          {position && <div className="mt-0.5 text-dark-600">{position}</div>}
        </div>
      </figcaption>
    </figure>
  );
};

export default PresetTwo;
