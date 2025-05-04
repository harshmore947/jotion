"use-client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
// import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.douments.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "notion_clone");

    try {
      console.log("Starting upload to Cloudinary...");
      console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed with response:", errorData);
        throw new Error(
          `Upload failed: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsSubmitting(true);
      console.log("Selected file:", file.name, file.type, file.size);

      const imageUrl = await uploadToCloudinary(file);
      console.log("Received image URL:", imageUrl);

      await update({
        id: params.documentId as Id<"douments">,
        coverImage: imageUrl,
      });

      coverImage.onClose();
    } catch (error) {
      console.error("Error in handleUpload:", error);
      // You might want to show an error toast or message to the user here
    } finally {
      setIsSubmitting(false);
      setFile(undefined);
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted transition"
            onClick={() => document.getElementById("upload")?.click()}
          >
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFile(file);
              }}
            />
            {file ? (
              <div className="relative aspect-video">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(undefined);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={coverImage.onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file || isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
