"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

interface CoverImageProps {
    url?: string;
    preview?: boolean
    id: Id<"douments">
}

export const Cover = ({
    url,
    preview,
    id
}: CoverImageProps) => {
    const coverImage = useCoverImage();
    const update = useMutation(api.douments.update);

    const removeCoverImage = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            await update({
                id: id,
                coverImage: undefined
            });

            toast.success("Cover image removed");
        } catch (error) {
            console.error("Error removing cover image:", error);
            toast.error("Failed to remove cover image");
        }
    }

    return (
        <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && 'bg-muted')}>
            {!!url && (
                <Image priority src={url} fill alt="cover" className="object-cover" />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button onClick={coverImage.onOpen} className="text-muted-foreground text-xs " size="sm" variant="outline">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button onClick={(e) => removeCoverImage(e)} className="text-muted-foreground text-xs " size="sm" variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}