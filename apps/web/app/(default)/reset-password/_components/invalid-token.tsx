"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function InvalidToken() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <FiAlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <Badge variant="secondary" className="mb-4">
              ⚠️ Invalid Link
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Missing Reset Token</h1>
            <p className="mb-8 text-gray-600">
              The password reset link appears to be invalid or expired. Please request a new
              password reset link.
            </p>

            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/forgot-password">Request New Reset Link</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}