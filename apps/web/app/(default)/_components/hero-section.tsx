import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuArrowRight, LuDownload, LuPlay } from "react-icons/lu";
import { classNames } from "@/lib/utils";
import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={classNames("py-20 lg:py-32", className)}>
      <div className="container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Now with Premium Features
        </Badge>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
          Build Beautiful Pages with
          <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
            {" "}
            Drag & Drop
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-gray-600">
          A powerful React page builder with block-based architecture. Create stunning, responsive
          pages with intuitive drag-and-drop functionality and extensive customization options.
        </p>
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-black px-8 text-white hover:bg-gray-800" asChild>
            <Link href="/builder">
              <LuPlay className="mr-2 h-4 w-4" />
              Try Demo Now
              <LuArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 bg-transparent px-8"
            asChild
          >
            <Link href="/docs">
              Documentation
              <LuArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
