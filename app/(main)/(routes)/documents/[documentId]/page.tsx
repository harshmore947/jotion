import { Id } from "@/convex/_generated/dataModel";
import { DocumentContent } from "./_components/DocumentContent";

interface PageProps {
  params: {
    documentId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DocumentId = ({ params }: PageProps) => {
  return <DocumentContent documentId={params.documentId as Id<"douments">} />;
};

export default DocumentId;
