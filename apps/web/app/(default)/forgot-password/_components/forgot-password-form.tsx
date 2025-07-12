"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { forgotPassword } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { LuMail, LuSend } from "react-icons/lu";
import { toast } from "sonner";
import BackToSignIn from "./back-to-sign-in";
import { classNames } from "@/lib/utils";

type ForgotPasswordFormProps = {
  onSuccess: (email: string) => void;
};

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);
      onSuccess(data.email);
    } catch (err) {
      // setFormError("root", {
      //   message: err instanceof Error ? err.message : "An error occurred. Please try again."
      // });
      toast.error(err instanceof Error ? err.message : "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Forgot Password Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-4">
                🔑 Reset Password
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Forgot Password?</h1>
              <p className="text-gray-600">No worries, we&#39;ll send you reset instructions</p>
            </div>

            <Card className="border-0 shadow-xl">
              <Card.Content className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <LuMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={classNames(
                          "w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900",
                          errors.email && "border-red-500 focus:ring-red-500"
                        )}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      We&#39;ll send a password reset link to this email address
                    </p>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Send Reset Link Button */}
                  <Button
                    type="submit"
                    className="w-full bg-black py-3 hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <LuSend className="mr-2 h-4 w-4" />
                        Send Reset Link
                      </>
                    )}
                  </Button>
                </form>
              </Card.Content>
            </Card>

            <BackToSignIn />
          </div>
        </div>
      </section>
    </div>
  );
}
