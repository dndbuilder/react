import { BlockProps } from "@/types/block";
import { FC } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { HtmlSettingsType } from "../types";

const Html: FC<BlockProps<HtmlSettingsType>> = ({ settings }) => {
  if (!settings.code)
    return (
      <div className="flex justify-center bg-dark-100 p-3">
        <IoCodeSlashOutline size={20} className="text-dark-600" />
      </div>
    );

  return <div dangerouslySetInnerHTML={{ __html: settings.code ?? "" }}></div>;
};

export default Html;
