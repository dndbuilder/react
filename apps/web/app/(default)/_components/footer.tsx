import { classNames } from '@/lib/utils';
import Link from 'next/link';
import { FiGithub, FiMail, FiTwitter } from 'react-icons/fi';
import { TbDragDrop } from 'react-icons/tb';
import { RiTwitterXLine } from 'react-icons/ri';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={classNames('bg-gray-900 py-16 text-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href={'/'} className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <TbDragDrop className="h-5 w-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold text-white">DnD Builder</span>
            </Link>
            <p className="mb-4 mt-2 text-gray-400">
              The most powerful drag-and-drop page builder for React applications.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/dndbuilder/project"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <FiGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/dnd_builder"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </Link>
              <a
                href="mailto:support@dndbuilder.com"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <FiMail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/#features" className="transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="/changelog" className="transition-colors hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/docs" className="transition-colors hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="transition-colors hover:text-white">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/posts" className="transition-colors hover:text-white">
                  Blog Posts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="transition-colors hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-gray-400">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-gray-500">•</span>
            <Link href="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <span className="text-gray-500">•</span>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </div>
          <p className="text-center">&copy; 2025 DnD Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
