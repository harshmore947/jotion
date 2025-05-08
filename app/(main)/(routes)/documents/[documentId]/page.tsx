import { Id } from "@/convex/_generated/dataModel";
import { DocumentContent } from "./_components/DocumentContent";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentId = ({ params }: DocumentIdPageProps) => {
  return <DocumentContent documentId={params.documentId as Id<"douments">} />;
};

export default DocumentId;
