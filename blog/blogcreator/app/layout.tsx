'use client'
import Loading from '@/static/loading';
import './globals.css'
import { FrappeProvider } from "frappe-react-sdk";
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { TabProvider } from '@/provider/tabProvider';
import { PostProvider } from '@/provider/postProvider';
import { TypeProvider } from '@/provider/typeProvider';
import {PageProvider} from '@/provider/pageProvider';
import {BloggerProvider} from '@/provider/BloggerProvider';
import { SystemPageProvider } from '@/provider/SystemPageProvider';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  return (
    <FrappeProvider 
      url='https://dev.zaviago.com' 
      tokenParams={{
      type: 'token',
      useToken: true,
      token: () => `2ad3412e27b5c61:1cf86d7f8a8a367`
    }}>
      <SystemPageProvider>
      <BloggerProvider>
      <PostProvider>
      <TypeProvider>
      <PageProvider>
      <TabProvider>
      <html lang="en">
        
        <body><Suspense fallback={<Loading />}>{children}<Toaster /></Suspense></body>
      </html>
      </TabProvider>
      </PageProvider>
      </TypeProvider>
      </PostProvider>
      </BloggerProvider>
      </SystemPageProvider>
    </FrappeProvider>
  )
}
