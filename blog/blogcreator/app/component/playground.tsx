'use client'
import { Metadata } from "next"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Suspense, useState } from "react"
import { ModelSelector } from "./playgroundComponent/model-selector"
import { PresetActions } from "./playgroundComponent/preset-actions"
import { PresetSave } from "./playgroundComponent/preset-save"
import { PresetSelector } from "./playgroundComponent/preset-selector"
import { DatePicker } from "./playgroundComponent/publishdate-selector"
import { presets } from "./playgroundData/presets"
import EditBlog from "./playgroundComponent/editblog"
import NewBlog from "./playgroundComponent/newBlog"
import Blog from "./playgroundComponent/Blog"
import  {useRouter}  from "next/navigation"
import FileSelection from "./playgroundComponent/file-selector"
import { WriterSelector } from "./playgroundComponent/writer-select"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage({state } : {state : string}) {

  const router = useRouter()


  
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <button onClick={() => {router.push('/pages/blog')}}><h2 className="text-lg font-semibold">Home</h2></button>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            {state == 'view' ? <PresetSave /> : null}
            <div className="hidden space-x-2 md:flex">
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <ModelSelector mode={state} />
                <DatePicker mode={state}></DatePicker>
                <FileSelection mode={state}></FileSelection>
                <WriterSelector mode={state}></WriterSelector>
              </div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                    {(() => {
                      switch (state) {
                        case 'edit':
                          return <EditBlog/>;
                        case 'new':
                          return <NewBlog />;
                        case 'view':
                          return <Blog />;
                        default:
                          return null;
                      }
                    })()}
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}