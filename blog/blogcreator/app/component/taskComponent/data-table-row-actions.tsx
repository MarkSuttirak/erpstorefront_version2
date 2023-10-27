import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { TabContext} from "@/provider/tabProvider"
import { PostContext } from "@/provider/postProvider"
import { TypeContext } from "@/provider/typeProvider"
import { PageContext } from "@/provider/pageProvider"
import { BloggerContext } from "@/provider/BloggerProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"
import DeleteModal from "./deleteModal"
import { Table } from "@tanstack/react-table"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  table: Table<TData>
}


export function DataTableRowActions<TData>({
  row,
  table
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const [value, setValue] = useState(false)
  const tabProvider = useContext(TabContext)
  const postContext = useContext(PostContext)
  const typeContext = useContext(TypeContext)
  const pageContext = useContext(PageContext)
  const blogContext = useContext(BloggerContext)
  const systemPageContext = useContext(SystemPageContext);

  useEffect(() => {
    let value = table.getIsSomePageRowsSelected()
    tabProvider.setDelete(value)
    let value2 = table.getIsAllPageRowsSelected()
    if (value2){
      tabProvider.setDelete(value2)
    }

  },[table.getIsSomePageRowsSelected(),table.getIsAllPageRowsSelected() ])

  useEffect(() => {
    if(row.getIsSelected())
    {
      tabProvider.addRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }else{
      tabProvider.suppRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }
  },[row.getIsSelected()])

  const tabType = useContext(TabContext);
  const [page, setPage] = useState('default')


  useEffect(() => {
    if (page !='default')
    {
      switch (tabType.variable) {
        case 'Categories':
          typeContext.ChangeVariable(page);
          router.push('/pages/viewCategory');
          break;
        case 'Post':
          postContext.ChangeVariable(page);
          router.push('/pages/viewBlog');
          break;
        case 'Page':
          pageContext.changeVariable(page);
          router.push('/pages/viewPage');
          break;
        case 'Blogger':
          blogContext.changeVariable(page);
          router.push('/pages/viewBlogger');
          break;
        case 'SystemPage':
          systemPageContext.changeVariable(page);
          router.push('/pages/viewSystemPage');
          break;

      }
 
    }

  },[page])
  return (
    <>
    
    <DropdownMenu open={value} >
    <DropdownMenuTrigger asChild>
      <Button 
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => {setValue(true)}}
      >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button> 
    </DropdownMenuTrigger>
    <DropdownMenuContent  align="end" className="w-[160px]" onMouseLeave={() => setValue(false)} onMouseEnter={() => setValue(true)}>
      <DropdownMenuItem onClick={() => {setPage(row.id)}}>View</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => {tabType.addRow(row.getValue('title') ? row.getValue('title') : row.getValue('name'))}}>
        <DeleteModal custom={true}>Delete<DropdownMenuShortcut className="pl-10">⌘⌫</DropdownMenuShortcut> </DeleteModal>
      </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}