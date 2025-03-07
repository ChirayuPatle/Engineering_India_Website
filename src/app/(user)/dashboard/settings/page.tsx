"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const router = useRouter();
  //   const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock settings
  const [settings, setSettings] = useState({
    notifications: {
      emailUpdates: true,
      eventReminders: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: "members", // public, members, private
      showEmail: false,
    },
    appearance: {
      theme: "light", // light, dark, system
      fontSize: "medium", // small, medium, large
    },
  });

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      //   toast({
      //     title: "Settings saved",
      //     description: "Your settings have been saved successfully.",
      //   });
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account information and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@university.edu"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="I'm a junior studying CS with interests in AI and web development. Active member of the tech club and gaming society."
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-1">
                <div className="space-y-0.5">
                  <Label htmlFor="email-updates">Email Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly updates about club activities
                  </p>
                </div>
                <Switch
                  id="email-updates"
                  checked={settings.notifications.emailUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        emailUpdates: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between space-y-1">
                <div className="space-y-0.5">
                  <Label htmlFor="event-reminders">Event Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about upcoming events
                  </p>
                </div>
                <Switch
                  id="event-reminders"
                  checked={settings.notifications.eventReminders}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        eventReminders: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between space-y-1">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails from partners
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={settings.notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        marketingEmails: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your profile and information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="public"
                        name="visibility"
                        value="public"
                        checked={
                          settings.privacy.profileVisibility === "public"
                        }
                        onChange={() =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              profileVisibility: "public",
                            },
                          })
                        }
                      />
                      <Label htmlFor="public" className="font-normal">
                        Public (Anyone can view)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="members"
                        name="visibility"
                        value="members"
                        checked={
                          settings.privacy.profileVisibility === "members"
                        }
                        onChange={() =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              profileVisibility: "members",
                            },
                          })
                        }
                      />
                      <Label htmlFor="members" className="font-normal">
                        Members Only (Only club members can view)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="private"
                        name="visibility"
                        value="private"
                        checked={
                          settings.privacy.profileVisibility === "private"
                        }
                        onChange={() =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              profileVisibility: "private",
                            },
                          })
                        }
                      />
                      <Label htmlFor="private" className="font-normal">
                        Private (Only you can view)
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between space-y-1">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-email">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow other members to see your email address
                    </p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={settings.privacy.showEmail}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: {
                          ...settings.privacy,
                          showEmail: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="light"
                      name="theme"
                      value="light"
                      checked={settings.appearance.theme === "light"}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "light",
                          },
                        })
                      }
                    />
                    <Label htmlFor="light" className="font-normal">
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="dark"
                      name="theme"
                      value="dark"
                      checked={settings.appearance.theme === "dark"}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "dark",
                          },
                        })
                      }
                    />
                    <Label htmlFor="dark" className="font-normal">
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="system"
                      name="theme"
                      value="system"
                      checked={settings.appearance.theme === "system"}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "system",
                          },
                        })
                      }
                    />
                    <Label htmlFor="system" className="font-normal">
                      System (Match your device)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
