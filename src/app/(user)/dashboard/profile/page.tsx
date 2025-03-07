"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    phone: "(555) 123-4567",
    major: "Computer Science",
    graduationYear: "2025",
    bio: "I'm a junior studying CS with interests in AI and web development. Active member of the tech club and gaming society.",
    address: "123 Campus Drive, University Housing",
    interests: ["Programming", "AI", "Web Development", "Gaming"],
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // });
    alert("Your profile has been successfully updated.");
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
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback className="text-4xl">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-semibold">{userData.name}</h3>
            <p className="text-sm text-muted-foreground">
              {userData.major} (Class of {userData.graduationYear})
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{userData.address}</span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 w-full">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile information here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={userData.bio}
                      onChange={(e) =>
                        setUserData({ ...userData, bio: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveProfile}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="md:col-span-5">
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{userData.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interests">
              <Card>
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                  <CardDescription>
                    Activities and topics you're interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest) => (
                      <div
                        key={interest}
                        className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium"
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Major</h3>
                      <p className="text-sm text-muted-foreground">
                        {userData.major}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Graduation Year</h3>
                      <p className="text-sm text-muted-foreground">
                        {userData.graduationYear}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
