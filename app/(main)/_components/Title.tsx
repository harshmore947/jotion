"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  data: Doc<"douments">;
}

export const Title = ({ data }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.douments.update);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(data.title || "Untitled");

  const enableInput = () => {
    setTitle(data.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false);
  }

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
    update({
      id: data._id,
      title: event.target.value || "Untitled"
    });
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  }
  return (
    <div className="flex items-center gap-x-1">
      {!!data?.icon && <p>{data?.icon}</p>}
      {isEditing ? (
        <Input value={title} onBlur={disableInput} onChange={onChange} onKeyDown={onKeyDown} ref={inputRef} onClick={enableInput} className="h-7 px-2 focus-visible:ring-transparent" />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{data?.title}</span>
        </Button>
      )}
    </div>
  );
};


Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="h-3 w-20 rounded-md" />
  )
}