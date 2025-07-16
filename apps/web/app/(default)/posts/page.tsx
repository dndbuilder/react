import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { LuBookOpen, LuCalendar, LuMessageCircle } from "react-icons/lu";

export default function BlogPostPage() {
  const upcomingTopics = [
    {
      title: "Getting Started with DnD Builder",
      description: "A comprehensive guide to building your first drag-and-drop interface",
      category: "Tutorial",
      estimatedDate: "Coming Soon",
    },
    {
      title: "Advanced Component Customization",
      description: "Learn how to create and customize components for your specific needs",
      category: "Advanced",
      estimatedDate: "Coming Soon",
    },
    {
      title: "Performance Optimization Tips",
      description: "Best practices for optimizing your page builder performance",
      category: "Performance",
      estimatedDate: "Coming Soon",
    },
    {
      title: "Building E-commerce Pages",
      description: "Step-by-step guide to creating product pages and shopping experiences",
      category: "Use Case",
      estimatedDate: "Coming Soon",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Coming Soon Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <LuBookOpen className="h-12 w-12 text-gray-800" />
            </div>
            <Badge variant="secondary" className="mb-4">
              🚧 Coming Soon
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Blog & Tutorials</h1>
            <p className="mb-8 text-xl text-gray-600">
              We&apos;re preparing in-depth tutorials, guides, and insights to help you master DnD
              Builder. Get notified when we publish our first posts!
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
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

      {/* Upcoming Content */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              What&apos;s Coming
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingTopics.map((topic, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <Card.Header>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {topic.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <LuCalendar className="mr-1 h-4 w-4" />
                        {topic.estimatedDate}
                      </div>
                    </div>
                    <Card.Title className="text-lg">{topic.title}</Card.Title>
                    <Card.Description>{topic.description}</Card.Description>
                  </Card.Header>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
