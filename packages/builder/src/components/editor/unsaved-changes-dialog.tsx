"use client";
import { Dialog } from "@/components/shared/dialog";
import { FC, MouseEventHandler } from "react";

type UnsaveChangesDialogProps = {
  isOpen: boolean;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
};

const UnsaveChangesDialog: FC<UnsaveChangesDialogProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="p-6">
          <Dialog.Title className="text-slate-800 text-lg font-semibold text-center">
            Are you sure you want to leave?
          </Dialog.Title>
          <Dialog.Description className="text-slate-600 text-center mt-1">
            You have unsaved changes that will be lost if you leave.
          </Dialog.Description>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={onCancel}
              className="text-slate-800 bg-slate-100 hover:bg-slate-300 transition-colors duration-150 px-4 py-2 rounded-sm"
            >
              No, cancel
            </button>
            <button
              onClick={onConfirm}
              className="text-slate-100 hover:text-white bg-danger-600 hover:bg-danger-700 px-4 py-2 rounded-sm transition-colors duration-150"
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
