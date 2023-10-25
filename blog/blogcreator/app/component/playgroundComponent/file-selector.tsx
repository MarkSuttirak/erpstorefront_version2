import { cn } from "@/lib/utils";
import React, {useState} from "react";
import { Input } from "@/components/ui/input";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label";
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"


export default function FileSelection ({mode} : {mode : string} ) {
    const [preview, setPreview] = useState<string | null>(null);
    const postContext = useContext(PostContext);
    useEffect(() => {
      if (postContext.data?.meta_image && !preview && mode != 'new')
      {
        setPreview('https://dev.zaviago.com' + postContext.data.meta_image)
      }
    })
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        postContext.ChangeObject(undefined,'image',file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };


  
    return (
        <div className="grid gap-2" >
        <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Featured Image</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
        <Input disabled={mode == 'view' ? true : false}  type="file" accept=".svg, .png, .jpeg" onChange={handleFileChange} className={cn(
        "w-full justify-between",
        !preview && "text-muted-foreground"
        )}></Input>

        {preview && (
        <img src={preview} alt="Preview" />
        )}
        </div>
    )
}