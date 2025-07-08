import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FiCheck, FiStar } from 'react-icons/fi';
import { classNames } from '@/lib/utils';
import Link from 'next/link';
import { LuArrowRight, LuDownload } from 'react-icons/lu';

interface PricingSectionProps {
  className?: string;
}

export function PricingSection({ className }: PricingSectionProps) {
  return (
    <section className={classNames('bg-gray-50 py-20', className)} id="pricing">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto text-xl text-gray-600">
            Start building for free, upgrade when you need more power
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <Card className="relative border-2 border-gray-200">
            <Card.Header className="pb-8 text-center">
              <Card.Title className="text-2xl">Free</Card.Title>
              <div className="mt-4 text-4xl font-bold text-gray-900">
                $0
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <Card.Description className="mt-2">
                Perfect for getting started and small projects
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Basic block components</span>
                </li>

                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Undo/Redo functionality</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Responsive design</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Community support</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Full Customization</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Unlimited Projects</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/docs" target="_blank">
                  Get Started Free
                  <LuArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card.Content>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-gray-900 shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
              <Badge className="bg-black px-4 py-1 text-white">
                <FiStar className="mr-1 h-4 w-4" />
                Most Popular
              </Badge>
            </div>
            <Card.Header className="pb-8 text-center">
              <Card.Title className="text-2xl">Premium</Card.Title>
              <div className="mt-4 text-4xl font-bold text-gray-900">
                $10
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <Card.Description className="mt-2">
                Everything in Free plus advanced components
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Advanced blocks</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Global Theme Settings</span>
                  <Badge
                    variant="outline"
                    className="ml-2 border-yellow-300 bg-yellow-500/10 text-yellow-500"
                  >
                    Coming Soon
                  </Badge>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Block Library</span>
                  <Badge
                    variant="outline"
                    className="ml-2 border-yellow-300 bg-yellow-500/10 text-yellow-500"
                  >
                    Coming Soon
                  </Badge>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Asset Manager</span>
                  <Badge
                    variant="outline"
                    className="ml-2 border-yellow-300 bg-yellow-500/10 text-yellow-500"
                  >
                    Coming Soon
                  </Badge>
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-3 h-5 w-5 text-green-600" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-black hover:bg-gray-800" disabled>
                Upgrade to Premium
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
