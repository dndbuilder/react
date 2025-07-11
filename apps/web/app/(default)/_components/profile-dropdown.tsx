"use client";

import { useSession, signOut } from "next-auth/react";
import { LuUser, LuLogOut, LuChevronDown } from "react-icons/lu";
import Image from "next/image";
import { Popover } from "@dndbuilder.com/react/components";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

export function ProfileDropdown() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  if (!session) {
    return null;
  }

  return (
    <Popover>
      <Popover.Trigger className="hidden items-center px-2 py-1.5 font-medium text-gray-600 hover:text-gray-900 md:flex">
        {session.user?.image ? (
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <LuUser size={24} />
          </div>
        )}
        <LuChevronDown size={18} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="w-48 rounded-md border border-gray-200 bg-white p-0 shadow-lg"
        >
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
            <p className="truncate text-xs text-gray-500">{session.user?.email}</p>
          </div>
          <Popover.Close asChild>
            <Link
              href={"/dashboard"}
              className="flex w-full items-center border-b border-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiHome className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Popover.Close>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LuLogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
