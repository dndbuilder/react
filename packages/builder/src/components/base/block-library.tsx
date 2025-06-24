"use client";
import { Dialog } from "@/components/shared/dialog";
import { FC } from "react";
import { FiX } from "react-icons/fi";

type BlockLibraryProps = {
  children: React.ReactNode;
};

const BlockLibrary: FC<BlockLibraryProps> = ({ children }) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className=" w-full max-w-5xl flex flex-col">
          <Dialog.Title className="p-4 border-b flex justify-between">
            <div className="font-bold text-xl">Block Library</div>
            <Dialog.Close asChild>
              <button
                className="text-slate-500 hover:text-slate-700 transition-colors duration-150 focus:outline-hidden"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Title>

          <div className="p-4 grow text-center pt-20 pb-28">
            <p className="text-3xl font-semibold tracking-wide">Coming Soon</p>
            <p className="mt-2 text-slate-600">
              Our block library is under construction. Stay tuned!
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default BlockLibrary;
