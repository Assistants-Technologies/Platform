import messageClass from "@/lib/ui/getUiNodeTextClasses"
import { UiNode, UiNodeTypeEnum, UiNodeInputAttributes, UiContainer } from "@ory/client"

export function isUiNodeInput(node: UiNode): node is UiNode & { attributes: UiNodeInputAttributes } {
    return node.type === UiNodeTypeEnum.Input
}

interface InputProps {
    node: UiNode & { attributes: UiNodeInputAttributes }
}

export default function Input({ node }: InputProps) {
    if(!isUiNodeInput(node)) {
        return null
    }

    return (
        <>
            {
                node.meta.label?.text && (
                    <span 
                        className="text-sm text-gray-500"
                        id={`${node.meta.label.id}`}
                    >
                        {node.meta.label.text}
                    </span>
                )
            }
            <node.attributes.node_type
                type={node.attributes.type}
                name={node.attributes.name}
                defaultValue={node.attributes.value ?? undefined}
                placeholder={node.meta?.label?.text ?? undefined}
                className={messageClass(node.messages?.[0]?.type ?? "info") + " w-full"}
                autoComplete={node.attributes.autocomplete ?? undefined}
                disabled={node.attributes.disabled ?? undefined}
                required={node.attributes.required ?? undefined}
            />
        </>
    )
}