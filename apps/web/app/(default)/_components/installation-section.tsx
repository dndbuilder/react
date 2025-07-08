'use client';

import { Button } from '@/components/ui/button';
import { classNames } from '@/lib/utils';
import { Tabs } from '@dndbuilder.com/react/components';
import { useState } from 'react';

interface InstallationSectionProps {
  className?: string;
}

export function InstallationSection({ className }: InstallationSectionProps) {
  const [activeTab, setActiveTab] = useState('install');

  return (
    <section className={classNames('bg-white py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mx-auto text-xl text-gray-600">
            Install the package and start building beautiful pages right away
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 bg-white shadow-sm">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex items-center border-b border-gray-300 px-4">
              <Tabs.List className="h-12">
                <Tabs.Trigger
                  className="relative h-full after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:bg-gray-900 after:opacity-0 data-[state=active]:text-gray-900 data-[state=active]:after:opacity-100"
                  value="install"
                >
                  Installation
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="relative h-full after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:bg-gray-900 after:opacity-0 data-[state=active]:text-gray-900 data-[state=active]:after:opacity-100"
                  value="setup"
                >
                  Setup
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="relative h-full after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:bg-gray-900 after:opacity-0 data-[state=active]:text-gray-900 data-[state=active]:after:opacity-100"
                  value="usage"
                >
                  Usage
                </Tabs.Trigger>
              </Tabs.List>
              {/* <div className="ml-auto flex items-center gap-2">
                <Button variant="secondary" size="sm" className="h-8 text-xs">
                  Copy
                </Button>
              </div> */}
            </div>
            <Tabs.Content value="install" className="p-4">
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-gray-800">
                <code className="text-sm">
                  {`# Using npm
npm install @dndbuilder.com/react

# Using yarn
yarn add @dndbuilder.com/react

# Using pnpm
pnpm add @dndbuilder.com/react`}
                </code>
              </pre>
            </Tabs.Content>
            <Tabs.Content value="setup" className="p-4">
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-gray-800">
                <code className="text-sm">
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
        />
      </BuilderProvider>
  );
}

export default App;`}
                </code>
              </pre>
            </Tabs.Content>
            <Tabs.Content value="usage" className="p-4">
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-gray-800">
                <code className="text-sm">
                  {`import { useContent } from "@dndbuilder.com/react";

function SaveButton() {
  const { content } = useContent();

  const handleSave = () => {
    // Save content to your backend or local storage
    console.log("Saving content:", content);
  };

  return <button onClick={handleSave}>Save Content</button>;
}

// To render content on frontend
import { RenderContent } from "@dndbuilder.com/react/components/server";

async function MyPage() {
  const content = await fetchContent(); // Fetch from your backend
  return <RenderContent content={content} />;
}`}
                </code>
              </pre>
            </Tabs.Content>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
