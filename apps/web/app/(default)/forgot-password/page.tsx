"use client";

import { useState } from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";
import ForgotPasswordSuccess from "./_components/forgot-password-success";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSuccess = (email: string) => {
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ForgotPasswordSuccess email={submittedEmail} />;
  }

  return <ForgotPasswordForm onSuccess={handleSuccess} />;
}
