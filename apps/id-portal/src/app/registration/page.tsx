'use client'
import { createBrowserRegistrationFlow } from "@/lib/ory/registration/createBrowserRegistrationFlow"
import { useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams} from "next/navigation"
import { isRedirect, isSuccess, isError } from "@/lib/ory/result"
import { RegistrationFlow } from "@ory/client"
 
import UiFormRenderer from "@/components/ui/UiFormRenderer"
import { getRegistrationFlow } from "@/lib/ory/registration/getRegistrationFlow"


export default function RegistrationPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [flowId, setFlowId] = useState("")
    const [flow, setFlow] = useState<RegistrationFlow | null>(null)

    useEffect(() => { 
        async function init() {
            const query = searchParams.get("flow")
            if (query) {
                console.log("Using existing flow from query:", query)
                setFlowId(query)
                const flowData = await getRegistrationFlow(query)
                if (isSuccess(flowData)) {
                    setFlow(flowData.data)
                } else {
                    console.error("Error fetching registration flow:", flowData.error)
                }
                return
            }

            console.log("Initializing registration flow...")
            const result = await createBrowserRegistrationFlow()
            if(isSuccess(result)) {
                console.log("Registration flow created:", result.data)
                setFlow(result.data)
                setFlowId(result.data.id)
                router.replace(`/registration?flow=${result.data.id}`)
            } else if(isRedirect(result)) {
                console.log("Redirecting to:", result.redirectTo)
                redirect(result.redirectTo)
            } else if(isError(result)) {
                console.error("Error creating registration flow:", result.error)
            } else {
                console.error("Unexpected result:", result)
            }
        } 
        init()
    }, [router, searchParams])

    if (!flow) {
        return <div>Loading login flow...</div>
    }

    return <UiFormRenderer flow={flow} />
}