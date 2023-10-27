'use-client'
import "@blocknote/core/style.css";
import { useFrappeGetDoc, useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import React, { useEffect, useState } from 'react'
import Composer from './composer'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BloggerContext } from "@/provider/BloggerProvider";
import { Blogger } from "@/typing";
import { Checkbox } from "@/components/ui/checkbox";





export default function NewBlogger () {
    const bloggerContext = useContext(BloggerContext)
    const [file, setFile] = useState<File>()
    const { createDoc, loading : docLoading, isCompleted } = useFrappeCreateDoc()
    const {upload,progress, loading} = useFrappeFileUpload()
    const router = useRouter()
    const [name,setName] = useState<string>('')
    const [short_name,setShortName] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const [url , setUrl] = useState('')

    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
        }
    }

    useEffect(() => {
        if(url != '' && bloggerContext.update == 1)
        {
            formik.setFieldValue('avatar',url);
            formik.handleSubmit()
        }
    },[url])

    useEffect(() => {
        if(isCompleted && bloggerContext.update == 1)
        {
            bloggerContext.changeSubmit(2)
            router.push('/pages/blog')
        }
    },[isCompleted])

    useEffect(() =>{

        if(bloggerContext.update == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blogger",
                    "docname" : short_name,
                    "fieldname" : "avatar"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                formik.handleSubmit()
            }
        }
    },[bloggerContext.update])

    const formik = useFormik<Blogger>({
        initialValues: {
        name :  '',
        full_name :  '',
        bio : '',
        avatar : '',
        disabled :  false,
        short_name :  ''
        },
        onSubmit: (values) => createDoc("Blogger", {
            ...values,
        }).then(() => {}),
    })

    return (
        <>
            {docLoading ? 'loading ...' :             
            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>
                    <div className="flex flex-column gap-2 items-start ">
                        <label htmlFor="short_name">id</label>
                        <input  id='short_name'  className="border rounded " type="text"  value={short_name} onChange={(e ) => {formik.setFieldValue('short_name', e.target.value  ) , setShortName(e.target.value)}}/>
                    </div>
                    <div className="flex flex-column gap-2 items-start ">
                        <label htmlFor="name">name</label>
                        <input  id='name'  className="border rounded " type="text"  value={name} onChange={(e ) => {formik.setFieldValue('full_name', e.target.value  ) , setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="bio">bio</label>
                        <input  id='bio' type='text' className="border rounded " value={bio} onChange={(e ) => {formik.setFieldValue('bio', e.target.value), setBio(e.target.value ) }}/>
                    </div>
                    <div>
                        <label htmlFor="avatar">avatar</label>
                        <input   id='avatar' type='file' className="border rounded " value='' onChange={(e ) => handleFile(e.target.files)}/>
                        {url && <img className="w-10 h-10" src={`https://dev.zaviago.com${url}` } alt="Selected File" />}
                    </div>
                    <div>
                        <label htmlFor="disabled">disabled</label>
                        <input  id="diasabled" type='checkbox'   value={disabled ? 'true' : 'false'} onChange={(e) => {formik.setFieldValue('disabled', e.target.value), setDisabled(!disabled)}}></input>
                    </div>

                </div>
            </form>}
        
        </>
    );
}


