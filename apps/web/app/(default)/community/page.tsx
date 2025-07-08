import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import {
  LuAward,
  LuCalendar,
  LuClock,
  LuExternalLink,
  LuHeart,
  LuMessageCircle,
  LuMessageSquare,
  LuUsers,
} from 'react-icons/lu';

export default function CommunityPage() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <LuUsers className="h-12 w-12 text-gray-800" />
          </div>
          <Badge variant="secondary" className="mb-4">
            🚧 Coming Soon
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Community</h1>
          <p className="mb-8 text-xl text-gray-600">
            We&apos;re building an amazing community platform where developers can connect, share
            projects, and help each other. Join our waitlist to be notified when it launches!
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

  // const stats = [
  //   { label: "Community Members", value: "12,500+", icon: LuUsers },
  //   { label: "Monthly Posts", value: "2,800+", icon: LuMessageSquare },
  //   { label: "Projects Shared", value: "5,200+", icon: LuHeart },
  //   { label: "Expert Contributors", value: "150+", icon: LuAward },
  // ];

  // const channels = [
  //   {
  //     name: "General Discussion",
  //     description: "Chat about DnD Builder and share your experiences",
  //     members: "8,500+",
  //     activity: "Very Active",
  //   },
  //   {
  //     name: "Show & Tell",
  //     description: "Share your amazing projects and get feedback",
  //     members: "6,200+",
  //     activity: "Active",
  //   },
  //   {
  //     name: "Help & Support",
  //     description: "Get help from the community and our team",
  //     members: "9,100+",
  //     activity: "Very Active",
  //   },
  //   {
  //     name: "Feature Requests",
  //     description: "Suggest new features and vote on ideas",
  //     members: "3,800+",
  //     activity: "Moderate",
  //   },
  //   {
  //     name: "Developers",
  //     description: "Technical discussions and plugin development",
  //     members: "2,400+",
  //     activity: "Active",
  //   },
  //   {
  //     name: "Tutorials & Tips",
  //     description: "Share tutorials and learn new techniques",
  //     members: "4,700+",
  //     activity: "Active",
  //   },
  // ];

  // const events = [
  //   {
  //     title: "Monthly Community Call",
  //     date: "Jan 15, 2024",
  //     time: "2:00 PM EST",
  //     description: "Join our monthly community call to discuss updates and roadmap",
  //   },
  //   {
  //     title: "Build Challenge: Landing Pages",
  //     date: "Jan 20-27, 2024",
  //     time: "All Week",
  //     description: "Weekly challenge to build the best landing page using DnD Builder",
  //   },
  //   {
  //     title: "Plugin Development Workshop",
  //     date: "Feb 3, 2024",
  //     time: "11:00 AM EST",
  //     description: "Learn how to create custom plugins for DnD Builder",
  //   },
  // ];

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  //     <main className="container mx-auto px-4 py-16">
  //       {/* Hero Section */}
  //       <section className="py-20">
  //         <div className="container mx-auto px-4 text-center">
  //           <Badge variant="secondary" className="mb-4">
  //             👥 Community
  //           </Badge>
  //           <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
  //             Join Our Community
  //           </h1>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
  //             Connect with thousands of developers, share your projects, get help, and help others
  //             build amazing experiences with DnD Builder.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-black hover:bg-gray-800">
  //               <LuExternalLink className="mr-2 h-4 w-4" />
  //               Join Discord
  //             </Button>
  //             <Button variant="outline" size="lg">
  //               Browse GitHub
  //             </Button>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Stats */}
  //       <section className="py-12">
  //         <div className="container mx-auto px-4">
  //           <div className="mb-16 grid gap-8 md:grid-cols-4">
  //             {stats.map((stat, index) => (
  //               <Card key={index} className="border-0 text-center shadow-lg">
  //                 <Card.Header>
  //                   <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
  //                     <stat.icon className="h-6 w-6 text-gray-900" />
  //                   </div>
  //                   <Card.Title className="text-2xl font-bold text-gray-900">
  //                     {stat.value}
  //                   </Card.Title>
  //                   <Card.Description>{stat.label}</Card.Description>
  //                 </Card.Header>
  //               </Card>
  //             ))}
  //           </div>

  //           {/* Community Channels */}
  //           <div className="mb-16">
  //             <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
  //               Community Channels
  //             </h2>
  //             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  //               {channels.map((channel, index) => (
  //                 <Card
  //                   key={index}
  //                   className="cursor-pointer border-0 shadow-lg transition-shadow hover:shadow-xl"
  //                 >
  //                   <Card.Header>
  //                     <div className="mb-2 flex items-center justify-between">
  //                       <Card.Title className="text-lg">{channel.name}</Card.Title>
  //                       <Badge
  //                         variant={channel.activity === "Very Active" ? "default" : "secondary"}
  //                         className="text-xs"
  //                       >
  //                         {channel.activity}
  //                       </Badge>
  //                     </div>
  //                     <Card.Description>{channel.description}</Card.Description>
  //                   </Card.Header>
  //                   <Card.Content>
  //                     <div className="flex items-center justify-between text-sm text-gray-600">
  //                       <span>{channel.members} members</span>
  //                       <LuExternalLink className="h-4 w-4" />
  //                     </div>
  //                   </Card.Content>
  //                 </Card>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Upcoming Events */}
  //           <div>
  //             <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Upcoming Events</h2>
  //             <div className="mx-auto max-w-4xl space-y-6">
  //               {events.map((event, index) => (
  //                 <Card key={index} className="border-0 shadow-lg">
  //                   <Card.Content className="p-6">
  //                     <div className="flex flex-col justify-between md:flex-row md:items-center">
  //                       <div className="flex-1">
  //                         <h3 className="mb-2 text-xl font-semibold text-gray-900">
  //                           {event.title}
  //                         </h3>
  //                         <p className="mb-4 text-gray-600">{event.description}</p>
  //                         <div className="flex items-center space-x-4 text-sm text-gray-500">
  //                           <div className="flex items-center">
  //                             <LuCalendar className="mr-1 h-4 w-4" />
  //                             {event.date}
  //                           </div>
  //                           <div className="flex items-center">
  //                             <LuClock className="mr-1 h-4 w-4" />
  //                             {event.time}
  //                           </div>
  //                         </div>
  //                       </div>
  //                       <div className="mt-4 md:ml-6 md:mt-0">
  //                         <Button variant="outline">Learn More</Button>
  //                       </div>
  //                     </div>
  //                   </Card.Content>
  //                 </Card>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Community Guidelines */}
  //       <section className="bg-white py-20">
  //         <div className="container mx-auto px-4">
  //           <div className="mx-auto max-w-4xl">
  //             <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
  //               Community Guidelines
  //             </h2>
  //             <div className="grid gap-8 md:grid-cols-2">
  //               <Card className="border-0 shadow-lg">
  //                 <Card.Header>
  //                   <Card.Title className="text-xl">Be Respectful</Card.Title>
  //                 </Card.Header>
  //                 <Card.Content>
  //                   <p className="text-gray-600">
  //                     Treat all community members with respect and kindness. We're all here to learn
  //                     and help each other.
  //                   </p>
  //                 </Card.Content>
  //               </Card>

  //               <Card className="border-0 shadow-lg">
  //                 <Card.Header>
  //                   <Card.Title className="text-xl">Share Knowledge</Card.Title>
  //                 </Card.Header>
  //                 <Card.Content>
  //                   <p className="text-gray-600">
  //                     Share your projects, tutorials, and tips. Help others learn and grow their
  //                     skills with DnD Builder.
  //                   </p>
  //                 </Card.Content>
  //               </Card>

  //               <Card className="border-0 shadow-lg">
  //                 <Card.Header>
  //                   <Card.Title className="text-xl">Stay On Topic</Card.Title>
  //                 </Card.Header>
  //                 <Card.Content>
  //                   <p className="text-gray-600">
  //                     Keep discussions relevant to DnD Builder and web development. Use appropriate
  //                     channels for different topics.
  //                   </p>
  //                 </Card.Content>
  //               </Card>

  //               <Card className="border-0 shadow-lg">
  //                 <Card.Header>
  //                   <Card.Title className="text-xl">No Spam</Card.Title>
  //                 </Card.Header>
  //                 <Card.Content>
  //                   <p className="text-gray-600">
  //                     Avoid excessive self-promotion and spam. Share your work, but make sure it
  //                     adds value to the community.
  //                   </p>
  //                 </Card.Content>
  //               </Card>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* CTA */}
  //       <section className="bg-gradient-to-r from-gray-900 to-black py-20">
  //         <div className="container mx-auto px-4 text-center text-white">
  //           <h2 className="mb-6 text-3xl font-bold">Ready to Join?</h2>
  //           <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
  //             Become part of our growing community and connect with developers from around the
  //             world.
  //           </p>
  //           <div className="flex flex-col justify-center gap-4 sm:flex-row">
  //             <Button size="lg" className="bg-white text-black hover:bg-gray-100">
  //               <LuExternalLink className="mr-2 h-4 w-4" />
  //               Join Discord Server
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="lg"
  //               className="border-white bg-transparent text-white hover:bg-white/10"
  //             >
  //               Follow on GitHub
  //             </Button>
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   </div>
  // );
}
