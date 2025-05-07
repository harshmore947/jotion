"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"

interface MenuProps {
  documentId: Id<'douments'>
}

export const Menu = ({ documentId }: MenuProps) => {
  const { user } = useUser();

  const archive = useMutation(api.douments.archive);
  const onArchive = () => {
    const promise = archive({ id: documentId })
    toast.promise(promise, {
      loading: "Archiving Note...",
      success: "Note Archived Successfully",
      error: "Error Archiving Note..."
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-4 w-4 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <MoreHorizontal className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="text-sm text-muted-foreground p-2">
            Last Edited by: {user?.fullName}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-10 w-10" />
  )
}