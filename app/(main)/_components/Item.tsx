"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    id?: Id<"douments">,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    onExpand?: () => void,
    label: string,
    onClick?: () => void,
    icon: LucideIcon;
}

export const Item = ({ label, onClick, icon: Icon, active, documentIcon, isSearch, level = 0, onExpand, expanded, id }: ItemProps) => {
    const create = useMutation(api.douments.create);
    const archive = useMutation(api.douments.archive);
    const { user } = useUser();
    const router = useRouter();

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archive({ id }).then(() => router.push('/documents'))
        toast.promise(promise, {
            error: "note archiving failed",
            success: "note archived!",
            loading: "Archiving the note..."
        })
    }
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untiled", parentDocument: id }).then(() => {
            if (!expanded) {
                onExpand?.();
            }
        });
        toast.promise(promise, {
            error: "note creation failed",
            success: "note created!",
            loading: "Creating the note..."
        })
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div onClick={onClick} role="button" style={{ padding: level ? `${(level * 12) + 12}px` : "12px" }} className={cn("cursor-pointer group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", active && "bg-primary/5 text-primary")}>
            {!!id && (
                <div className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1" role="button" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (

                <Icon className="shrink -0 h-[18px] mr-2 text-muted-foreground" />
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span>
                        ctrl
                    </span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2" >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => { e.stopPropagation() }}>
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="right" forceMount className="w-60">
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground px-2 py-1">
                                Last Edited by: {user?.firstName} {user?.lastName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 " role="button" onClick={onCreate}>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )
            }
        </div >
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div style={{
            paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
        }} className="flex gap-2 py-[3px]">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}