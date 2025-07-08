import { classNames } from "@/lib/utils";
import Link from "next/link";
import { TbDragDrop } from "react-icons/tb";
import { AuthSection } from "./auth-section";
import { AuthSectionSkeleton } from "./auth-section-skeleton";
import { Suspense } from "react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={classNames(
        "sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
            <TbDragDrop className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DnD Builder</span>
        </Link>
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/#features" className="text-gray-600 transition-colors hover:text-gray-900">
            Features
          </Link>
          <Link href="/#pricing" className="text-gray-600 transition-colors hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/docs" className="text-gray-600 transition-colors hover:text-gray-900">
            Docs
          </Link>
          <Link href="/contact" className="text-gray-600 transition-colors hover:text-gray-900">
            Contact
          </Link>

          <Suspense fallback={<AuthSectionSkeleton />}>
            <AuthSection />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
