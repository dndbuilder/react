import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="pt-20">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              📝 What&apos;s New
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Changelog</h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Stay updated with our latest features, improvements, and bug fixes. Here&apos;s
              what&apos;s new in our React components library.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            {/* Contact Form */}
            <div className="mx-auto max-w-4xl">
              <Card className="border-0 shadow-xl">
                <Card.Content className="prose prose-gray max-w-none p-6">{children}</Card.Content>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
