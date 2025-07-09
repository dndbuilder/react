import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ProfileDropdown } from "./profile-dropdown";
import { authOptions } from "@/lib/auth";

export async function AuthSection() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <ProfileDropdown />
      ) : (
        <div className="hidden md:flex items-center space-x-2">
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
