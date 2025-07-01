import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">System Status</h1>

          <p className="mb-8 text-xl text-gray-600">
            Check the current status of DnD Builder services and view recent incidents.
          </p>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Current Status</h2>
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-800">
                All Systems Operational
              </span>
            </div>

            <p className="mb-6 text-gray-600">Last updated: June 20, 2024 at 10:15 AM UTC</p>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">API</h3>
                  <span className="flex items-center text-green-600">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Operational
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Dashboard</h3>
                  <span className="flex items-center text-green-600">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Operational
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Documentation</h3>
                  <span className="flex items-center text-green-600">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Operational
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Community Forums</h3>
                  <span className="flex items-center text-green-600">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Recent Incidents</h2>

            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></span>
                  <h3 className="font-semibold text-gray-900">API Performance Degradation</h3>
                </div>
                <p className="mb-2 text-sm text-gray-500">June 15, 2024</p>
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Resolved (10:45 AM UTC)
                    </p>
                    <p className="text-sm text-gray-600">
                      The API performance has been restored to normal levels. We've implemented
                      additional capacity to prevent similar issues in the future.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Investigating (9:30 AM UTC)
                    </p>
                    <p className="text-sm text-gray-600">
                      We're investigating reports of increased latency in API responses. Some
                      requests may experience delays.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                  <h3 className="font-semibold text-gray-900">Dashboard Outage</h3>
                </div>
                <p className="mb-2 text-sm text-gray-500">June 10, 2024</p>
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">Resolved (3:15 PM UTC)</p>
                    <p className="text-sm text-gray-600">
                      The dashboard is now fully operational. The issue was caused by a database
                      connection problem that has been fixed.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Identified (2:30 PM UTC)
                    </p>
                    <p className="text-sm text-gray-600">
                      We've identified the issue and are working on a fix. The dashboard is
                      currently experiencing intermittent availability.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Investigating (2:00 PM UTC)
                    </p>
                    <p className="text-sm text-gray-600">
                      We're investigating reports that the dashboard is not accessible for some
                      users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Uptime</h2>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">30-Day Uptime</h3>
                <span className="font-medium text-gray-900">99.97%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[99.97%] rounded-full bg-green-500"></div>
              </div>
            </div>

            <p className="text-gray-600">
              For more detailed uptime information and historical data, please visit our
              <a href="#" className="text-blue-600 hover:underline">
                status dashboard
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
