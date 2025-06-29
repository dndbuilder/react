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
        <Dialog.Content className=" flex w-full max-w-5xl flex-col">
          <Dialog.Title className="flex justify-between border-b p-4">
            <div className="text-xl font-bold">Block Library</div>
            <Dialog.Close asChild>
              <button
                className="focus:outline-hidden text-slate-500 transition-colors duration-150 hover:text-slate-700"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Title>

          <div className="grow p-4 pb-28 pt-20 text-center">
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
