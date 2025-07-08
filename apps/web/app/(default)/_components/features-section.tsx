import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FiLayers, FiMousePointer } from 'react-icons/fi';
import { LuUndo, LuSmartphone, LuPalette } from 'react-icons/lu';
import { classNames } from '@/lib/utils';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface FeaturesSectionProps {
  className?: string;
}

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section className={classNames('bg-white py-20', className)} id="features">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Everything You Need to Build
          </h2>
          <p className="mx-auto text-xl text-gray-600">
            From basic building blocks to advanced components, we&apos;ve got you covered
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <FiLayers className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title>Block-Based Architecture</Card.Title>
              <Card.Description>
                Build pages using pre-defined or custom blocks with a modular approach
              </Card.Description>
            </Card.Header>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <FiMousePointer className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title>Drag & Drop Interface</Card.Title>
              <Card.Description>
                Intuitive drag-and-drop functionality powered by React DND
              </Card.Description>
            </Card.Header>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <LuUndo className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title>Undo/Redo Support</Card.Title>
              <Card.Description>
                Built-in history management with Redux Undo for seamless editing
              </Card.Description>
            </Card.Header>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <LuSmartphone className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title>Responsive Design</Card.Title>
              <Card.Description>
                Create layouts that work perfectly across all devices and screen sizes
              </Card.Description>
            </Card.Header>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <LuPalette className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title>Customizable UI</Card.Title>
              <Card.Description>
                Extensive styling options with Tailwind CSS integration
              </Card.Description>
            </Card.Header>
          </Card>

          <Card className="relative border-0 shadow-lg transition-shadow hover:shadow-xl">
            <Card.Header>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <AiOutlineCloudUpload className="h-6 w-6 text-gray-900" />
              </div>
              <Card.Title className="">
                Asset Manager
                <Badge
                  variant="outline"
                  className="absolute right-3 top-3 border-yellow-300 bg-yellow-500/10 text-yellow-500"
                >
                  Coming Soon
                </Badge>
              </Card.Title>
              <Card.Description>
                Manage images, videos, and other assets with an integrated asset manager
              </Card.Description>
            </Card.Header>
          </Card>
        </div>
      </div>
    </section>
  );
}
