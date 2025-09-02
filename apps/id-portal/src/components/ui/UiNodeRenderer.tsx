import { UiNode, UiNodeInputAttributes, UiNodeTypeEnum } from "@ory/client";
import UiNodeInput from "./UiNodeInput";

function normalizeAttributes(attrs: Record<string, any>) {
  const map: Record<string, string> = {
    referrerpolicy: "referrerPolicy",
    crossorigin: "crossOrigin",
  };
  return Object.fromEntries(
    Object.entries(attrs).map(([key, value]) => [map[key] ?? key, value]),
  );
}

export function UiNodeRenderer(node: UiNode, key: string) {
  switch (node.type) {
    case UiNodeTypeEnum.Input:
      return (
        <UiNodeInput
          key={key}
          node={node as UiNode & { attributes: UiNodeInputAttributes }}
        />
      );

    case UiNodeTypeEnum.Text:
      return (
        <p key={key} className="text-gray-600 text-sm">
          {node.meta?.label?.text ?? ""}
        </p>
      );

    case UiNodeTypeEnum.Img:
      return (
        <img
          key={key}
          src={(node.attributes as any).src}
          alt={node.meta?.label?.text || ""}
          className="max-w-full h-auto rounded"
        />
      );

    case UiNodeTypeEnum.A:
      return (
        <a
          key={key}
          href={(node.attributes as any).href}
          className="text-blue-600 hover:underline"
        >
          {node.meta?.label?.text || "Link"}
        </a>
      );

    case UiNodeTypeEnum.Script: {
      const script = document.createElement("script");
      Object.assign(script, normalizeAttributes(node.attributes as any));
      document.body.appendChild(script);
      return null;
    }

    case UiNodeTypeEnum.Div:
      return <div key={key}>{node.meta?.label?.text}</div>;

    default:
      return (
        <div key={key} className="text-red-600">
          Unsupported node type: {node.type}
        </div>
      );
  }
}
