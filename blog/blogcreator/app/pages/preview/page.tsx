import React, {Suspense} from "react";
import PreviewPage from "@/app/component/preview";

export default function Preview () {
    return (
        <Suspense fallback={'Loading...'}>
            <PreviewPage></PreviewPage>
        </Suspense>
    )
}