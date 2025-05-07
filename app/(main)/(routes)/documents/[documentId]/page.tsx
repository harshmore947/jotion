"use client";

import React from "react"; // Make sure to import React
import ToolBar from "@/app/(main)/_components/ToolBar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Cover } from "@/components/cover";
import { Editor } from "@/components/editor";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentId = ({ params }: DocumentIdPageProps) => {
  // Unwrap the params Promise
  const unwrappedParams = React.useMemo(() => params, [params]);

  const document = useQuery(api.douments.getById, {
    documentId: unwrappedParams.documentId as Id<"douments">,
  });

  const update = useMutation(api.douments.update)
  const onChange = (content: string) => {
    update({
      id: params.documentId as Id<"douments">,
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

export default DocumentId;
