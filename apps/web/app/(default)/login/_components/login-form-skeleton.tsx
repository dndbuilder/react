import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginFormSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Login Form Skeleton */}
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
                <div className="space-y-6">
                  {/* Email Field Skeleton */}
                  <div>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <div className="relative">
                      <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                  </div>

                  {/* Password Field Skeleton */}
                  <div>
                    <Skeleton className="mb-2 h-4 w-20" />
                    <div className="relative">
                      <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="ml-2 h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-28" />
                  </div>

                  {/* Sign In Button Skeleton */}
                  <Skeleton className="h-12 w-full rounded-md" />

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Skeleton */}
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account? <Skeleton className="inline-block h-4 w-20" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
