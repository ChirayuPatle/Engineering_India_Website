"use client";

import { motion } from "framer-motion";
import { Edit, Share2, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "./types";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <motion.div
      className="p-4 border rounded-lg bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.college}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Profile Completion</span>
          <span>{user.completionPercentage}%</span>
        </div>
        <Progress value={user.completionPercentage} className="h-2" />
      </div>

      <div className="mt-4 flex gap-2">
        {user.socialLinks?.github && (
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        )}
        {user.socialLinks?.linkedin && (
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
        )}
        {user.socialLinks?.twitter && (
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
