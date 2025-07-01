import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Contact Us</h1>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <p className="mb-6 text-lg text-gray-600">
              Have questions about our products or services? We're here to help! Fill out the form
              below and our team will get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">support@dndbuilder.com</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">123 Builder St, San Francisco, CA 94103</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
