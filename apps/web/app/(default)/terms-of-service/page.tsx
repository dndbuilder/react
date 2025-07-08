import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { LuScale } from 'react-icons/lu';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <LuScale className="h-8 w-8 text-gray-800" />
          </div>
          <Badge variant="secondary" className="mb-4">
            📋 Legal
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Terms of Service</h1>
          <p className="mx-auto mb-4 max-w-2xl text-xl text-gray-600">
            Please read these terms carefully before using DnD Builder.
          </p>
          <p className="text-sm text-gray-500">Last updated: January 15, 2024</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 shadow-lg">
              <Card.Content className="space-y-8 p-8">
                {/* Section 1 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    By accessing and using DnD Builder (&quot;the Service&quot;), you accept and
                    agree to be bound by the terms and provision of this agreement. If you do not
                    agree to abide by the above, please do not use this service.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    These Terms of Service (&quot;Terms&quot;) govern your use of our website
                    located at dndbuilder.com (the &quot;Service&quot;) operated by DnD Builder
                    (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    2. Description of Service
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    DnD Builder is a React component library and page builder tool that allows
                    developers to create drag-and-drop interfaces for building web pages and
                    applications.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    The Service includes both free and premium features, with premium features
                    requiring a paid subscription.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">3. User Accounts</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    When you create an account with us, you must provide information that is
                    accurate, complete, and current at all times. You are responsible for
                    safeguarding the password and for all activities that occur under your account.
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>You must be at least 13 years old to use this Service</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>
                      You agree to notify us immediately of any unauthorized use of your account
                    </li>
                    <li>We reserve the right to terminate accounts that violate these terms</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    4. Subscription and Payment
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    Some parts of the Service are billed on a subscription basis
                    (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and
                    periodic basis (&quot;Billing Cycle&quot;).
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Subscriptions are billed monthly or annually as selected</li>
                    <li>Payment is due at the beginning of each billing cycle</li>
                    <li>Refunds are handled according to our refund policy</li>
                    <li>You may cancel your subscription at any time</li>
                    <li>
                      Upon cancellation, premium features will be disabled at the end of the billing
                      period
                    </li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    5. Intellectual Property Rights
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    The Service and its original content, features, and functionality are and will
                    remain the exclusive property of DnD Builder and its licensors. The Service is
                    protected by copyright, trademark, and other laws.
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>You retain ownership of content you create using our Service</li>
                    <li>We retain ownership of the DnD Builder software and components</li>
                    <li>You may not reverse engineer, decompile, or disassemble our software</li>
                    <li>
                      Our trademarks and trade dress may not be used without our written permission
                    </li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">6. User Content</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    Our Service may allow you to post, link, store, share and otherwise make
                    available certain information, text, graphics, videos, or other material
                    (&quot;Content&quot;).
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>You are responsible for Content that you post to the Service</li>
                    <li>You retain your rights to any Content you submit, post or display</li>
                    <li>
                      You grant us a license to use, modify, and display your Content as necessary
                      to provide the Service
                    </li>
                    <li>You may not post Content that violates our community guidelines</li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">7. Prohibited Uses</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">You may not use our Service:</p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>
                      To violate any international, federal, provincial, or state regulations,
                      rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property rights or the
                      intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                      discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                  </ul>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">8. Disclaimer</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    The information on this website is provided on an &quot;as is&quot; basis. To
                    the fullest extent permitted by law, this Company:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>
                      Excludes all representations and warranties relating to this website and its
                      contents
                    </li>
                    <li>Does not warrant that the Service will be uninterrupted or error-free</li>
                    <li>
                      Makes no representations about the accuracy or completeness of the content
                    </li>
                    <li>
                      Disclaims all liability for damages arising from the use of this Service
                    </li>
                  </ul>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    9. Limitation of Liability
                  </h2>
                  <p className="leading-relaxed text-gray-700">
                    In no event shall DnD Builder, nor its directors, employees, partners, agents,
                    suppliers, or affiliates, be liable for any indirect, incidental, special,
                    consequential, or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses, resulting from your
                    use of the Service.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">10. Termination</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We may terminate or suspend your account and bar access to the Service
                    immediately, without prior notice or liability, under our sole discretion, for
                    any reason whatsoever and without limitation, including but not limited to a
                    breach of the Terms.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    If you wish to terminate your account, you may simply discontinue using the
                    Service or contact us to request account deletion.
                  </p>
                </div>

                {/* Section 11 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">11. Changes to Terms</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We reserve the right, at our sole discretion, to modify or replace these Terms
                    at any time. If a revision is material, we will provide at least 30 days notice
                    prior to any new terms taking effect.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    What constitutes a material change will be determined at our sole discretion. By
                    continuing to access or use our Service after any revisions become effective,
                    you agree to be bound by the revised terms.
                  </p>
                </div>

                {/* Section 12 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">12. Contact Information</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <ul className="list-none space-y-2 text-gray-700">
                    <li>• Email: legal@dndbuilder.com</li>
                    <li>• Address: 123 Tech Street, San Francisco, CA 94105</li>
                    <li>• Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
