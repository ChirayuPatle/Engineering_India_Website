"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Dollar Singh");
  const [email, setEmail] = useState("dollar.singh@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [timezone, setTimezone] = useState("Pacific Time (UTC-8)");
  const [avatar, setAvatar] = useState("/default-avatar.png");

  // Example save handler
  function handleSave() {
    // your save logic here
    console.log("Account settings saved!");
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* ACCOUNT TAB */}
        <TabsContent value="account">
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Current Avatar */}
            <div className="col-span-1">
              <Label className="mb-2 block text-sm font-medium">
                Current Avatar
              </Label>
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatar} alt="Avatar" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>

              {/* You could add radio buttons or a grid of avatars here */}
              <div className="mt-4 text-sm">Choose a new avatar</div>
              <div className="mt-2 flex space-x-2">
                {/* Example: multiple avatars */}
                <button onClick={() => setAvatar("/avatars/avatar1.png")}>
                  <img
                    src="/avatars/avatar1.png"
                    alt="avatar1"
                    className="h-10 w-10 rounded-full border"
                  />
                </button>
                <button onClick={() => setAvatar("/avatars/avatar2.png")}>
                  <img
                    src="/avatars/avatar2.png"
                    alt="avatar2"
                    className="h-10 w-10 rounded-full border"
                  />
                </button>
                {/* ... add more as desired */}
              </div>

              {/* Upload a custom avatar */}
              <div className="mt-4">
                <Label className="block text-sm font-medium">
                  Or upload a custom avatar
                </Label>
                <Input
                  type="file"
                  className="mt-2"
                  // handle file upload logic
                />
              </div>
            </div>

            {/* Profile Fields */}
            <div className="col-span-2 space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="timezone"
                  className="mb-2 block text-sm font-medium"
                >
                  Timezone
                </Label>
                <Input
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </div>

              <Button variant="default" onClick={handleSave}>
                Save Account Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* SECURITY TAB */}
        <TabsContent value="security">
          <p className="mt-4">Security settings go here...</p>
        </TabsContent>

        {/* PREFERENCES TAB */}
        <TabsContent value="preferences">
          <p className="mt-4">Preferences settings go here...</p>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications">
          <p className="mt-4">Notifications settings go here...</p>
        </TabsContent>

        {/* PRIVACY TAB */}
        <TabsContent value="privacy">
          <p className="mt-4">Privacy settings go here...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
