import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { ProfileDropdown } from "./profile-dropdown";

export async function AuthSection({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <ProfileDropdown session={session} />
      ) : (
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="outline" className="border-gray-300" size="sm">
            <Link href="/login" className="flex items-center space-x-1">
              <span>Login</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register" className="flex items-center space-x-1">
              <span>Get Started</span>
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
