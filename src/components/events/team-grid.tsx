import { Card } from "@/components/ui/card";
import Image from "next/image";

const team = [
  {
    name: "Zach Meltzer",
    role: "Galxe",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20212321-v7pUsR46akBm6tPCWEk7TOY2XR1Lhy.png",
  },
  {
    name: "Kristofer Lund",
    role: "Internet Computer",
    avatar: "/placeholder.svg",
  },
  {
    name: "Martina Beg",
    role: "Galxe",
    avatar: "/placeholder.svg",
  },
  {
    name: "Jackson Chen",
    role: "Galxe",
    avatar: "/placeholder.svg",
  },
];

export function TeamGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member) => (
        <Card key={member.name} className="p-4">
          <div className="text-center">
            <div className="mb-3 inline-block overflow-hidden rounded-full">
              <Image
                src={member.avatar || "/placeholder.svg"}
                alt={member.name}
                width={80}
                height={80}
                className="h-20 w-20 object-cover"
              />
            </div>
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
