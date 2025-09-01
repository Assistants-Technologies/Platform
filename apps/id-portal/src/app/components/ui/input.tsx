import getUiNodeTextClasses from "@/lib/ui/getUiNodeTextClasses"
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
                        id={`${node.meta.label.id}`}
                        className={getUiNodeTextClasses(node.meta?.label?.type ?? "info") + " w-full"}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoComplete={node.attributes.autocomplete ?? undefined}
                disabled={node.attributes.disabled ?? undefined}
                required={node.attributes.required ?? undefined}
            />
        </>
    )
}