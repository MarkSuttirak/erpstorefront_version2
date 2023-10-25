"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Suspense } from "react"
import Loading from "@/static/loading"

import { DataTablePagination } from "../taskComponent/data-table-pagination"
import { DataTableToolbar } from "../taskComponent/data-table-toolbar"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { TabContext } from "@/provider/tabProvider"
import { PostContext } from "@/provider/postProvider"
import { TypeContext } from "@/provider/typeProvider"
import { PageContext } from "@/provider/pageProvider"
import { BloggerContext } from "@/provider/BloggerProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"

interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue>)[]
  data: TData[]
  currentTab : string
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const tabType = useContext(TabContext);
  const postContext = useContext(PostContext)
  const typeContext = useContext(TypeContext)
  const pageContext = useContext(PageContext)
  const blogContext = useContext(BloggerContext)
  const sysContext = useContext(SystemPageContext)
  const router = useRouter()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [goView, setGoView] = React.useState<string>('no')
  React.useEffect(() => {
    if(goView != 'no' )
    {
      let id = goView.match(/\d+/g)?.join('');
      if(id){
        switch(tabType.variable) {
          case 'Categories':
            typeContext.ChangeVariable(id);
            router.push('/pages/editCategory');
            break;
          case 'Post':
            postContext.ChangeVariable(id);
            router.push('/pages/editBlog');
            break;
          case 'Page':
            pageContext.changeVariable(id);
            router.push('/pages/editPage');
            break;
          case 'Blogger':
            blogContext.changeVariable(id);
            router.push('/pages/editBlogger');
            break;
          case 'SystemPage':
            sysContext.changeVariable(id);
            router.push('/pages/editSystemPage');
            break;
        }
      }
    }
  },[goView])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    autoResetPageIndex : true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <Suspense fallback={<Loading/>}>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}   onClick={() => {cell.getValue()? setGoView(cell.id) : null}} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Suspense>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}