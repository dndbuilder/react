import { CSSProperties } from "react";

interface Props {
  className?: string;
  color?: CSSProperties["color"];
}

const Upload = ({ className, color = "#7047EB" }: Props) => {
  return (
    <svg
      className={className}
      width="106"
      height="106"
      viewBox="0 0 106 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67.4299 67.4361L52.9766 52.9829L38.5234 67.4361"
        stroke={color}
        strokeWidth="2.74138"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.9805 52.9829V85.5026"
        stroke={color}
        strokeWidth="2.74138"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M83.296 76.0745C86.8202 74.1532 89.6043 71.113 91.2087 67.4337C92.8132 63.7544 93.1467 59.6456 92.1566 55.7557C91.1665 51.8659 88.9093 48.4165 85.7411 45.952C82.5729 43.4875 78.6741 42.1482 74.6603 42.1455H70.1075C69.0138 37.9152 66.9753 33.9879 64.1454 30.6588C61.3154 27.3297 57.7675 24.6855 53.7685 22.925C49.7695 21.1644 45.4234 20.3333 41.057 20.4942C36.6905 20.6551 32.4174 21.8037 28.5588 23.8538C24.7002 25.9039 21.3565 28.802 18.7792 32.3303C16.2018 35.8586 14.4579 39.9253 13.6785 44.2246C12.899 48.5239 13.1044 52.944 14.2791 57.1525C15.4538 61.3611 17.5673 65.2485 20.4607 68.5227"
        stroke={color}
        strokeWidth="2.74138"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Upload;
