"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile, updateUserProfile } from "@/lib/profile";
import { FC, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuRefreshCw, LuUser } from "react-icons/lu";
import { toast } from "sonner";

export type ProfileManagementProps = {
  profile: UserProfile;
};

type ProfileFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export const ProfileManagement: FC<ProfileManagementProps> = ({ profile }) => {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      image: profile.image || "",
    },
  });

  const formValues = watch();
  const fullName = `${formValues.firstName} ${formValues.lastName}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check a file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or GIF image.");
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setValue("image", base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    setIsUpdatingProfile(true);
    try {
      // Call the API to update the profile
      await updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <Card className="mt-6 shadow-sm">
      <Card.Header>
        <div className="flex items-center space-x-2">
          <LuUser className="h-5 w-5 text-black" />
          <Card.Title className="text-xl text-black">Profile Settings</Card.Title>
        </div>
        <Card.Description>
          Update your personal information and account preferences.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <Avatar.Image src={formValues.image || "/placeholder.svg"} alt={fullName} />
              <Avatar.Fallback className="bg-black text-lg text-white">
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-transparent"
                onClick={handleAvatarClick}
              >
                Change Avatar
              </Button>
              <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className={"block"} htmlFor="profile-first-name">
                First Name
              </Label>
              <Input
                id="profile-first-name"
                {...register("firstName", { required: "First name is required" })}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className={"block"} htmlFor="profile-last-name">
                Last Name
              </Label>
              <Input
                id="profile-last-name"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter your last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <Label className={"block"} htmlFor="profile-email">
              Email Address
            </Label>
            <Input
              id="profile-email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={isUpdatingProfile}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isUpdatingProfile ? (
                <>
                  <LuRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-transparent"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
};
