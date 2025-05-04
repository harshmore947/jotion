"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./UserItem";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./Item";
import { toast } from "sonner";
import { DocumentsList } from "./DocumentList";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";
import TrashBox from "./TrashBox";
import { useSetting } from "@/hooks/use-setting";
import { Navbar } from "./Navbar";


export const Navigation = () => {

  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  // const documents = useQuery(api.douments.get);
  const create = useMutation(api.douments.create);
  const params = useParams();
  const router = useRouter();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollasped, setIsCollasped] = useState(isMobile);
  const search = useSearch();
  const settings = useSetting();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile])
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    // if (newWidth > 10) setIsCollasped(true);

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% -${newWidth}px)`)
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollasped(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% -240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollasped(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty('left', "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const handleCreate = () => {
    const Promise = create({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`))
    toast.promise(Promise, {
      loading: "Creating a new note...",
      success: "Note Created!",
      error: "Failed to create note"
    })
  }
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
          <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
          <Item onClick={search.onOpen} label="Search" icon={Search} isSearch />
        </div>

        <div className="mt-4">
          <DocumentsList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside >
      <div ref={navbarRef} className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && 'left-0 w-full')}>
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollasped} onResetWidth={resetWidth} />
        ) :
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollasped && <MenuIcon className="h-6 w-6 text-muted-foreground" role="button" onClick={resetWidth} />}
          </nav>}
      </div>
    </>
  );
};
