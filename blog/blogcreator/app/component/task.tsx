'use client'
import { Metadata } from "next"
import Image from "next/image"

import { columnsTask, columnsCategory, columnsBlogger } from "./taskComponent/columns"
import {DataTable} from "./taskComponent/data-table"
import { Blogger, BloggerTask, GetData } from "@/typing"
import { Task , CategoryTab } from "@/typing"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"
import {useFrappeGetDocList} from 'frappe-react-sdk'
import { useEffect } from "react"
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}
import { useToast } from "@/components/ui/use-toast"
import TabSkeleton from "../skeletonComponent/tabSkeleton"
import { useContext } from "react"
import { TabContext } from "@/provider/tabProvider"
import { PlusCircle } from "lucide-react"
import DeleteModal from "./taskComponent/deleteModal"



export default function TaskPage() {
  const tabType = useContext(TabContext);
  var doctype = 'Blog Post';
  type field = keyof GetData
  var fields : field[] = []
  switch(tabType.variable)
  {
    case 'Categories':
      doctype = 'Blog Category'
      fields = ['name', 'title', 'published']
      break;
    case 'Post':
      doctype = 'Blog Post'
      fields = ['name', 'title', 'blog_category', 'content_type', 'published']
      break;
    case 'Page':
    doctype = 'BlogPage'
    fields = ['name', 'title', 'content_type']
    break;
    case 'Blogger':
    doctype = 'Blogger'
    fields = ['name', 'full_name', 'avatar', 'bio', 'disabled', 'short_name']
    break;
    case 'SystemPage':
    doctype = 'SystemPage'
    fields = ['name', 'content_json', 'content_type', 'published', 'meta_image', 'title']


  }
  let {data , isLoading, mutate, error} = useFrappeGetDocList<GetData>(doctype,{ fields: fields });
  let tasks : any = [];
  if (data) {
    switch(tabType.variable) {
      case 'Categories':
        tasks = data.reduce((acc: CategoryTab [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
          });
          return acc;
        }, []);
        break;
      case 'Post':
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            contentType: item.content_type,
          });
          return acc;
        }, []);
        break;
      case 'Blogger':
        tasks = data.reduce((acc: BloggerTask [], item) => {
          acc.push({ 
            id: item.name,
            name: item.full_name,
            avatar : item.avatar,
            status: !item.disabled,
          });
          return acc;
        }, []);
        break;
      case 'SystemPage':
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            contentType: item.content_type,
          });
          return acc;
        }, []);
        break;
      default:
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: "Published",   
            contentType: item.content_type,
          });
          return acc;
        }, []);
        break;
    }
  }
  const router = useRouter()
  const {toast} = useToast()

  useEffect(() => {
    mutate()
    if (error) {
      toast({title:'Eroor : error while fetching the blogs'})
    }
  },[error, tabType.mutate])
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Blog {tabType.variable}</h2>
          </div>
          <div className="flex items-center space-x-2">
          </div>
          <div className="flex flex-row gap-2">
          {tabType.delete && <DeleteModal className="w-[160px] h-[40px]"></DeleteModal>}
          <Button className="h-[40px] w-[160px]" onClick={() => {router.push(`/pages/new${tabType.variable}`)}}><PlusCircle className="w-[16px] h-[16px]" ></PlusCircle > <span className="pl-2" >New post</span></Button>
          </div>
        </div>
        {isLoading ? <TabSkeleton/> : (() => {
          switch(tabType.variable)
          {
            case "Categories":
              return <DataTable data={tasks} columns={columnsCategory} currentTab={tabType.variable}/>
              break;
            case "Blogger":
              return <DataTable data={tasks} columns={columnsBlogger} currentTab={tabType.variable}/>
              break;
            default :
               return <DataTable data={tasks} columns={columnsTask} currentTab={tabType.variable}/>
              break;
          }
        })()
        }
      </div>
    </>
  )
}