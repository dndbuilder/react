import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuMail, LuMapPin, LuPhone, LuSend } from "react-icons/lu";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              💬 Get in Touch
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Contact Us</h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Have questions about DnD Builder? We're here to help. Reach out to our team and we'll
              get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="mb-16 grid gap-8 md:grid-cols-3">
              <Card className="border-0 text-center shadow-lg">
                <Card.Header>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <LuMail className="h-6 w-6 text-gray-900" />
                  </div>
                  <Card.Title className="text-lg">Email Support</Card.Title>
                  <Card.Description>Get help via email</Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className="font-medium text-gray-900">support@dndbuilder.com</p>
                  <p className="mt-2 text-sm text-gray-600">Response within 24 hours</p>
                </Card.Content>
              </Card>

              <Card className="border-0 text-center shadow-lg">
                <Card.Header>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <LuPhone className="h-6 w-6 text-gray-900" />
                  </div>
                  <Card.Title className="text-lg">Phone Support</Card.Title>
                  <Card.Description>Talk to our team</Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                  <p className="mt-2 text-sm text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                </Card.Content>
              </Card>

              <Card className="border-0 text-center shadow-lg">
                <Card.Header>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <LuMapPin className="h-6 w-6 text-gray-900" />
                  </div>
                  <Card.Title className="text-lg">Office</Card.Title>
                  <Card.Description>Visit us in person</Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className="font-medium text-gray-900">123 Tech Street</p>
                  <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
                </Card.Content>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="mx-auto max-w-2xl">
              <Card className="border-0 shadow-xl">
                <Card.Header className="text-center">
                  <Card.Title className="text-2xl">Send us a Message</Card.Title>
                  <Card.Description>
                    Fill out the form below and we'll get back to you soon
                  </Card.Description>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Subject</label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-800">
                    <LuSend className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </Card.Content>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
