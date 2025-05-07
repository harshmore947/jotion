"use client"

import { useEffect, useState } from "react"
import { File } from "lucide-react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList, } from "./ui/command"
import { useSearch } from "@/hooks/use-search"
import { api } from "@/convex/_generated/api"
import { CommandGroup } from "cmdk"

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.douments.getSearch);
  const [isMounted, setIsMounted] = useState(false)

  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)

  const onSelect = (id: string) => {
    router.push(`/document/${id}`);
    onClose();
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName || "your"}'s Jotion`} />
      <CommandList>
        <CommandEmpty>No Results Found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title || "Untitled"}`}
              title={document.title || "Untitled"}
              onSelect={() => onSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <div className="mr-2">
                  <File className="h-4 w-4" />
                </div>
              )}
              <span>{document.title || "Untitled"}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}