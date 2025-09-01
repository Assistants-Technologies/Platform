import { UiNodeGroupEnum, UiNodeInputAttributesTypeEnum, UiNodeTypeEnum } from "@ory/client"
import { LoginFlowState } from "@ory/client"
import getUiNodeTextClasses from "@/lib/ui/getUiNodeTextClasses"
import { groupOrder } from "@/lib/ui/groupOrder"
import { UiNodeRenderer } from "./UiNodeRenderer"

interface UiFormRendererProps<T> {
    flow: T & { ui: { action: string, method: string, nodes: any[], messages?: { text: string, type: string }[] } }
}

export default function UiFormRenderer<T>({ flow }: UiFormRendererProps<T>) {
    return <div>
        {
            flow.ui.messages && flow.ui.messages.length > 0 && (
                flow.ui.messages.map((msg, i) => (
                    <div key={`msg-${i}`} className={getUiNodeTextClasses(msg.type)} role="alert">
                        {msg.text}
                    </div>
                ))
            )
        }
        <form method={flow.ui.method} action={flow.ui.action} className="space-y-6">
            {groupOrder.map(group => (
                <div key={group} className="space-y-4">
                    {flow.ui.nodes
                    .filter(node => node.group === group)
                    .map((node, i) => UiNodeRenderer(node, `${group}-${i}`))}
                </div>
                ))
            }
        </form>
        <pre className="text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(UiNodeGroupEnum, null, 2)}

            {JSON.stringify(UiNodeTypeEnum, null, 2)}

            {JSON.stringify(LoginFlowState, null, 2)}

            {JSON.stringify(flow, null, 2)}
        </pre>
    </div>
}