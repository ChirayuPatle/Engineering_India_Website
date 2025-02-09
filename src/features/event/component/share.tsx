"use client";

import { motion } from "framer-motion";
import { Copy, Facebook, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

interface ShareProps {
  url: string;
  title: string;
}

export function Share({ url, title }: ShareProps) {
  const shareData = {
    title: title,
    text: "Check out this event!",
    url: url,
  };

  const handleCopy = async () => {
    const { toast } = useToast();
    await navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const handleShare = async (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareData.text
      )}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className="w-10 h-10"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        className="w-10 h-10"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        className="w-10 h-10"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("linkedin")}
        className="w-10 h-10"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
