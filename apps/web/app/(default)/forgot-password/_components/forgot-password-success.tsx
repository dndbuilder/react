"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

type ForgotPasswordSuccessProps = {
  email: string;
};

export default function ForgotPasswordSuccess({ email }: ForgotPasswordSuccessProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Success Message */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <Badge variant="secondary" className="mb-4">
              ✅ Email Sent
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Check Your Email</h1>
            <p className="mb-8 text-gray-600">
              We&#39;ve sent a password reset link to <strong>{email}</strong>. Please check your
              inbox and follow the instructions to reset your password.
            </p>

            <Button asChild className="w-full bg-black hover:bg-gray-800">
              <Link href="/login">Return to Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}