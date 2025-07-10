"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export function QuickLinks() {
  return (
    <Card className="shadow-sm">
      <Card.Header className="space-y-1 sm:space-y-2">
        <Card.Title className="text-lg text-black sm:text-xl">Quick Links</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-2 sm:space-y-3">
        <Link
          href="/docs"
          className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
          <span className="text-xs sm:text-sm">Documentation</span>
          <LuExternalLink className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
        </Link>
        <Link
          href="/examples"
          className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
          <span className="text-xs sm:text-sm">Code Examples</span>
          <LuExternalLink className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
        </Link>
        <Link
          href="/help"
          className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
          <span className="text-xs sm:text-sm">Support Center</span>
          <LuExternalLink className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
        </Link>
        <Link
          href="/changelog"
          className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
        >
          <span className="text-xs sm:text-sm">Changelog</span>
          <LuExternalLink className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
        </Link>
      </Card.Content>
    </Card>
  );
}