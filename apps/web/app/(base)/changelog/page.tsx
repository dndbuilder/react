import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuArrowRight, LuBug, LuCalendar, LuPlus, LuShield, LuZap } from "react-icons/lu";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v2.1.0",
      date: "July 01, 2025",
      type: "major",
      changes: [
        {
          type: "feature",
          title: "Premium Features Released",
          description:
            "Introducing Advanced blocks, Global Theme Settings, Block Library, and Asset Manager for Premium users",
        },
        {
          type: "feature",
          title: "Enhanced Plugin System",
          description: "New plugin architecture with better performance and easier development",
        },
        {
          type: "improvement",
          title: "Improved Drag & Drop Performance",
          description: "Optimized drag and drop operations for better user experience",
        },
        {
          type: "fix",
          title: "Fixed Block Duplication Issue",
          description: "Resolved issue where blocks would sometimes duplicate when dragging",
        },
      ],
    },
    {
      version: "v2.0.5",
      date: "December 20, 2023",
      type: "patch",
      changes: [
        {
          type: "fix",
          title: "Safari Compatibility Fix",
          description: "Fixed drag and drop issues in Safari browser",
        },
        {
          type: "fix",
          title: "Mobile Touch Events",
          description: "Improved touch event handling on mobile devices",
        },
        {
          type: "improvement",
          title: "Bundle Size Optimization",
          description: "Reduced bundle size by 15% through better tree-shaking",
        },
      ],
    },
    {
      version: "v2.0.0",
      date: "November 30, 2023",
      type: "major",
      changes: [
        {
          type: "feature",
          title: "Complete Rewrite with TypeScript",
          description: "Fully rewritten in TypeScript for better developer experience",
        },
        {
          type: "feature",
          title: "New Block System",
          description: "Redesigned block architecture with better customization options",
        },
        {
          type: "feature",
          title: "Responsive Design Tools",
          description: "Built-in responsive design tools for creating mobile-friendly layouts",
        },
        {
          type: "breaking",
          title: "Breaking: API Changes",
          description: "Updated API structure - migration guide available in documentation",
        },
      ],
    },
    {
      version: "v1.8.2",
      date: "October 15, 2023",
      type: "patch",
      changes: [
        {
          type: "fix",
          title: "Memory Leak Fix",
          description: "Fixed memory leak in undo/redo system",
        },
        {
          type: "improvement",
          title: "Performance Improvements",
          description: "Various performance optimizations for large projects",
        },
      ],
    },
    {
      version: "v1.8.0",
      date: "September 28, 2023",
      type: "minor",
      changes: [
        {
          type: "feature",
          title: "Undo/Redo System",
          description: "Added comprehensive undo/redo functionality with Redux Undo",
        },
        {
          type: "feature",
          title: "Custom CSS Support",
          description: "Added ability to inject custom CSS for advanced styling",
        },
        {
          type: "improvement",
          title: "Better Error Handling",
          description: "Improved error messages and debugging information",
        },
      ],
    },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <LuPlus className="h-4 w-4 text-green-600" />;
      case "fix":
        return <LuBug className="h-4 w-4 text-red-600" />;
      case "improvement":
        return <LuZap className="h-4 w-4 text-blue-600" />;
      case "breaking":
        return <LuShield className="h-4 w-4 text-orange-600" />;
      default:
        return <LuArrowRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge className="bg-green-600 text-white">Major Release</Badge>;
      case "minor":
        return <Badge variant="secondary">Minor Release</Badge>;
      case "patch":
        return <Badge variant="outline">Patch Release</Badge>;
      default:
        return <Badge variant="secondary">Release</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        {/* Changelog */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {releases.map((release, index) => (
                <div key={index} className="mb-12">
                  <Card className="border-0 shadow-lg">
                    <Card.Header>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Card.Title className="text-2xl">{release.version}</Card.Title>
                          {getVersionBadge(release.type)}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <LuCalendar className="mr-2 h-4 w-4" />
                          {release.date}
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Content>
                      <div className="space-y-4">
                        {release.changes.map((change, changeIndex) => (
                          <div
                            key={changeIndex}
                            className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4"
                          >
                            <div className="mt-0.5 flex-shrink-0">{getChangeIcon(change.type)}</div>
                            <div className="flex-1">
                              <h4 className="mb-1 font-semibold text-gray-900">{change.title}</h4>
                              <p className="text-sm text-gray-600">{change.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Releases
              </Button>
            </div>
          </div>
        </section>
        {/* Subscribe to Updates */}
        {/* <section className="bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Stay Updated</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Subscribe to our newsletter to get notified about new releases and important updates.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>{" "} */}
      </main>
    </div>
  );
}
