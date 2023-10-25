import CategoriesPlayground from "@/app/component/playgrountCategories"
import { Suspense } from "react"

export default function EditBlog () {
    return(
        <Suspense fallback={'Loading...'}>
        <CategoriesPlayground state={'edit'}></CategoriesPlayground>
        </Suspense>
    )
}