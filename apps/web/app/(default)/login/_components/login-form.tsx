"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuArrowRight, LuEye, LuEyeOff, LuGithub, LuLock, LuMail } from "react-icons/lu";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Logged in successfully");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);

    try {
      await signIn(provider, { callbackUrl: callbackUrl, redirect: true });
    } catch (error) {
      toast.error(`Error signing in with ${provider}`);
      console.error(`${provider} login error:`, error);
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Login Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-4">
                🔐 Sign In
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your DnD Builder account</p>
            </div>

            <Card className="border-0 shadow-xl">
              <Card.Content className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <LuMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <LuLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <LuEyeOff className="h-5 w-5" />
                        ) : (
                          <LuEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-900 hover:text-gray-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-black py-3 hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                    {!isLoading && <LuArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      className="bg-transparent"
                      onClick={() => handleSocialLogin("github")}
                      disabled={isLoading}
                    >
                      <LuGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="bg-transparent"
                      onClick={() => handleSocialLogin("google")}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </form>
              </Card.Content>
            </Card>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-gray-900 hover:text-gray-700">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
