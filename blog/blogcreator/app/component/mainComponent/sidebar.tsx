'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TabContext } from "@/provider/tabProvider"
import { useContext } from "react"
import  PostIcon  from "@/public/PostIcon"
import DashIcon from "@/public/dashIcon"
import ProfilIcon from "@/public/profilIcon"
import MiniPageIcon from "@/public/miniPageIcon"


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Sidebar({ className}: SidebarProps) {
  const tab = useContext(TabContext)
  return (
    <> 
     <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">

        <div className="flex py-2 px-3 flex-col items-start space-y-2 self-stretch">

          <div className="flex px-4 justify-center items-center">          
            <h2 className="text-base font-semibold text-gray-500 font-inter leading-7 tracking-tighter">
              Blogs
            </h2>
          </div>

          <div className="flex flex-col items-start space-y-0.5 self-stretch">
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Post')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <PostIcon></PostIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Post</h2>
              </Button>
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Categories')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <DashIcon></DashIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Categories</h2>   
              </Button>
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Blogger')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <ProfilIcon></ProfilIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Blogger</h2>   
              </Button>
          </div>
        </div>

        <div className="flex py-2 px-3 flex-col items-start space-y-2 self-stretch">

        <div className="flex px-4 justify-center items-center">        
          <h2 className="text-base font-semibold text-gray-500 font-inter leading-7 tracking-tighter">
            Pages
          </h2>
        </div>

          <div className="flex flex-col items-start space-y-0.5 self-stretch">
            <Button variant="ghost"  onClick={() => {tab.ChangeVariable('Page')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
              <MiniPageIcon></MiniPageIcon>
              <h2 className="text-gray-900 font-inter text-sm leading-5"> Pages </h2>
            </Button>
            <Button variant="ghost"  onClick={() => {tab.ChangeVariable('SystemPage')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
              <DashIcon></DashIcon>
              <h2 className="text-gray-900 font-inter text-sm leading-5"> System Pages </h2>
            </Button> 
          </div>

        </div>
      </div>
    </div>
     </>
   
  )
}