"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"

export function DatePicker({mode} : {mode : string} ) {
  const [date, setDate] = React.useState<Date>()
  const postContext = useContext(PostContext);
  useEffect(() => {
    if(date)
    {
      let newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
      postContext.ChangeObject(undefined,'publish_date',newDate)
    }
  },[date])

  return (
    <div className="grid gap-2">
        <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Publish Date</Label>
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={mode == 'view' ? true : false}
          variant={"outline"}
          className={cn(
            "w-full justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}
