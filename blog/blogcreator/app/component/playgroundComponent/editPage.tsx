
'use-client'
import "@blocknote/core/style.css";
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import React, { useEffect, useState } from 'react'
import Composer from './composer'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PageContext } from "@/provider/pageProvider";
import PostSkeleton from "@/app/skeletonComponent/skeletonPost";
import { DataDocList } from "@/typing";


    const EditPage = ({page =false} : {page? : boolean}) => {
    const pageContext = useContext(PageContext)
    let data = pageContext.data? pageContext.data : {} as any;
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const router = useRouter()



    useEffect(() => {
        if(isCompleted && pageContext.update == 1)
        {
            pageContext.changeSubmit(2)
            router.push('/pages/blog')
        }
    },[isCompleted])

    useEffect(() =>{
        if(pageContext.update == 1)
        {
            formik.handleSubmit()
        }
    },[pageContext.update])

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? "",
            content_type: data?.content_type ?? "",
            content_json: JSON.parse(data?.content_json) ?? {},
        },
        onSubmit: (values) => updateDoc("BlogPage", data.name , {
            ...values,
            title: values.content_json.blocks[0].content[0].text,
            content_type: "JSON",
            content: "",
        }).then(() => {}),
    })

    return (
        <>
            {docLoading ? 'loading ...' :             
            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>
                    {data ? <Composer value={formik.initialValues.content_json.blocks} onChange={(value: any) => formik.setFieldValue("content_json", { blocks: value })} /> :  <PostSkeleton></PostSkeleton>}
                </div>
            </form>}
        
        </>
    );
};


export default EditPage