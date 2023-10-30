import Composer from './composer';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { PostContext } from "@/provider/postProvider"
import React , { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";



var Contents =  [{
    "id": "45947528-bc73-432b-937e-5d6148f4d4c3",
    "type": "heading",
    "props" : {
        "textColor" : "default",
        "backgroundColor" : "default",
        "textAlignment" : "left",
        "level" : "1"
    } as any,
    "content": [
        {
            "type": "text",
            "text": "Title",
            "styles": {}
        }
    ] as any ,
    "children": []
},
{
    "id": "0153698c-1c59-474f-a0ab-36303d2e2064",
    "type": "paragraph",
    "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left"
    },
    "content": [],
    "children": []
}]

const NewBlog = ({page =false} : {page? : boolean}) => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted, loading : isLoading } = useFrappeCreateDoc();
    const postContext = useContext(PostContext);
    const [file, setFile] = useState<File>()
    const {upload,progress, loading} = useFrappeFileUpload()
    const [url , setUrl] = useState('')
    const router = useRouter()

    useEffect(() => {
        if(url != '' && postContext.update.submited == 1 )
        {
            formik.setFieldValue('meta_image',url);
            formik.handleSubmit()
        }
    },[url])

    useEffect(() => {
        if(isCompleted && postContext.update.submited == 1)
        {
            postContext.ChangeObject(undefined,'submited', 2)
            router.push('/pages/blog')
        }
    },[isCompleted])

    useEffect(() =>{
        if(postContext.update.category)
        {
            formik.setFieldValue('blog_category', postContext.update.category)
        }
        if(postContext.update.writer)
        {
            formik.setFieldValue('blogger', postContext.update.writer)
        }
        if(postContext.update.publish_date)
        {
            formik.setFieldValue('published_on', postContext.update.publish_date)
        }
        if(postContext.update.image)
        {
            setFile(postContext.update.image)
        }
        if(postContext.update.submited  == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blog Post",
                    "docname" : blocks![0].content[0].text,
                    "fieldname" : "meta_image"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                formik.handleSubmit()
            }
        }
    },[postContext.update])
    const formik = useFormik({
        initialValues: {
            blog_category: "",
            blogger: "",
            content_type: "JSON",
            content_json: {} as JSON,
            content: "",
            published_on : undefined,
            meta_image : ""

        },
        onSubmit: (values) => createDoc("Blog Post", {
            ...values,
            title: blocks![0].content[0].text,
            content_type: "JSON",
            content_json: { blocks },
            content: "",
        }),
    });

    return (
        <form className="flex flex-1 flex-col space-y-4" onSubmit={formik.handleSubmit}>
            <div className="h-screen w-screen flex-1 p-4  rounded-md " >
            <Composer value={Contents} onChange={(value: any) => formik.setFieldValue("content_json", { blocks: value })}></Composer>
            </div>
        </form>
    );
}

export default NewBlog
