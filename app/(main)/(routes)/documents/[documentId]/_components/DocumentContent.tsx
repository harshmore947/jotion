"use client";

import React from "react";
import ToolBar from "@/app/(main)/_components/ToolBar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Cover } from "@/components/cover";
import { Editor } from "@/components/editor";

interface DocumentContentProps {
  documentId: Id<"douments">;
}

export const DocumentContent = ({ documentId }: DocumentContentProps) => {
  const document = useQuery(api.douments.getById, {
    documentId,
  });

  const update = useMutation(api.douments.update)
  const onChange = (content: string) => {
    update({
      id: documentId,
      content
    })
  }

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-20">
      <Cover url={document.coverImage} id={document._id} />
      <div className="h-[5vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}; 