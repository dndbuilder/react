import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterFormSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Register Form Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-4">
                🚀 Get Started
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600">Start building amazing pages with DnD Builder</p>
            </div>

            <Card className="border-0 shadow-xl">
              <Card.Content className="p-8">
                <div className="space-y-6">
                  {/* Name Fields Skeleton */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="mb-2 h-4 w-20" />
                      <div className="relative">
                        <Skeleton className="h-12 w-full rounded-md" />
                      </div>
                    </div>
                    <div>
                      <Skeleton className="mb-2 h-4 w-20" />
                      <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                  </div>

                  {/* Email Field Skeleton */}
                  <div>
                    <Skeleton className="mb-2 h-4 w-28" />
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
                    {/* Password strength indicators skeleton */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-xs">
                        <Skeleton className="mr-1 h-3 w-3 rounded-full" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="flex items-center text-xs">
                        <Skeleton className="mr-1 h-3 w-3 rounded-full" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                      <div className="flex items-center text-xs">
                        <Skeleton className="mr-1 h-3 w-3 rounded-full" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Privacy Skeleton */}
                  <div className="flex items-start">
                    <Skeleton className="mt-1 h-4 w-4 rounded" />
                    <div className="ml-2 text-sm text-gray-600">
                      <Skeleton className="h-4 w-80" />
                    </div>
                  </div>

                  {/* Create Account Button Skeleton */}
                  <Skeleton className="h-12 w-full rounded-md" />

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Registration Skeleton */}
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Sign In Link Skeleton */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account? <Skeleton className="inline-block h-4 w-16" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
