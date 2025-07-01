import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Help Center</h1>

          <p className="mb-8 text-xl text-gray-600">
            Find answers to common questions and get support for DnD Builder.
          </p>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  How do I install DnD Builder?
                </h3>
                <p className="text-gray-600">
                  You can install DnD Builder using npm or yarn. Run{" "}
                  <code>npm install @dnd-builder/react</code> or
                  <code>yarn add @dnd-builder/react</code> in your project directory. For detailed
                  installation instructions, please refer to our{" "}
                  <a href="/documentation" className="text-blue-600 hover:underline">
                    documentation
                  </a>
                  .
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Can I use DnD Builder with Next.js?
                </h3>
                <p className="text-gray-600">
                  Yes, DnD Builder is fully compatible with Next.js. You can use it in both
                  client-side rendered components and server components with the appropriate
                  configuration. Check our
                  <a href="/examples" className="text-blue-600 hover:underline">
                    examples
                  </a>{" "}
                  for Next.js integration.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  How do I create custom components?
                </h3>
                <p className="text-gray-600">
                  To create custom components, you need to define a component that follows the DnD
                  Builder component interface. This includes handling props, providing edit
                  controls, and managing state. For a step-by-step guide, see our{" "}
                  <a href="/tutorials" className="text-blue-600 hover:underline">
                    tutorials
                  </a>{" "}
                  section.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Is DnD Builder free to use?
                </h3>
                <p className="text-gray-600">
                  DnD Builder has both free and premium versions. The free version includes basic
                  components and functionality, while the premium version offers advanced components
                  and features. Visit our
                  <a href="/#pricing" className="text-blue-600 hover:underline">
                    pricing page
                  </a>{" "}
                  for more details.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">How do I report a bug?</h3>
                <p className="text-gray-600">
                  If you encounter a bug, please report it on our GitHub repository or contact our
                  support team through the{" "}
                  <a href="/contact" className="text-blue-600 hover:underline">
                    contact page
                  </a>
                  . Please include as much detail as possible, including steps to reproduce the
                  issue.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Support Options</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Community Support</h3>
                <p className="mb-4 text-gray-600">
                  Get help from the DnD Builder community. Ask questions, share your projects, and
                  learn from others.
                </p>
                <a
                  href="/community"
                  className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Join Community
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Email Support</h3>
                <p className="mb-4 text-gray-600">
                  Contact our support team directly for personalized assistance with your DnD
                  Builder questions.
                </p>
                <a
                  href="/contact"
                  className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Resources</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="/documentation"
                className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50"
              >
                <h3 className="mb-2 font-semibold text-gray-900">Documentation</h3>
                <p className="text-sm text-gray-600">Comprehensive guides and references</p>
              </a>

              <a
                href="/tutorials"
                className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50"
              >
                <h3 className="mb-2 font-semibold text-gray-900">Tutorials</h3>
                <p className="text-sm text-gray-600">Step-by-step learning guides</p>
              </a>

              <a
                href="/examples"
                className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50"
              >
                <h3 className="mb-2 font-semibold text-gray-900">Examples</h3>
                <p className="text-sm text-gray-600">Sample projects and demos</p>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
