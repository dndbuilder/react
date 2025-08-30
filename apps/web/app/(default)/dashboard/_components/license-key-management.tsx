"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@dndbuilder.com/react/components";
import { LuCopy, LuEye, LuEyeOff, LuKey, LuRefreshCw } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";
import { regenerateLicenseKey } from "@/lib/license";

type LicenseKeyManagementProps = {
  licenseKey: string;
};

export function LicenseKeyManagement({ licenseKey: initialLicenseKey }: LicenseKeyManagementProps) {
  const [licenseKey, setLicenseKey] = useState(initialLicenseKey);
  const [showKey, setShowKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      const newKey = await regenerateLicenseKey();
      setLicenseKey(newKey);
      toast.success("New license key generated successfully!");
    } catch (error) {
      toast.error("Failed to generate new license key. Please try again.");
      console.error("Error generating license key:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    toast.success("License key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const maskedKey = licenseKey.replace(/(.{12})(.*)(.{8})/, "$1" + "*".repeat(20) + "$3");
  return (
    <Card className="shadow-sm">
      <Card.Header className="space-y-1 sm:space-y-2">
        <div className="flex items-center space-x-2">
          <LuKey className="h-4 w-4 text-black sm:h-5 sm:w-5" />
          <Card.Title className="text-lg text-black sm:text-xl">License Key Management</Card.Title>
        </div>
        <Card.Description className="text-sm">
          Your license key is required to access premium blocks and features in production.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="license-key" className="text-sm sm:text-base">
            Current License Key
          </Label>
          <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1">
              <Input
                id="license-key"
                type={showKey ? "text" : "password"}
                value={showKey ? licenseKey : maskedKey}
                readOnly
                className="pr-10 font-mono text-xs sm:text-sm"
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
              className="flex w-full items-center justify-center space-x-2 bg-transparent sm:w-auto"
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

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 sm:p-4">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 sm:h-5 sm:w-5">
              <span className="text-xs font-bold text-yellow-800">!</span>
            </div>
            <div className="text-xs sm:text-sm">
              <p className="mb-1 font-medium text-yellow-800">Keep your license key secure</p>
              <p className="text-yellow-700">
                Don&#39;t share your license key publicly. It should only be used in your
                application&#39;s environment variables.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button
                onClick={handleGenerateKey}
                className="w-full bg-black text-xs text-white hover:bg-gray-800 sm:w-auto sm:text-sm"
              >
                {isGenerating ? (
                  <>
                    <LuRefreshCw className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <LuRefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Regenerate Key</span>
                  </>
                )}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded text-xs">
              Regenerate your license key to refresh access. This will invalidate your current key.
            </Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button variant="outline" disabled className="w-full text-xs sm:w-auto sm:text-sm">
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
  );
}
