import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <p className="mb-6 text-lg text-gray-600">Last Updated: July 1, 2024</p>

            <div className="space-y-6">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Introduction</h2>
                <p className="text-gray-700">
                  At DnD Builder, we respect your privacy and are committed to protecting your
                  personal data. This privacy policy will inform you about how we look after your
                  personal data when you visit our website and tell you about your privacy rights
                  and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Information We Collect
                </h2>
                <p className="text-gray-700">
                  We may collect, use, store and transfer different kinds of personal data about you
                  which we have grouped together as follows:
                </p>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li>
                    Identity Data includes first name, last name, username or similar identifier.
                  </li>
                  <li>Contact Data includes email address and telephone numbers.</li>
                  <li>
                    Technical Data includes internet protocol (IP) address, browser type and
                    version, time zone setting and location, browser plug-in types and versions,
                    operating system and platform, and other technology on the devices you use to
                    access this website.
                  </li>
                  <li>
                    Usage Data includes information about how you use our website, products and
                    services.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700">
                  We will only use your personal data when the law allows us to. Most commonly, we
                  will use your personal data in the following circumstances:
                </p>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li>
                    Where we need to perform the contract we are about to enter into or have entered
                    into with you.
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests (or those of a third party)
                    and your interests and fundamental rights do not override those interests.
                  </li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Security</h2>
                <p className="text-gray-700">
                  We have put in place appropriate security measures to prevent your personal data
                  from being accidentally lost, used or accessed in an unauthorized way, altered or
                  disclosed. In addition, we limit access to your personal data to those employees,
                  agents, contractors and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your Legal Rights</h2>
                <p className="text-gray-700">
                  Under certain circumstances, you have rights under data protection laws in
                  relation to your personal data, including the right to request access, correction,
                  erasure, restriction, transfer, to object to processing, to portability of data
                  and (where the lawful ground of processing is consent) to withdraw consent.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this privacy policy or our privacy practices,
                  please contact us at:
                </p>
                <p className="mt-2 text-gray-700">
                  Email: privacy@dndbuilder.com
                  <br />
                  Phone: +1 (555) 123-4567
                  <br />
                  Address: 123 Builder St, San Francisco, CA 94103
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
