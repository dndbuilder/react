"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@dndbuilder.com/react/components";
import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  LuCopy,
  LuExternalLink,
  LuEye,
  LuEyeOff,
  LuKey,
  LuPlay,
  LuRefreshCw,
} from "react-icons/lu";
import { toast } from "sonner";

export default function Dashboard() {
  const [licenseKey, setLicenseKey] = useState("dnd_live_sk_1234567890abcdef1234567890abcdef");
  const [showKey, setShowKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newKey = `dnd_live_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setLicenseKey(newKey);
    setIsGenerating(false);
    toast.success("New license key generated successfully!");
  };

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    toast.success("License key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const maskedKey = licenseKey.replace(/(.{12})(.*)(.{8})/, "$1" + "*".repeat(20) + "$3");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600">
            Manage your DnD Builder license and access developer tools.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* License Key Management */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <Card.Header>
                <div className="flex items-center space-x-2">
                  <LuKey className="h-5 w-5 text-black" />
                  <Card.Title className="text-xl text-black">License Key Management</Card.Title>
                </div>
                <Card.Description>
                  Your license key is required to access premium blocks and features in production.
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="license-key">Current License Key</Label>
                  <div className="mt-2 flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="license-key"
                        type={showKey ? "text" : "password"}
                        value={showKey ? licenseKey : maskedKey}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleCopyKey}
                      className="flex items-center space-x-2 bg-transparent"
                    >
                      {copied ? (
                        <FiCheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <LuCopy className="h-4 w-4" />
                      )}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400">
                      <span className="text-xs font-bold text-yellow-800">!</span>
                    </div>
                    <div className="text-sm">
                      <p className="mb-1 font-medium text-yellow-800">
                        Keep your license key secure
                      </p>
                      <p className="text-yellow-700">
                        Don't share your license key publicly. It should only be used in your
                        application's environment variables.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <Button
                        onClick={handleGenerateKey}
                        disabled={true} // Disable until backend is implemented
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        {isGenerating ? (
                          <>
                            <LuRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <LuRefreshCw className="mr-2 h-4 w-4" />
                            Regenerate Key
                          </>
                        )}
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="rounded text-xs">
                      Coming soon! Regenerate your license key to refresh access.
                    </Tooltip.Content>
                  </Tooltip>
                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <Button variant="outline" disabled>
                        View Usage Stats
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="rounded text-xs">
                      Coming soon! Usage statistics will be available in future updates.
                    </Tooltip.Content>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>

            {/* Integration Guide */}
            <Card className="mt-6 shadow-sm">
              <Card.Header>
                <Card.Title className="text-xl text-black">Quick Integration</Card.Title>
                <Card.Description>
                  Add your license key to your environment variables to unlock premium features.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto rounded-lg bg-gray-900 p-4">
                  <pre className="text-sm text-gray-100">
                    <code>
                      {" "}
                      {`import React from "react";
import { Block } from "@dndbuilder.com/react";
import { BuilderProvider, Editor } from "@dndbuilder.com/react";
import "@dndbuilder.com/react/dist/style.css";
import { store } from "@dndbuilder.com/react";

function App() {
  return (
     <BuilderProvider store={store}>
        <Editor
          content={initialContent}
          licenseKey="dnd_live_sk_1234567890abcdef1234567890abcdef" // Your license key here
        />
      </BuilderProvider>
  );
}

export default App;`}
                    </code>
                  </pre>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demo Access */}
            <Card className="shadow-sm">
              <Card.Header>
                <div className="flex items-center space-x-2">
                  <LuPlay className="h-5 w-5 text-black" />
                  <Card.Title className="text-xl text-black">Try the Builder</Card.Title>
                </div>
                <Card.Description>
                  Experience the full power of DnD Builder with our interactive demo.
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                  <Link href={"/builder"} target="_blank">
                    <LuExternalLink className="mr-2 h-4 w-4" />
                    Open Builder Demo
                  </Link>
                </Button>
                <p className="text-xs text-gray-500">
                  The demo includes all premium blocks and features available with your license.
                </p>
              </Card.Content>
            </Card>

            {/* Account Status */}
            {/* <Card className="shadow-sm">
              <Card.Header>
                <Card.Title className="text-black">Account Status</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plan</span>
                  <Badge className="bg-black text-white">Free</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Billing</span>
                  <span className="text-sm font-medium">Jan 15, 2025</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Subscription
                </Button>
              </Card.Content>
            </Card> */}

            {/* Quick Links */}
            <Card className="shadow-sm">
              <Card.Header>
                <Card.Title className="text-xl text-black">Quick Links</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-3">
                <Link
                  href="/docs"
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm">Documentation</span>
                  <LuExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/examples"
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm">Code Examples</span>
                  <LuExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/help"
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm">Support Center</span>
                  <LuExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/changelog"
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm">Changelog</span>
                  <LuExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
              </Card.Content>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
