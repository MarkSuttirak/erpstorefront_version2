"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserType} from "@/typing"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"


export function WriterSelector({mode} : {mode : string} ) {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<UserType>()
  const postContext = useContext(PostContext);
  var {data ,isLoading} = useFrappeGetDocList<UserType>('Blogger',{fields : [
  'name',
  'full_name'
   ]} )
   useEffect(() => {
    if(postContext.data?.blogger && !selectedModel && mode != 'new' )
    {
      let newdata = data?.filter((item) => item.name === postContext.data?.blogger)
      if(newdata)
      {
        setSelectedModel(newdata[0])
      }
    }
    if(selectedModel  )
    {
      postContext.ChangeObject(undefined,'writer',selectedModel?.name)
    }
  },[selectedModel])
  //use commandGroup tu categorise category in group
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Writter</Label>
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
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button
            disabled={mode == 'view' ? true : false} 
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.full_name : "Select a blogger..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No users found.</CommandEmpty>
                <HoverCardTrigger />
                {data?.map((type) => (
                  <ModelItem
                    key={type.full_name}
                    model={type}
                    isSelected={selectedModel?.full_name === type.full_name}
                    onSelect={() => {
                      setSelectedModel(type)
                      setOpen(false)
                    }}
                  />
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  model: UserType
  isSelected: boolean
  onSelect: () => void
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <CommandItem
      key={model.full_name}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.full_name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}