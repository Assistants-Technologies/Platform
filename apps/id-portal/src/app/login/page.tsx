'use client'
import { createBrowserLoginFlow } from "@/lib/ory/login/createBrowserLoginFlow"
import { useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams} from "next/navigation"
import { isRedirect, isSuccess, isError } from "@/lib/ory/result"
import { LoginFlow, LoginFlowState, UiNodeGroupEnum, UiNodeTypeEnum, UiNode } from "@ory/client"
import { getLoginFlow } from "@/lib/ory/login/getLoginFlow"
import { isUiNodeInput } from "../components/ui/UiNodeInput"
import UiNodeInput from "../components/ui/UiNodeInput"

export const groupOrder: UiNodeGroupEnum[] = [
  UiNodeGroupEnum.Default,
  UiNodeGroupEnum.Password,
  UiNodeGroupEnum.Oidc,
  UiNodeGroupEnum.Passkey,
  UiNodeGroupEnum.Webauthn,
  UiNodeGroupEnum.Code,
  UiNodeGroupEnum.Link,
  UiNodeGroupEnum.Totp,
  UiNodeGroupEnum.LookupSecret,
  UiNodeGroupEnum.Captcha,
  UiNodeGroupEnum.Saml,
  UiNodeGroupEnum.Oauth2Consent,
  UiNodeGroupEnum.Profile,
  UiNodeGroupEnum.UnknownDefaultOpenApi,
]


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

    if (!flow) {
        return <div>Loading login flow...</div>
    }

    return <div>
        {
            groupOrder.map(group => (
                flow.ui.nodes.filter(node => node.group === group).map((node, i) => {
                    if (isUiNodeInput(node)) {
                        return (
                            <div key={`node-${i}`} className="mb-4">
                                <UiNodeInput node={node} />
                            </div>
                        )
                    }
                })
            ))
        }
        <pre className="text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(UiNodeGroupEnum, null, 2)}

            {JSON.stringify(UiNodeTypeEnum, null, 2)}

            {JSON.stringify(LoginFlowState, null, 2)}

            {JSON.stringify(flow, null, 2)}
        </pre>
    </div>
}