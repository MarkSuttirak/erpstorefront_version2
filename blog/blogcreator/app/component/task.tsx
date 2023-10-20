'use client'
import { Metadata } from "next"
import Image from "next/image"

import { columnsTask, columnsCategory } from "./taskComponent/columns"
import {DataTable} from "./taskComponent/data-table"
import { UserNav } from "./taskComponent/user-nav"
import { DataDocList } from "@/typing"
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



export default function TaskPage() {
  const tabType = useContext(TabContext);
  var doctype = 'Blog Post';
  type field = keyof DataDocList
  var fields : field[] = ['name', 'title', 'blog_category' , 'content_type', 'published']
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
  }
  let {data , isLoading, mutate, error} = useFrappeGetDocList<DataDocList>(doctype,{ fields: fields });
  let tasks : any = [];
  if (data) {
    if (tabType.variable == 'Categories')
    {
      tasks = data.reduce((acc: CategoryTab [], item) => {
        acc.push({ 
          id: item.name,
          title: item.title,
          status: item.published == 1 ? "Published" : "Drafted",
        });
        return acc;
      }, []);
    }else{
      tasks = data.reduce((acc: Task [], item) => {
        acc.push({ 
          id: item.name,
          title: item.title,
          status: item.published == 1 ? "Published" : "Drafted",
          contentType: item.content_type,
        });
        return acc;
      }, []);
    }
  }
  const router = useRouter()
  const {toast} = useToast()

  useEffect(() => {
    if (error) {
      toast({title:'Eroor : error while fetching the blogs'})
    }
  },[error])
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
            <UserNav />
          </div>
        </div>
        {isLoading ? <TabSkeleton/>: ( tabType.variable == 'Categories' ? <DataTable data={tasks} columns={columnsCategory} currentTab={tabType.variable}/> : <DataTable data={tasks} columns={columnsTask} currentTab={tabType.variable}/> )}
        <div className="flex items-center space-x-2" >
        <Button onClick={() => {router.push(`/pages/new${tabType.variable}`)}}>Add</Button>
        </div>
      </div>
    </>
  )
}