
'use-client'
import "@blocknote/core/style.css";
import { useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk'
import React, { useEffect } from 'react'
import Composer from './composer'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PostContext } from "@/provider/postProvider";
import PostSkeleton from "@/app/skeletonComponent/skeletonPost";
import { DataDocList } from "@/typing";


    const EditBlog = () => {
    const postContext = useContext(PostContext)
    let temPdata = postContext.data
    let data : DataDocList = {} as DataDocList;
    if(temPdata)
    {
        data = temPdata
    }
    const router = useRouter()
    const { updateDoc } = useFrappeUpdateDoc()
    const formik = useFormik({
        initialValues: {
            title: data?.title ?? "",
            content_type: data?.content_type ?? "",
            content_json: data?.content_json ?? {},
            published: data?.published ?? 0,
            blogger: data?.blogger ?? "",
            blog_category: data?.blog_category,
        },
        onSubmit: (values) => updateDoc("Blog Post", data.name , {
            ...values,
            title: JSON.parse(values.content_json).blocks[0].content[0].text,
            content_type: "JSON",
            content: "",
            published: 1,
            blogger: data?.blogger,
            blog_category: data?.blog_category,
        }).then(() => {router.push('/pages/blog')}),
    })

    return (
        <>

            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>
                    {data ? <Composer value={JSON.parse(data?.content_json).blocks} onChange={(value: any) => formik.setFieldValue("content_json", { blocks: value })} /> :  <PostSkeleton></PostSkeleton>}
                </div>
                <div className="flex items-center space-x-2">
                    <Button type="submit">Update</Button>
                    <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        
        </>
    );
};


export default EditBlog