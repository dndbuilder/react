import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Community</h1>

          <p className="mb-8 text-xl text-gray-600">
            Join the DnD Builder community to connect with other developers, share your projects,
            and get help.
          </p>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Discussion Forums</h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">General Discussion</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    Active
                  </span>
                </div>
                <p className="mb-4 text-gray-600">
                  Discuss anything related to DnD Builder, share your thoughts, and connect with
                  other users.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>245 topics</span>
                    <span className="mx-2">•</span>
                    <span>1.2k posts</span>
                  </div>
                  <a
                    href="#"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Forum
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Help & Support</h3>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Active
                  </span>
                </div>
                <p className="mb-4 text-gray-600">
                  Ask questions, get help with issues, and find solutions from the community.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>378 topics</span>
                    <span className="mx-2">•</span>
                    <span>2.3k posts</span>
                  </div>
                  <a
                    href="#"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Forum
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Showcase</h3>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                    Active
                  </span>
                </div>
                <p className="mb-4 text-gray-600">
                  Share your projects built with DnD Builder and get feedback from the community.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>156 topics</span>
                    <span className="mx-2">•</span>
                    <span>890 posts</span>
                  </div>
                  <a
                    href="#"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Forum
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Community Resources</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">GitHub Repository</h3>
                <p className="mb-4 text-gray-600">
                  Contribute to DnD Builder, report issues, and explore the source code on GitHub.
                </p>
                <a
                  href="https://github.com/dnd-builder/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                >
                  View on GitHub
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Discord Server</h3>
                <p className="mb-4 text-gray-600">
                  Join our Discord server for real-time discussions, support, and community events.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Community Guidelines</h2>

            <p className="mb-4 text-gray-600">
              Our community is built on respect, collaboration, and a shared passion for building
              great user interfaces. To ensure a positive experience for everyone, please follow
              these guidelines:
            </p>

            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600">
              <li>Be respectful and considerate of others</li>
              <li>Stay on topic in discussions</li>
              <li>Share knowledge and help others when you can</li>
              <li>Provide constructive feedback</li>
              <li>Follow our code of conduct</li>
            </ul>

            <p className="text-gray-600">
              For more detailed information, please read our full
              <a href="#" className="text-blue-600 hover:underline">
                Code of Conduct
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
