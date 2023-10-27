'use client'
import { Metadata } from "next"
import Image from "next/image"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { PresetSave } from "./playgroundComponent/preset-save"
import EditBlog from "./playgroundComponent/editblog"
import NewBlog from "./playgroundComponent/newBlog"
import Blog from "./playgroundComponent/Blog"
import  {useRouter}  from "next/navigation"
import { PostContext } from "@/provider/postProvider"
import { useContext, useState } from "react"
import { UpdateObject, contextType } from "@/typing"
import Page from "./playgroundComponent/page"
import EditPage from "./playgroundComponent/editPage"
import NewPage from "./playgroundComponent/newPage"
import { TabContextType } from "@/typing"
import EditBlogger from "./playgroundComponent/editBlogger"
import Blogger from "./playgroundComponent/blogger"
import NewBlogger from "./playgroundComponent/newBlogger"
import SystemPage from "./playgroundComponent/systemPage"
import NewSystemPage from "./playgroundComponent/newSystemPage"
import EditSystemPage from "./playgroundComponent/editSystemPage"
import { BloggerContext } from "@/provider/BloggerProvider"
import { PageContext } from "@/provider/pageProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"
import SideBarRight from "./playgroundComponent/sidebareright"
import Header from "./playgroundComponent/header"
import Sidebar from "./playgroundComponent/sidebar"
import MainSideBar from "./playgroundComponent/mainsidebar"
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { TabContext } from "@/provider/tabProvider"
import { Button } from "@/components/ui/button"
import { ArrowRightToLine } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage({state, page} : {state : string, page : TabContextType }) {

  const router = useRouter()
  const tab = useContext(TabContext)
  const postContext = useContext(PostContext)
  const bloggerContext = useContext(BloggerContext)
  const pageContext = useContext(PageContext)
  const systemPageContext = useContext(SystemPageContext)
  const [animation , SetAnimation] = useState(false)

  const handleClick = () => {
    switch(page)
    {
      case 'Blogger' :
        bloggerContext.changeSubmit(2)
        break;
      case 'Page' :
        pageContext.changeSubmit(2)
        break;
      case 'Post' :
        postContext.ChangeObject({} as UpdateObject) 
       break;
      case 'SystemPage':
        systemPageContext.changeSubmit({} as UpdateObject)
        break;
    }
    router.push('/pages/blog')
  }
  return (
    <>
      <div className="md:hidden w-screen h-screen">
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
      <div className="hidden w-screen h-screen flex-row md:flex">

        <Sidebar className="flex flex-col w-[266px] h-screen pt-[6px]  pb-[16px]  items-start gap-[16px] self-stretch border-r border-solid border-gray-200 bg-white"></Sidebar>
        <MainSideBar></MainSideBar>
        <div className="flex flex-col pb-0 items-center flex-1 self-stretch h-screen w-full">
          <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"></Header>
          <div className="flex px-[32px] py-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7] ">
            <div className="flex items-center gap-[5px]">
              {animation ? 
              (
              <>
                <ChevronLeft className="w-4 h-4 stroke-1"/>
                <span>{tab.variable}</span>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Name</span>
                <span>Last Updated : time</span>
                <Button variant={'outline'}><MessageSquare></MessageSquare>Comment</Button>
                <Button className="px-[16px] py-[8px]" variant={'secondary'} onClick={() => SetAnimation(!animation)} ><ArrowRightToLine className="w-4 h-4 stroke-1"></ArrowRightToLine> Info</Button>
              </>
             
               ) : (
                <>
                <ChevronRight className="w-4 h-4 stroke-1"/>
                <span>{tab.variable}</span>
                <Button className="px-[16px] py-[8px]" variant={'secondary'} onClick={() => SetAnimation(!animation)} ><ArrowRightToLine className="w-4 h-4 stroke-1"></ArrowRightToLine> Info</Button>
              </>
               )}
              
            </div>
            <div className="">
              {state != 'view' ? <PresetSave page={page} /> : null}
            </div>
          </div>
          <Tabs defaultValue="complete" className="">
            <div className="">
              <div className="">
                <div className="">
                  <SideBarRight state={state}/>
                </div>
                <div className="">
                  <div className="">
                      {(() => {
                        switch(page)
                        {
                        case 'Page' :
                          switch (state) {
                            case 'edit':
                              return <EditPage />;
                            case 'new':
                              return <NewPage />;
                            case 'view':
                              return <Page/>;
                            default:
                              return null;
                          }
                        case 'Post' :
                          switch (state) {
                            case 'edit':
                              return <EditBlog />;
                            case 'new':
                              return <NewBlog />;
                            case 'view':
                              return <Blog/>;
                            default:
                              return null;
                          }
                        case 'Blogger':
                          switch (state) {
                            case 'edit':
                              return <EditBlogger />;
                            case 'new':
                              return <NewBlogger />;
                            case 'view':
                              return <Blogger/>;
                            default:
                              return null;
                          }
                        case 'SystemPage':
                          switch (state) {
                            case 'edit':
                              return <EditSystemPage/>;
                            case 'new':
                              return <NewSystemPage />;
                            case 'view':
                              return <SystemPage/>;
                            default:
                              return null;
                          }
                        }
                      })()}
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  )
}