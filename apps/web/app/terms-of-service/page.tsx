import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Terms of Service</h1>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <p className="mb-6 text-lg text-gray-600">Last Updated: July 1, 2024</p>

            <div className="space-y-6">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Introduction</h2>
                <p className="text-gray-700">
                  Welcome to DnD Builder. These terms and conditions outline the rules and
                  regulations for the use of our website and services. By accessing this website, we
                  assume you accept these terms and conditions in full. Do not continue to use DnD
                  Builder if you do not accept all of the terms and conditions stated on this page.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">License to Use</h2>
                <p className="text-gray-700">
                  Unless otherwise stated, DnD Builder and/or its licensors own the intellectual
                  property rights for all material on DnD Builder. All intellectual property rights
                  are reserved.
                </p>
                <p className="mt-2 text-gray-700">
                  You may view and/or print pages from the website for your own personal use subject
                  to restrictions set in these terms and conditions.
                </p>
                <p className="mt-2 text-gray-700">You must not:</p>
                <ul className="mt-2 list-disc pl-6 text-gray-700">
                  <li>Republish material from this website</li>
                  <li>Sell, rent or sub-license material from this website</li>
                  <li>Reproduce, duplicate or copy material from this website</li>
                  <li>
                    Redistribute content from DnD Builder (unless content is specifically made for
                    redistribution)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">User Accounts</h2>
                <p className="text-gray-700">
                  When you create an account with us, you guarantee that the information you provide
                  is accurate, complete, and current at all times. Inaccurate, incomplete, or
                  obsolete information may result in the immediate termination of your account on
                  the service.
                </p>
                <p className="mt-2 text-gray-700">
                  You are responsible for maintaining the confidentiality of your account and
                  password, including but not limited to the restriction of access to your computer
                  and/or account. You agree to accept responsibility for any and all activities or
                  actions that occur under your account and/or password.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Limitation of Liability
                </h2>
                <p className="text-gray-700">
                  In no event shall DnD Builder, nor any of its officers, directors and employees,
                  be liable to you for anything arising out of or in any way connected with your use
                  of this website, whether such liability is under contract, tort or otherwise, and
                  DnD Builder shall not be liable for any indirect, consequential or special
                  liability arising out of or in any way related to your use of this website.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Indemnification</h2>
                <p className="text-gray-700">
                  You hereby indemnify to the fullest extent DnD Builder from and against any and
                  all liabilities, costs, demands, causes of action, damages and expenses (including
                  reasonable attorney's fees) arising out of or in any way related to your breach of
                  any of the provisions of these Terms.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be governed and construed in accordance with the laws of the
                  United States, without regard to its conflict of law provisions.
                </p>
                <p className="mt-2 text-gray-700">
                  Our failure to enforce any right or provision of these Terms will not be
                  considered a waiver of those rights. If any provision of these Terms is held to be
                  invalid or unenforceable by a court, the remaining provisions of these Terms will
                  remain in effect.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at
                  any time. If a revision is material, we will provide at least 30 days' notice
                  prior to any new terms taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="mt-2 text-gray-700">
                  Email: legal@dndbuilder.com
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
