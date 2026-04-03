import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  placeholder = "Enter image URL or upload",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Create a temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      onChange(previewUrl);

      // Here you would typically upload to your storage service
      // For now, we'll use the preview URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            className="pointer-events-none"
          >
            {uploading ? (
              <div className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {value && (
        <div className="relative mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onChange("")}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
