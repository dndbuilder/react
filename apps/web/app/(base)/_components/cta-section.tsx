import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { classNames } from "@/lib/utils";
import Link from "next/link";

interface CtaSectionProps {
  className?: string;
}

export function CtaSection({ className }: CtaSectionProps) {
  return (
    <section className={classNames("bg-gradient-to-r from-gray-900 to-black py-20", className)}>
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Ready to Start Building?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
          Join the developers who are creating stunning, responsive pages with our intuitive
          drag-and-drop builder
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white px-8 py-3 text-sm text-black hover:bg-gray-100"
            asChild
          >
            <Link href="/builder" target="_blank">
              Try Demo Now
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white bg-transparent px-8 py-3 text-sm text-white hover:bg-white hover:text-gray-900"
            asChild
          >
            <Link href="/docs" target="_blank">
              View Documentation
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
