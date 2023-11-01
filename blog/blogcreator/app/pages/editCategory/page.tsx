import PlaygroundPage from "@/app/component/playground"
import { Suspense } from "react"

export default function EditCategory () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'Categories'}></PlaygroundPage >
        </Suspense>
    )
}