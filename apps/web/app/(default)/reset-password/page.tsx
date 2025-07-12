"use client";

import { Suspense, useState } from "react";
import ResetPasswordForm from "./_components/reset-password-form";
import ResetSuccess from "./_components/reset-success";
import ResetPasswordSkeleton from "./_components/skeleton-loader";

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ResetSuccess />;
  }

  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordForm onSuccess={handleSuccess} />
    </Suspense>
  );
}
