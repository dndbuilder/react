"use client";
import { Dialog } from "@/components/shared/dialog";
import { FC, MouseEventHandler } from "react";

type UnsaveChangesDialogProps = {
  isOpen: boolean;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
};

const UnsaveChangesDialog: FC<UnsaveChangesDialogProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Dialog open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlay-show fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)]" />
        <Dialog.Content className="p-6">
          <Dialog.Title className="text-center text-lg font-semibold text-slate-800">
            Are you sure you want to leave?
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-center text-slate-600">
            You have unsaved changes that will be lost if you leave.
          </Dialog.Description>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={onCancel}
              className="rounded-sm bg-slate-100 px-4 py-2 text-slate-800 transition-colors duration-150 hover:bg-slate-300"
            >
              No, cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-danger-600 hover:bg-danger-700 rounded-sm px-4 py-2 text-slate-100 transition-colors duration-150 hover:text-white"
            >
              Yes, leave
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default UnsaveChangesDialog;
