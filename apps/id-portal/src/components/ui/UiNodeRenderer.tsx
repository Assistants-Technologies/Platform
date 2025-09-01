import { UiNode, UiNodeInputAttributes, UiNodeTypeEnum } from "@ory/client"
import UiNodeInput from "./UiNodeInput"
import getUiNodeTextClasses from "@/lib/ui/getUiNodeTextClasses"

function normalizeAttributes(attrs: Record<string, any>) {
  const map: Record<string, string> = {
    referrerpolicy: "referrerPolicy",
    crossorigin: "crossOrigin",
  }

  return Object.fromEntries(
    Object.entries(attrs).map(([key, value]) => [
      map[key] ?? key,
      value,
    ])
  )
}

export function UiNodeRenderer(node: UiNode, key: string) {
  let Node: React.ReactNode

  switch (node.type) {
    case UiNodeTypeEnum.Input:
      Node = (
        <UiNodeInput
          key={key}
          node={node as UiNode & { attributes: UiNodeInputAttributes }}
        />
      )
      break

    case UiNodeTypeEnum.Text:
      Node = (
        <p key={key} className={getUiNodeTextClasses(node.meta?.label?.type || "info")}>
          {node.meta?.label?.text ?? ""}
        </p>
      )
      break

    case UiNodeTypeEnum.Img:
      Node = (
        <img
          key={key}
          src={(node.attributes as any).src}
          alt={node.meta?.label?.text || ""}
          className="max-w-full h-auto"
        />
      )
      break

    case UiNodeTypeEnum.A:
      Node = (
        <a
          key={key}
          href={(node.attributes as any).href}
          className="text-blue-600 hover:underline"
        >
          {node.meta?.label?.text || "Link"}
        </a>
      )
      break

    case UiNodeTypeEnum.Script:
      Node = <script key={key} {...normalizeAttributes(node.attributes as any)} />
      break

    case UiNodeTypeEnum.Div:
      Node = <div key={key}>{node.meta?.label?.text}</div>
      break

    default:
      Node = (
        <div key={key} className="text-red-600">
          Unsupported node type: {node.type}
        </div>
      )
  }

  return <div key={key} className="space-y-2">
    {Node}
    {
      node.messages && node.messages.length > 0 && node.messages.map((msg, i) => (
        <div key={`msg-${i}`} className={getUiNodeTextClasses(msg.type)} role="alert">
          {msg.text}
        </div>
      ))
    }
  </div>
}