
import React from "react";
import MusicPage from "../../component/main";
import { Suspense } from "react"

export default function Blog  () {
    
    return (
      <Suspense fallback={'Loading...'}>
      <MusicPage></MusicPage>
      </Suspense>

    )
}
