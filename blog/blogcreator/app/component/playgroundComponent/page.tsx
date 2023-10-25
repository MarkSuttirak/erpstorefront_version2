import React from 'react'
import Composer from './composer';
import { useContext } from 'react';
import { PostContext } from '@/provider/postProvider';
import { PageContext } from '@/provider/pageProvider';


const Page = ({page =false} : {page? : boolean}) => {

    const pageContext = useContext(PageContext)
    let data = pageContext.data

    if(data)
    {
        return (
            <Composer value={JSON.parse(data.content_json).blocks} viewOnly={true} />
        )
    }
 
}

export default Page