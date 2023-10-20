'use-client'
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import { useFormik } from 'formik';
import { useEffect } from "react";
import PostSkeleton from "@/app/skeletonComponent/skeletonPost";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';


export default function NewCategory()
{
    const router = useRouter()
    const { createDoc, loading : creationLoading, isCompleted } = useFrappeCreateDoc()
    const formik = useFormik({
        initialValues: {
            name: 'title',
            title: 'title',
            published: 0,
        },
        onSubmit: (values) => createDoc("Blog Category" ,{
            ...values,
            name: values.title,
            title: values.title,
            published: values.published,
        }).then(() => {router.push('pages/blog')}),
    })
    

    return (
        <>
            {creationLoading ? (<PostSkeleton/>) : (            
            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>                  
                    <div className="flex h-10 items-center space-x-2">
                    <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={(value: any) => {formik.setFieldValue("title", value.target.value), formik.setFieldValue("name", value.target.value)}}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="published"
                            checked={formik.values.published == 1? true : false}
                            onChange={(value: any) => formik.setFieldValue("published",formik.values.published == 1? 0: 1 )}
                        />
                        Published
                    </label>
                    <Button type="submit">Update</Button>
                    </div>
                </div>
            </form>)}

        </>
    );
}
