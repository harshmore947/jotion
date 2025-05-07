"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const document = useQuery(api.douments.getTrash);
  const restore = useMutation(api.douments.restore);
  const remove = useMutation(api.douments.remove);

  const [search, setSearch] = useState("");

  const filterdDocuments = document?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  })

  const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"douments">) => {
    event.stopPropagation();
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      success: "Note restored successfully",
    })
  }
  const onRemove = (documentId: Id<'douments'>) => {
    try {
      const promise = remove({ id: documentId });
      toast.promise(promise, {
        success: "Note deleted successfully",
        error: "Error in deleting Note",
        loading: "Deleting Note"
      })
    }
    finally {
      router.push(`/documents`);
    }
  }
  if (document === undefined) {
    return (
      <div className="h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <div className="text-sm flex flex-col gap-y-1">
      <div className="flex item-center justify-center gap-1 p-4">
        <Search className="h-4 w-4 mt-2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>

      <div className="mt-2 px-1 pb-2">
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No Documents Found
        </p>
        {filterdDocuments?.map((document) => (
          <div key={document._id} role='button' onClick={() => { }} id={document._id} className="text-sm rounded-lg w-full hover:bg-primary/5 flex items-center text-primary justify-between">
            <span className="truncate pl-2">
              {document.title}
            </span>
            <div className="flex items-center">
              <div role="button" className="roundeds-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600" onClick={(e) => onRestore(e, document._id)}>
                <Undo className="w-4 h-4 text-muted-foreground " />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div role="button" className="roundeds-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashBox;