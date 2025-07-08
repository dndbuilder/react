import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { LuShield } from 'react-icons/lu';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <LuShield className="h-8 w-8 text-gray-800" />
          </div>
          <Badge variant="secondary" className="mb-4">
            🔒 Privacy
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mb-4 max-w-2xl text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect
            your information.
          </p>
          <p className="text-sm text-gray-500">Last updated: July 01, 2025</p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 shadow-lg">
              <Card.Content className="space-y-8 p-8">
                {/* Section 1 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    1. Information We Collect
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We collect information you provide directly to us, information we obtain
                    automatically when you use our Service, and information from third-party
                    sources.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Information You Provide
                  </h3>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700">
                    <li>Account information (name, email address, password)</li>
                    <li>Profile information (optional profile picture, bio)</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Content you create using our Service</li>
                    <li>Communications with us (support requests, feedback)</li>
                  </ul>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Information We Collect Automatically
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Usage information (features used, time spent, actions taken)</li>
                    <li>Device information (browser type, operating system, IP address)</li>
                    <li>Log information (access times, pages viewed, errors encountered)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    2. How We Use Your Information
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We use the information we collect to provide, maintain, and improve our Service.
                    Specifically, we use your information to:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Provide and deliver the Service you request</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>
                      Detect, investigate, and prevent fraudulent transactions and other illegal
                      activities
                    </li>
                    <li>Personalize and improve the Service</li>
                    <li>Send promotional communications (with your consent)</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    3. Information Sharing and Disclosure
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We do not sell, trade, or otherwise transfer your personal information to third
                    parties except as described in this policy:
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Service Providers</h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We may share your information with third-party service providers who perform
                    services on our behalf, such as payment processing, data analysis, email
                    delivery, and customer service.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Legal Requirements</h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We may disclose your information if required to do so by law or in response to
                    valid requests by public authorities.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Business Transfers</h3>
                  <p className="leading-relaxed text-gray-700">
                    If we are involved in a merger, acquisition, or asset sale, your personal
                    information may be transferred. We will provide notice before your personal
                    information is transferred.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Data Security</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We implement appropriate technical and organizational security measures to
                    protect your personal information against unauthorized access, alteration,
                    disclosure, or destruction.
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Data Retention</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We retain your personal information for as long as necessary to provide the
                    Service and fulfill the purposes outlined in this policy, unless a longer
                    retention period is required by law.
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Account information: Retained while your account is active</li>
                    <li>Usage data: Retained for up to 2 years for analytics purposes</li>
                    <li>Payment information: Retained as required for tax and legal purposes</li>
                    <li>Support communications: Retained for up to 3 years</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    6. Your Rights and Choices
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You have certain rights regarding your personal information, depending on your
                    location:
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Access and Portability
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You can request a copy of your personal information and export your data from
                    our Service.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Correction and Updates
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You can update your account information at any time through your account
                    settings.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Deletion</h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You can request deletion of your account and personal information, subject to
                    certain legal limitations.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Marketing Communications
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    You can opt out of promotional emails by following the unsubscribe instructions
                    in those emails or updating your account preferences.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    7. Cookies and Tracking Technologies
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We use cookies and similar tracking technologies to collect and use personal
                    information about you.
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Types of Cookies We Use
                  </h3>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700">
                    <li>
                      <strong>Essential Cookies:</strong> Required for the Service to function
                      properly
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand how you use our Service
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your settings and preferences
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                      (with consent)
                    </li>
                  </ul>

                  <p className="leading-relaxed text-gray-700">
                    You can control cookies through your browser settings, but disabling certain
                    cookies may affect the functionality of our Service.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    8. International Data Transfers
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    Your information may be transferred to and processed in countries other than
                    your own. We ensure appropriate safeguards are in place to protect your personal
                    information when it is transferred.
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Standard contractual clauses approved by regulatory authorities</li>
                    <li>Adequacy decisions by relevant data protection authorities</li>
                    <li>Certification schemes and codes of conduct</li>
                  </ul>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    9. Children&apos;s Privacy
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    Our Service is not intended for children under 13 years of age. We do not
                    knowingly collect personal information from children under 13.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    If you are a parent or guardian and believe your child has provided us with
                    personal information, please contact us so we can delete such information.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    10. Changes to This Policy
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page and updating the
                    &quot;Last updated&quot; date.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    We encourage you to review this Privacy Policy periodically for any changes.
                    Your continued use of the Service after any modifications constitutes acceptance
                    of the updated Privacy Policy.
                  </p>
                </div>

                {/* Section 11 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">11. Contact Us</h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    If you have any questions about this Privacy Policy or our privacy practices,
                    please contact us:
                  </p>
                  <ul className="list-none space-y-2 text-gray-700">
                    <li>• Email: privacy@dndbuilder.com</li>
                    <li>• Address: 123 Tech Street, San Francisco, CA 94105</li>
                    <li>• Phone: +1 (555) 123-4567</li>
                    <li>• Data Protection Officer: dpo@dndbuilder.com</li>
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
