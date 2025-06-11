import { FC } from "react";

type ProgressBarIconProps = {
  size?: number;
};

const ProgressBarIcon: FC<ProgressBarIconProps> = ({ size = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        fill="currentColor"
        d="M28 21H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M4 13v6h24v-6Z"
      ></path>
      <path fill="currentColor" d="M6 15h14v2H6z"></path>
    </svg>
  );
};

export default ProgressBarIcon;
