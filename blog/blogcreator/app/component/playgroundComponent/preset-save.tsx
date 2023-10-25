import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"
import { PageContext } from "@/provider/pageProvider"
import { TabContextType } from "@/typing"
import { BloggerContext } from "@/provider/BloggerProvider"

export function PresetSave( {page } : { page  : TabContextType}) {
  const postContext = useContext(PostContext);
  const pageContext = useContext(PageContext);
  const blogContext = useContext(BloggerContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Save preset</DialogTitle>
          <DialogDescription>
            This will save the current playground state as a preset which you
            can access later or share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
      {(() => {
        switch(page)
      {
        case 'Post':
          return <><Button type="submit" onClick={()=> postContext.ChangeObject(undefined,'submited',1)}>Publish</Button></>
        case 'Page':
          return <><Button type="submit" onClick={()=> pageContext.changeSubmit(1)}>Publish</Button></>
        case 'Blogger':
          return <Button type="submit" onClick={()=> blogContext.changeSubmit(1)}>Publish</Button>
        default :
          return <Button type="submit" onClick={()=> postContext.ChangeObject(undefined,'submited',1)}>Publish</Button>
      }})()}
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Save preset</DialogTitle>
          <DialogDescription>
            This will save the current playground state as a preset which you
            can access later or share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}