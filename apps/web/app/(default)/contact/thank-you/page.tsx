import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import { LuClock, LuMessageCircle } from 'react-icons/lu';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Thank You Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            {/* Success Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <FiCheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <Badge
              variant="secondary"
              className="mb-4 border-green-200 bg-green-100 text-green-800"
            >
              ✅ Message Sent
            </Badge>

            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Thank You!</h1>

            <p className="mb-8 text-xl leading-relaxed text-gray-600">
              We&apos;ve received your message and appreciate you reaching out to us. Our team will
              review your inquiry and get back to you as soon as possible.
            </p>

            {/* What Happens Next */}
            <Card className="mb-8 border-0 text-left shadow-lg">
              <Card.Header>
                <Card.Title className="flex items-center text-xl">
                  <LuClock className="mr-2 h-5 w-5 text-gray-600" />
                  What happens next?
                </Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Message Review</h3>
                    <p className="text-sm text-gray-600">
                      Our support team will review your message and determine the best person to
                      help you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Response Time</h3>
                    <p className="text-sm text-gray-600">
                      You can expect to hear back from us within 24 hours during business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Follow-up</h3>
                    <p className="text-sm text-gray-600">
                      We&apos;ll send a detailed response to the email address you provided in your
                      message.
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Action Buttons */}
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-black hover:bg-gray-800" asChild>
                <Link href="/">
                  <FiHome className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/help">
                  <LuMessageCircle className="mr-2 h-4 w-4" />
                  Browse Help Center
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
