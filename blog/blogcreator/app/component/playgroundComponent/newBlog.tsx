import { BlockNoteView, useBlockNote} from '@blocknote/react';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { PostContext } from "@/provider/postProvider"
import React , { useContext, useEffect, useState } from "react"



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

const NewBlog = () => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc } = useFrappeCreateDoc();
    const postContext = useContext(PostContext);
    const [file, setFile] = useState<File>()
    const {upload,progress, loading} = useFrappeFileUpload()

    useEffect(() =>{
        console.log(postContext.update)
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
        if(postContext.update.submited)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blog Post",
                    "docname" : blocks![0].content[0].text
                  }).then((response) => {formik.handleSubmit()})
            }
            else{
                formik.handleSubmit()
            }
        }
    },[postContext.update])
    const editor = useBlockNote({
        initialContent: Contents,
        onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
    });
    const formik = useFormik({
        initialValues: {
            blog_category: "",
            blogger: "",
            content_type: "JSON",
            content_json: {},
            content: "",
            published_on : undefined,

        },
        onSubmit: (values) => createDoc("Blog Post", {
            ...values,
            title: blocks![0].content[0].text,
            content_type: "JSON",
            content_json: { blocks },
            content: "",
            published_on: values.published_on,
        }),
    });

    return (
        <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
            <div className="min-h-[400px] flex-1 p-4 md:min-h-[700px] rounded-md lg:min-h-[700px] " >
            <BlockNoteView  editor={editor} />
            </div>
        </form>
    );
}

export default NewBlog
