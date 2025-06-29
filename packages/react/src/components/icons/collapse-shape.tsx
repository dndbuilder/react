import { useActionContext } from "@/contexts/action-context";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { VscTriangleLeft } from "react-icons/vsc";

interface CollapseShapeProps extends HTMLAttributes<SVGAElement> {}

const CollapseShape: FC<CollapseShapeProps> = () => {
  const { isLeftPanelOpen, setIsLeftPanelOpen } = useActionContext();
  return (
    <div
      onClick={() => {
        setIsLeftPanelOpen(!isLeftPanelOpen);
      }}
      className={classNames(
        "absolute right-[-18px] top-[50%] z-[1000] flex h-[50px] w-[18px] translate-y-[-50%] cursor-pointer items-center justify-center rounded-r border border-l-0 bg-white shadow-[rgba(0,0,0,15%)_1px_0px_2px] hover:bg-slate-200"
      )}
    >
      <FiChevronLeft
        className={classNames("text-slate-600", {
          "rotate-180": !isLeftPanelOpen,
        })}
      />
    </div>
  );
};

export default CollapseShape;
