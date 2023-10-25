
import { Metadata } from "next"
import Image from "next/image"
import { Menu } from "./mainComponent/menu"
import { Sidebar } from "./mainComponent/sidebar"
import { playlists } from "./mainData/playlists"
import TaskPage from "./task"



export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
} 

export default function MusicPage() {
  

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
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div  className="col-span-3 lg:col-span-4 lg:border-l">
              <Menu />
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