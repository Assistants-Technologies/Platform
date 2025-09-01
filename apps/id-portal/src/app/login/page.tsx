'use client'
import { createBrowserLoginFlow } from "@/lib/ory/login/createBrowserLoginFlow"
import { useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams} from "next/navigation"
import { isRedirect, isSuccess, isError } from "@/lib/ory/result"
import { LoginFlow } from "@ory/client"
import { getLoginFlow } from "@/lib/ory/login/getLoginFlow"


export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [flowId, setFlowId] = useState("")
    const [flow, setFlow] = useState<LoginFlow | null>(null)

    useEffect(() => { 
        async function init() {
            const query = searchParams.get("flow")
            if (query) {
                console.log("Using existing flow from query:", query)
                setFlowId(query)
                const flowData = await getLoginFlow(query)
                if (isSuccess(flowData)) {
                    setFlow(flowData.data)
                } else {
                    console.error("Error fetching login flow:", flowData.error)
                }
                return
            }

            console.log("Initializing login flow...")
            const result = await createBrowserLoginFlow()
            if(isSuccess(result)) {
                console.log("Login flow created:", result.data)
                setFlow(result.data)
                setFlowId(result.data.id)
                router.replace(`/login?flow=${result.data.id}`)
            } else if(isRedirect(result)) {
                console.log("Redirecting to:", result.redirectTo)
                redirect(result.redirectTo)
            } else if(isError(result)) {
                console.error("Error creating login flow:", result.error)
            } else {
                console.error("Unexpected result:", result)
            }
        } 
        init()
    }, [router, searchParams])

    return (<div>
        <h1>Login Page</h1>
        <p>Flow ID: {flowId}</p>
        <pre>{JSON.stringify(flow, null, 2)}</pre>
    </div>
    )
}