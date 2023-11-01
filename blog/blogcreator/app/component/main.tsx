
'use client'
import { Metadata } from "next"
import Image from "next/image"
import { Menu } from "./mainComponent/menu"
import { SidebarMain } from "./mainComponent/sidebar"
import { AnimationContext } from "@/provider/animationProvider"
import TaskPage from "./task"
import { useContext } from "react"
import SideApp from "./mainComponent/sideApp"
import Header from "./playgroundComponent/header"



export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
} 

export default function MusicPage() {
  const animation = useContext(AnimationContext)

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="flex flex-column items-start">
              <SidebarMain className="" />
              <SideApp></SideApp>
              <div  className={`main ${animation.sidebar ? 'open': ''} flex-grow`}>
              <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"/>
                <div className="h-full px-4 py-6 lg:px-8">
                     <TaskPage ></TaskPage>      
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}