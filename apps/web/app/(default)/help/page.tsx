import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GrHelpBook } from 'react-icons/gr';
import { LuMessageCircle } from 'react-icons/lu';

export default function HelpCenterPage() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <GrHelpBook className="h-12 w-12 text-gray-800" />
          </div>
          <Badge variant="secondary" className="mb-4">
            🚧 Coming Soon
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Help Center</h1>
          <p className="mb-8 text-xl text-gray-600">
            We&apos;re building a comprehensive help center with documentation, tutorials, and
            support resources. Stay tuned for updates!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-black hover:bg-gray-800">
              <Link href="/contact" className="flex items-center">
                {' '}
                <LuMessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
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

  // const categories = [
  //   {
  //     title: "Getting Started",
  //     description: "Learn the basics of DnD Builder",
  //     icon: LuBook,
  //     articles: [
  //       "Quick Start Guide",
  //       "Installation & Setup",
  //       "Your First Page Builder",
  //       "Understanding Blocks",
  //     ],
  //   },
  //   {
  //     title: "Components & Blocks",
  //     description: "Master our component library",
  //     icon: LuFileText,
  //     articles: [
  //       "Basic Components",
  //       "Premium Components",
  //       "Custom Block Creation",
  //       "Block Configuration",
  //     ],
  //   },
  //   {
  //     title: "Advanced Features",
  //     description: "Unlock the full potential",
  //     icon: LuVideo,
  //     articles: [
  //       "Plugin Development",
  //       "Custom Styling",
  //       "API Integration",
  //       "Performance Optimization",
  //     ],
  //   },
  // ];

  // const popularArticles = [
  //   "How to create custom blocks",
  //   "Setting up drag and drop",
  //   "Styling with Tailwind CSS",
  //   "Saving and loading content",
  //   "Premium features overview",
  // ];

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  //     <main className="container mx-auto px-4 py-16">
  //       {/* Hero Section */}
  //       <section className="py-20">
  //         <div className="container mx-auto px-4 text-center">
  //           <Badge variant="secondary" className="mb-4">
  //             📚 Help Center
  //           </Badge>
  //           <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
  //             How can we help you?
  //           </h1>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
  //             Find answers to your questions, learn how to use DnD Builder, and get the most out of
  //             our platform.
  //           </p>

  //           {/* Search Bar */}
  //           <div className="relative mx-auto max-w-2xl">
  //             <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
  //             <input
  //               type="text"
  //               placeholder="Search for help articles..."
  //               className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
  //             />
  //           </div>
  //         </div>
  //       </section>

  //       {/* Quick Actions */}
  //       <section className="py-12">
  //         <div className="container mx-auto px-4">
  //           <div className="mb-16 grid gap-8 md:grid-cols-3">
  //             <Card className="cursor-pointer border-0 text-center shadow-lg transition-shadow hover:shadow-xl">
  //               <Card.Header>
  //                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
  //                   <LuMessageCircle className="h-6 w-6 text-gray-900" />
  //                 </div>
  //                 <Card.Title className="text-lg">Live Chat</Card.Title>
  //                 <Card.Description>Get instant help from our support team</Card.Description>
  //               </Card.Header>
  //               <Card.Content>
  //                 <Button variant="outline" className="w-full bg-transparent">
  //                   Start Chat
  //                 </Button>
  //               </Card.Content>
  //             </Card>

  //             <Card className="cursor-pointer border-0 text-center shadow-lg transition-shadow hover:shadow-xl">
  //               <Card.Header>
  //                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
  //                   <LuVideo className="h-6 w-6 text-gray-900" />
  //                 </div>
  //                 <Card.Title className="text-lg">Video Tutorials</Card.Title>
  //                 <Card.Description>Watch step-by-step video guides</Card.Description>
  //               </Card.Header>
  //               <Card.Content>
  //                 <Button variant="outline" className="w-full bg-transparent">
  //                   Watch Videos
  //                 </Button>
  //               </Card.Content>
  //             </Card>

  //             <Card className="cursor-pointer border-0 text-center shadow-lg transition-shadow hover:shadow-xl">
  //               <Card.Header>
  //                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
  //                   <LuBook className="h-6 w-6 text-gray-900" />
  //                 </div>
  //                 <Card.Title className="text-lg">Documentation</Card.Title>
  //                 <Card.Description>Browse our comprehensive docs</Card.Description>
  //               </Card.Header>
  //               <Card.Content>
  //                 <Button variant="outline" className="w-full bg-transparent">
  //                   View Docs
  //                 </Button>
  //               </Card.Content>
  //             </Card>
  //           </div>

  //           {/* Categories */}
  //           <div className="mb-16">
  //             <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
  //               Browse by Category
  //             </h2>
  //             <div className="grid gap-8 md:grid-cols-3">
  //               {categories.map((category, index) => (
  //                 <Card
  //                   key={index}
  //                   className="border-0 shadow-lg transition-shadow hover:shadow-xl"
  //                 >
  //                   <Card.Header>
  //                     <div className="mb-4 flex items-center space-x-3">
  //                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
  //                         <category.icon className="h-5 w-5 text-gray-900" />
  //                       </div>
  //                       <div>
  //                         <Card.Title className="text-lg">{category.title}</Card.Title>
  //                         <Card.Description className="text-sm">
  //                           {category.description}
  //                         </Card.Description>
  //                       </div>
  //                     </div>
  //                   </Card.Header>
  //                   <Card.Content>
  //                     <ul className="space-y-2">
  //                       {category.articles.map((article, articleIndex) => (
  //                         <li key={articleIndex}>
  //                           <Link
  //                             href="#"
  //                             className="flex items-center justify-between text-gray-600 transition-colors hover:text-gray-900"
  //                           >
  //                             <span>{article}</span>
  //                             <LuChevronRight className="h-4 w-4" />
  //                           </Link>
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </Card.Content>
  //                 </Card>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Popular Articles */}
  //           <div>
  //             <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
  //               Popular Articles
  //             </h2>
  //             <Card className="mx-auto max-w-2xl border-0 shadow-lg">
  //               <Card.Content className="p-6">
  //                 <ul className="space-y-4">
  //                   {popularArticles.map((article, index) => {
  //                     return (
  //                       <li key={index}>
  //                         <Link
  //                           href="#"
  //                           className="flex items-center justify-between py-2 text-gray-700 transition-colors hover:text-gray-900"
  //                         >
  //                           <span className="font-medium">{article}</span>
  //                           <LuChevronRight className="h-4 w-4" />
  //                         </Link>
  //                       </li>
  //                     );
  //                   })}
  //                 </ul>
  //               </Card.Content>
  //             </Card>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Contact Support */}
  //       <section className="bg-white py-20">
  //         <div className="container mx-auto px-4 text-center">
  //           <h2 className="mb-4 text-3xl font-bold text-gray-900">Still need help?</h2>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
  //             Can't find what you're looking for? Our support team is here to help you get unstuck.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-black hover:bg-gray-800">
  //               Contact Support
  //             </Button>
  //             <Button variant="outline" size="lg">
  //               Join Community
  //             </Button>
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   </div>
  // );
}
