import { getUserProfile } from "@/lib/profile";
import { DemoAccess } from "./_components/demo-access";
import { LicenseKeyManagement } from "./_components/license-key-management";
import { ProfileManagement } from "./_components/profile-management";
import { QuickLinks } from "./_components/quick-links";

export default async function Dashboard() {
  const profile = await getUserProfile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-xl font-bold text-black sm:text-2xl">Dashboard</h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage your DnD Builder license and access developer tools.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {/* License Key Management and Quick Integration */}
          <div className="md:col-span-1 lg:col-span-2">
            <LicenseKeyManagement licenseKey={profile.licenseKey} />

            {/* Profile Section */}
            <ProfileManagement profile={profile} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Demo Access */}
            <DemoAccess />

            {/* Account Status */}
            {/* Commented out Account Status component */}

            {/* Quick Links */}
            <QuickLinks />
          </div>
        </div>
      </main>
    </div>
  );
}
