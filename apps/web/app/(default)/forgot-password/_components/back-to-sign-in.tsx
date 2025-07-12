"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function BackToSignIn() {
  return (
    <div className="mt-6 text-center">
      <Link
        href="/login"
        className="flex items-center justify-center font-medium text-gray-900 hover:text-gray-700"
      >
        <LuArrowLeft className="mr-2 h-4 w-4" />
        Back to Sign In
      </Link>
    </div>
  );
}