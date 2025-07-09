import { Suspense } from "react";
import RegisterForm from "./_components/register-form";
import RegisterFormSkeleton from "./_components/register-form-skeleton";

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFormSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}
