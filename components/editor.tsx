"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme();

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

  const handleUpload = async (file: File) => {
    if (!file) return
    const imageUrl = await uploadToCloudinary(file);
    return imageUrl;
  }

  const editor: BlockNoteEditor = useCreateBlockNote({

    animations: true,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload,
    // editable: editable
  });

  // Use effect to watch changes and call onChange
  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      const serializedContent = JSON.stringify(editor.document);
      onChange(serializedContent);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [editor, onChange]);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}
