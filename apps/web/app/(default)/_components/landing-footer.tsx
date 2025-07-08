import Link from 'next/link';
import { FiGithub, FiLayers, FiMail, FiTwitter } from 'react-icons/fi';
import { classNames } from '@/lib/utils';

interface LandingFooterProps {
  className?: string;
}

export function LandingFooter({ className }: LandingFooterProps) {
  return (
    <footer className={classNames('bg-gray-900 py-16 text-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
                <FiLayers className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DnD Builder</span>
            </div>
            <p className="mb-4 text-gray-400">
              The most powerful drag-and-drop page builder for React applications.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <FiGithub className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <FiTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <FiMail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DnD Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
