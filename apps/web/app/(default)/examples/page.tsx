import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuCode, LuDownload, LuExternalLink, LuEye, LuGitFork, LuStar } from "react-icons/lu";

export default function ExamplesPage() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <LuCode className="h-12 w-12 text-gray-800" />
          </div>
          <Badge variant="secondary" className="mb-4">
            🚧 Coming Soon
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Examples Gallery</h1>
          <p className="mb-8 text-xl text-gray-600">
            We&apos;re curating an amazing collection of real-world examples, templates, and demos
            built with DnD Builder. Stay tuned for inspiration!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={"https://www.npmjs.com/package/@dndbuilder.com/react"} target="_blank">
              <Button size="lg" className="bg-black hover:bg-gray-800">
                <Link href={"/builder"} className="flex items-center">
                  <LuExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </Link>
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Link href="/" className="flex items-center">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  // const examples = [
  //   {
  //     title: "Landing Page Builder",
  //     description:
  //       "A complete landing page builder with hero sections, features, and contact forms",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Landing Page", "Marketing", "Forms"],
  //     difficulty: "Beginner",
  //     stars: 245,
  //     forks: 67,
  //     premium: false,
  //   },
  //   {
  //     title: "E-commerce Product Page",
  //     description: "Build product pages with image galleries, reviews, and purchase options",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["E-commerce", "Product", "Gallery"],
  //     difficulty: "Intermediate",
  //     stars: 189,
  //     forks: 43,
  //     premium: true,
  //   },
  //   {
  //     title: "Blog Post Editor",
  //     description: "Rich text editor for creating and editing blog posts with custom layouts",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Blog", "Editor", "Content"],
  //     difficulty: "Beginner",
  //     stars: 156,
  //     forks: 32,
  //     premium: false,
  //   },
  //   {
  //     title: "Dashboard Builder",
  //     description: "Create interactive dashboards with charts, tables, and data visualization",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Dashboard", "Charts", "Data"],
  //     difficulty: "Advanced",
  //     stars: 298,
  //     forks: 89,
  //     premium: true,
  //   },
  //   {
  //     title: "Portfolio Website",
  //     description: "Personal portfolio builder with project showcases and contact information",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Portfolio", "Personal", "Showcase"],
  //     difficulty: "Beginner",
  //     stars: 134,
  //     forks: 28,
  //     premium: false,
  //   },
  //   {
  //     title: "Event Landing Page",
  //     description: "Event promotion pages with registration forms and speaker information",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Events", "Registration", "Forms"],
  //     difficulty: "Intermediate",
  //     stars: 167,
  //     forks: 41,
  //     premium: false,
  //   },
  //   {
  //     title: "SaaS Application UI",
  //     description: "Complete SaaS application interface with premium components and layouts",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["SaaS", "Application", "Premium"],
  //     difficulty: "Advanced",
  //     stars: 312,
  //     forks: 95,
  //     premium: true,
  //   },
  //   {
  //     title: "Restaurant Menu",
  //     description: "Interactive restaurant menu with categories, images, and ordering system",
  //     image:
  //       "https://kzmljck8ae23j5r3iamn.lite.vusercontent.net/placeholder.svg?height=200&width=300",
  //     tags: ["Restaurant", "Menu", "Food"],
  //     difficulty: "Intermediate",
  //     stars: 98,
  //     forks: 23,
  //     premium: true,
  //   },
  // ];

  // const getDifficultyColor = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Beginner":
  //       return "bg-green-100 text-green-800";
  //     case "Intermediate":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "Advanced":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  //     <main className="container mx-auto px-4 py-16">
  //       {/* Hero Section */}
  //       <section className="py-20">
  //         <div className="container mx-auto px-4 text-center">
  //           <Badge variant="secondary" className="mb-4">
  //             🎨 Examples
  //           </Badge>
  //           <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Example Projects</h1>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
  //             Explore real-world examples built with DnD Builder. Get inspired and learn from these
  //             implementations.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-black hover:bg-gray-800">
  //               <LuCode className="mr-2 h-4 w-4" />
  //               Browse Code
  //             </Button>
  //             <Button variant="outline" size="lg">
  //               <LuExternalLink className="mr-2 h-4 w-4" />
  //               Live Demos
  //             </Button>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Filters */}
  //       <section className="py-8">
  //         <div className="container mx-auto px-4">
  //           <div className="flex flex-wrap justify-center gap-4">
  //             <Button variant="outline" size="sm">
  //               All Examples
  //             </Button>
  //             <Button variant="outline" size="sm">
  //               Free
  //             </Button>
  //             <Button variant="outline" size="sm">
  //               Premium
  //             </Button>
  //             <Button variant="outline" size="sm">
  //               Beginner
  //             </Button>
  //             <Button variant="outline" size="sm">
  //               Intermediate
  //             </Button>
  //             <Button variant="outline" size="sm">
  //               Advanced
  //             </Button>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Examples Grid */}
  //       <section className="py-12">
  //         <div className="container mx-auto px-4">
  //           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //             {examples.map((example, index) => (
  //               <Card
  //                 key={index}
  //                 className="group border-0 shadow-lg transition-shadow hover:shadow-xl"
  //               >
  //                 <div className="relative overflow-hidden rounded-t-lg">
  //                   <img
  //                     src={example.image || "/placeholder.svg"}
  //                     alt={example.title}
  //                     className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
  //                   />
  //                   {example.premium && (
  //                     <Badge className="absolute right-3 top-3 bg-black text-white">Premium</Badge>
  //                   )}
  //                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors duration-300 group-hover:bg-black/20 group-hover:opacity-100">
  //                     <div className="flex space-x-2">
  //                       <Button size="sm" variant="secondary">
  //                         <LuEye className="h-4 w-4" />
  //                       </Button>
  //                       <Button size="sm" variant="secondary">
  //                         <LuCode className="h-4 w-4" />
  //                       </Button>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <Card.Header className="pb-3">
  //                   <div className="mb-2 flex items-center justify-between">
  //                     <Card.Title className="text-lg">{example.title}</Card.Title>
  //                     <Badge className={`text-xs ${getDifficultyColor(example.difficulty)}`}>
  //                       {example.difficulty}
  //                     </Badge>
  //                   </div>
  //                   <Card.Description className="text-sm">{example.description}</Card.Description>
  //                 </Card.Header>
  //                 <Card.Content className="pt-0">
  //                   <div className="mb-4 flex flex-wrap gap-1">
  //                     {example.tags.map((tag, tagIndex) => (
  //                       <Badge key={tagIndex} variant="outline" className="text-xs">
  //                         {tag}
  //                       </Badge>
  //                     ))}
  //                   </div>
  //                   <div className="flex items-center justify-between text-sm text-gray-600">
  //                     <div className="flex items-center space-x-4">
  //                       <div className="flex items-center">
  //                         <LuStar className="mr-1 h-4 w-4" />
  //                         {example.stars}
  //                       </div>
  //                       <div className="flex items-center">
  //                         <LuGitFork className="mr-1 h-4 w-4" />
  //                         {example.forks}
  //                       </div>
  //                     </div>
  //                     <Button size="sm" variant="ghost">
  //                       <LuDownload className="h-4 w-4" />
  //                     </Button>
  //                   </div>
  //                 </Card.Content>
  //               </Card>
  //             ))}
  //           </div>
  //         </div>
  //       </section>

  //       {/* Submit Example */}
  //       <section className="bg-white py-20">
  //         <div className="container mx-auto px-4 text-center">
  //           <h2 className="mb-4 text-3xl font-bold text-gray-900">Share Your Creation</h2>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
  //             Built something amazing with DnD Builder? Share it with the community and inspire
  //             others.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-black hover:bg-gray-800">
  //               Submit Example
  //             </Button>
  //             <Button variant="outline" size="lg">
  //               Contribution Guidelines
  //             </Button>
  //           </div>
  //         </div>
  //       </section>

  //       {/* CTA */}
  //       <section className="bg-gradient-to-r from-gray-900 to-black py-20">
  //         <div className="container mx-auto px-4 text-center text-white">
  //           <h2 className="mb-6 text-3xl font-bold">Ready to Build Your Own?</h2>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
  //             Start with our examples and create something unique for your project.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-white text-black hover:bg-gray-100">
  //               Get Started Free
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="lg"
  //               className="border-white bg-transparent text-white hover:bg-white/10"
  //             >
  //               View Documentation
  //             </Button>
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   </div>
  // );
}
