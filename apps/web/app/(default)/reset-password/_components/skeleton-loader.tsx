"use client";

import { Card } from "@/components/ui/card";

export default function ResetPasswordSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 h-6 w-24 animate-pulse rounded-full bg-gray-200"></div>
              <div className="mx-auto mb-2 h-8 w-64 animate-pulse rounded-full bg-gray-200"></div>
              <div className="mx-auto h-4 w-48 animate-pulse rounded-full bg-gray-200"></div>
            </div>

            <Card className="border-0 shadow-xl">
              <Card.Content className="p-8">
                <div className="space-y-6">
                  {/* Password Field Skeleton */}
                  <div>
                    <div className="mb-2 h-4 w-24 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
                  </div>

                  {/* Confirm Password Field Skeleton */}
                  <div>
                    <div className="mb-2 h-4 w-36 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </Card.Content>
            </Card>

            {/* Back to Sign In Skeleton */}
            <div className="mt-6 text-center">
              <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
