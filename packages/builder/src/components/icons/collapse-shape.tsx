import { useActionContext } from "@/contexts/action-context";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";
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
        "absolute right-[-20px] top-[50%] z-[-1] flex h-[50px] w-[20px] translate-y-[-50%] cursor-pointer items-center justify-center rounded-r bg-[#F1F1F4] shadow-[rgba(0,0,0,15%)_1px_0px_2px] hover:bg-slate-300"
      )}
    >
      <VscTriangleLeft
        className={classNames("text-[#6C747A]", {
          "rotate-180": !isLeftPanelOpen,
        })}
      />
    </div>
  );
};

export default CollapseShape;
