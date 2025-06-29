"use client";
import { FC, useState } from "react";
import ActionDropdown from "./action-dropdown";
import { BreakpointSwitch } from "./breakpoint-switch";
import SettingsToggle from "./settings-toggle";
import StructureToggle from "./structure-toggle";
import UndoRedo from "./undo-redo";
import UnsaveChangesDialog from "./unsaved-changes-dialog";

const Header: FC = () => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <div className="absolute top-0 z-50 flex h-[60px] w-full min-w-[1024px] items-center gap-4 bg-slate-900 px-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex h-full items-center lg:w-[290px]">Logo</div>
        </div>

        <div className="flex h-full grow items-center justify-center gap-4">
          {/* Breakpoint Switcher */}
          <BreakpointSwitch />

          {/* Undo /Redo */}
          <UndoRedo />
        </div>
        <div className="flex h-full items-center justify-end gap-6">
          {/* Settings Toggle */}
          <SettingsToggle />

          {/* Layer Toggle */}
          <StructureToggle />

          {/* Save/Export/Import */}
          <ActionDropdown />
        </div>
      </div>
      <div className="h-[60px]"></div>

      {/* Unsaved Changes Dialog */}
      <UnsaveChangesDialog
        isOpen={showWarning}
        onCancel={() => setShowWarning(false)}
        onConfirm={() => {}}
      />
    </>
  );
};

export default Header;
