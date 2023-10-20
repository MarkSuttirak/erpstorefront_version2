"use client"    

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { login } from "@/actions/login"


function LogButton () {
    const [isPending, startTransition] = useTransition()
    const formData = new FormData();
    formData.append('user', 'Administrator')
    formData.append('password', 'admintoor')
    return (<Button
        onClick={() => { startTransition(() => { login(formData)})}}
    >{isPending ? 'loading...' : 'Login'}</Button>
    )
}

export default LogButton