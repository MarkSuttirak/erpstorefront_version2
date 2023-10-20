"use-client"

import { useFrappeUpdateDoc } from 'frappe-react-sdk';
import { useFormik } from 'formik';
import { useContext } from "react";
import { TypeContext } from "@/provider/typeProvider";
import PostSkeleton from "@/app/skeletonComponent/skeletonPost";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function EditCategoy () {

    const typeContext = useContext(TypeContext)
    let getData = typeContext.data
    const {data : dataList, isLoading : loading} = getData()
    const data = dataList[parseInt(typeContext.variable)]
    const router = useRouter()
    const { updateDoc } = useFrappeUpdateDoc()
    const formik = useFormik({
        initialValues: {
            title: data?.title ?? "",
            published: data?.published ?? 0,
        },
        onSubmit: (values) => updateDoc("Blog Category", data.name , {
            ...values,
            title: values.title,
            published: values.published,
        }).then(() => {router.push('/pages/blog')}),
    })


    return (
        <>
            {loading ? (
                <PostSkeleton></PostSkeleton>
            ) : (
                <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                    <div className='flex h-full flex-col space-y-4 '>
                        {data ?                     
                        <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={(value: any) => formik.setFieldValue("title", value.target.value)}
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
                    </div> :  <PostSkeleton></PostSkeleton>}
                    </div>
                </form>
            )}
        </>
    );
}