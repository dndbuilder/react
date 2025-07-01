import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Changelog</h1>

          <div className="space-y-12">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Version 1.2.0</h2>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Latest
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-500">Released on June 15, 2024</p>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    Added new premium slider components with advanced customization options
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Improved drag and drop performance for complex layouts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Fixed responsive design issues on mobile devices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Updated documentation with new examples and tutorials</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Version 1.1.0</h2>
              <p className="mb-2 text-sm text-gray-500">Released on April 3, 2024</p>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Added tabs component for premium users</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Implemented undo/redo functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Enhanced styling options with Tailwind CSS integration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Fixed various bugs related to component nesting</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Version 1.0.0</h2>
              <p className="mb-2 text-sm text-gray-500">Released on January 10, 2024</p>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Initial release of DnD Builder</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Basic block-based architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Drag & drop interface powered by React DND</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Responsive design capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Core component library</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
