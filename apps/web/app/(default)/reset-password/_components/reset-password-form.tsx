"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { resetPassword } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { LuArrowLeft, LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { classNames } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import InvalidToken from "./invalid-token";

type ResetPasswordFormProps = {
  onSuccess: () => void;
};

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<ResetPasswordFormData>({
    mode: "onChange",
  });

  const password = watch("password", "");

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.met);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!token) {
        throw new Error("Reset token is missing. Please use the link from your email.");
      }

      await resetPassword(token, data.password);
      onSuccess();
    } catch (err) {
      setFormError("root", {
        message: err instanceof Error ? err.message : "An error occurred. Please try again.",
      });
    }
  };

  if (!token) {
    return <InvalidToken />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Reset Password Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-4">
                🔐 New Password
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Your Password</h1>
              <p className="text-gray-600">Enter your new password below</p>
            </div>

            <Card className="border-0 shadow-xl">
              <Card.Content className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* New Password Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <LuLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          validate: {
                            hasUppercase: (value) =>
                              /[A-Z]/.test(value) || "Password must contain an uppercase letter",
                            hasLowercase: (value) =>
                              /[a-z]/.test(value) || "Password must contain a lowercase letter",
                            hasNumber: (value) =>
                              /\d/.test(value) || "Password must contain a number",
                            hasSpecialChar: (value) =>
                              /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                              "Password must contain a special character",
                          },
                        })}
                        className={classNames(
                          "w-full rounded-md border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900",
                          errors.password && "border-red-500 focus:ring-red-500"
                        )}
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <LuEyeOff className="h-5 w-5" />
                        ) : (
                          <LuEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  {password && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                      {passwordRequirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full ${
                              requirement.met ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {requirement.met && (
                              <FiCheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${requirement.met ? "text-green-600" : "text-gray-500"}`}
                          >
                            {requirement.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Confirm Password Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <LuLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) => value === password || "Passwords do not match",
                        })}
                        className={classNames(
                          "w-full rounded-md border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900",
                          errors.confirmPassword && "border-red-500 focus:ring-red-500"
                        )}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <LuEyeOff className="h-5 w-5" />
                        ) : (
                          <LuEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                    {watch("confirmPassword") && !errors.confirmPassword && (
                      <p className="mt-2 flex items-center text-sm text-green-600">
                        <FiCheckCircle className="mr-1 h-4 w-4" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {errors.root && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FiAlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{errors.root.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reset Password Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !allRequirementsMet}
                    className="w-full bg-black py-3 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </form>
              </Card.Content>
            </Card>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="flex items-center justify-center font-medium text-gray-900 hover:text-gray-700"
              >
                <LuArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
