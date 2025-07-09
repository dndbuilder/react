import React, { Suspense } from "react";
import LoginForm from "./_components/login-form";
import LoginFormSkeleton from "./_components/login-form-skeleton";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
