"use client";

import { Button } from "@/components/ui/button";
import { Popover } from "@dndbuilder.com/react/components";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHome, FiMenu } from "react-icons/fi";
import { LuChevronsUpDown, LuLogOut, LuUser } from "react-icons/lu";
import { TbDragDrop } from "react-icons/tb";
import { Drawer } from "vaul";

export default function MobileMenu({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="md:hidden" aria-label="Open navigation menu">
        <FiMenu className="h-6 w-6 text-gray-900" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40" />
        <Drawer.Content className="fixed left-0 top-0 z-[150] flex h-screen w-[300px] flex-col bg-gray-100 outline-none">
          <Drawer.Title className="sr-only">Mobile Menu</Drawer.Title>
          <Drawer.Description className="sr-only">
            Navigation menu for mobile devices
          </Drawer.Description>

          <div className="border-b border-gray-200 p-6">
            <Link href={"/"} className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
                <TbDragDrop className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DnD Builder</span>
            </Link>
          </div>

          <div className="flex flex-col space-y-4 p-6">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="font-medium text-gray-900 transition-colors hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="font-medium text-gray-900 transition-colors hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="font-medium text-gray-900 transition-colors hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/contact"
                className="font-medium text-gray-900 transition-colors hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-gray-200 p-6">
            {session ? (
              <div className="flex items-center gap-3">
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
                <div>
                  <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                  <p className="truncate text-xs text-gray-500">{session.user?.email}</p>
                </div>
                <Popover>
                  <Popover.Trigger className="ms-auto flex items-center px-4 text-gray-600 hover:text-gray-900">
                    <LuChevronsUpDown size={20} />
                    <span className="sr-only">Open user menu</span>
                  </Popover.Trigger>
                  <Popover.Content
                    align="center"
                    sideOffset={10}
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
                        onClick={() => setIsOpen(false)}
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
                </Popover>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="/login"
                    className="flex items-center space-x-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link
                    href="/register"
                    className="flex items-center space-x-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
