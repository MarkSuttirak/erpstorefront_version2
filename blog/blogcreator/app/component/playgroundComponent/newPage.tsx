import { BlockNoteView, useBlockNote} from '@blocknote/react';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { PageContext } from "@/provider/pageProvider"
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

const NewPage = ({page =false} : {page? : boolean}) => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted, loading : isLoading } = useFrappeCreateDoc();
    const pageContext = useContext(PageContext);
    const router = useRouter()

    useEffect(() => {
        if(isCompleted && pageContext.update== 1)
        {
            pageContext.changeSubmit(2)
            router.push('/pages/blog')
        }
    },[isCompleted])

    useEffect(() =>{
    
        if(pageContext.update  == 1)
        {
            formik.handleSubmit()

        }
    },[pageContext.update])
    const editor = useBlockNote({
        initialContent: Contents,
        onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
    });
    const formik = useFormik({
        initialValues: {
            content_type: "JSON",
            content_json: {} as JSON,

        },
        onSubmit: (values) => createDoc("BlogPage", {
            ...values,
            title: blocks![0].content[0].text,
            content_json: { blocks },
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

export default NewPage
