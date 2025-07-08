import { Skeleton } from "@/components/ui/skeleton";

export function AuthSectionSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      {/* Login button skeleton */}
      <Skeleton className="h-9 w-16" />
      {/* Get Started button skeleton */}
      <Skeleton className="h-9 w-24" />
    </div>
  );
}
