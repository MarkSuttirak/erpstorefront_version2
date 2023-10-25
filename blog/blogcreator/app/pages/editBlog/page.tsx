import PlaygroundPage from "../../component/playground"
import { Suspense } from "react"

export default function EditBlog () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'Post'}></PlaygroundPage>
        </Suspense>
    )
}