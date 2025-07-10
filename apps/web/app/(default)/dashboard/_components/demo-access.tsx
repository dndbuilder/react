"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { LuExternalLink, LuPlay } from "react-icons/lu";

export function DemoAccess() {
  return (
    <Card className="shadow-sm">
      <Card.Header className="space-y-1 sm:space-y-2">
        <div className="flex items-center space-x-2">
          <LuPlay className="h-4 w-4 text-black sm:h-5 sm:w-5" />
          <Card.Title className="text-lg text-black sm:text-xl">Try the Builder</Card.Title>
        </div>
        <Card.Description className="text-xs sm:text-sm">
          Experience the full power of DnD Builder with our interactive demo.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-3 sm:space-y-4">
        <Button
          className="w-full bg-black py-2 text-xs text-white hover:bg-gray-800 sm:text-sm"
          asChild
        >
          <Link href={"/builder"} target="_blank">
            <LuExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Open Builder Demo
          </Link>
        </Button>
        <p className="text-xs text-gray-500">
          The demo includes all premium blocks and features available with your license.
        </p>
      </Card.Content>
    </Card>
  );
}