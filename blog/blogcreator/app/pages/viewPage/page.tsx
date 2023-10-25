import PlaygroundPage from "../../component/playground"
import { Suspense } from "react"

export default function ViewPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'view'} page={'Page'}></PlaygroundPage>
        </Suspense>
    )
}