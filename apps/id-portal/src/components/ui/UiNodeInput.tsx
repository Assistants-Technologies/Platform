import getUiNodeTextClasses from "@/lib/ui/getUiNodeTextClasses";
import {
  UiNode,
  UiNodeTypeEnum,
  UiNodeInputAttributes,
  UiContainer,
  UiNodeInputAttributesTypeEnum,
} from "@ory/client";

export function isUiNodeInput(
  node: UiNode,
): node is UiNode & { attributes: UiNodeInputAttributes } {
  return node.type === UiNodeTypeEnum.Input;
}

interface InputProps {
  node: UiNode & { attributes: UiNodeInputAttributes };
}

export default function UiNodeInput({ node }: InputProps) {
  if (!isUiNodeInput(node)) {
    return null;
  }

  const isButton = (
    [
      UiNodeInputAttributesTypeEnum.Button,
      UiNodeInputAttributesTypeEnum.Submit,
    ] as UiNodeInputAttributesTypeEnum[]
  ).includes(node.attributes.type);

  return (
    <>
      {node.meta.label?.text && !isButton && (
        <span
          id={`${node.meta.label.id}`}
          className={
            getUiNodeTextClasses(node.meta?.label?.type ?? "info") + " w-full"
          }
        >
          {node.meta.label.text}
        </span>
      )}
      {isButton ? (
        <button
          name={node.attributes.name}
          value={node.attributes.value ?? undefined}
          type={
            node.attributes.type as "button" | "submit" | "reset" | undefined
          }
          disabled={node.attributes.disabled ?? undefined}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={
            node.attributes.onclickTrigger
              ? () => {
                  const fn = (window as any)[
                    (node.attributes as any).onclickTrigger
                  ];
                  fn();
                }
              : undefined
          }
        >
          {node.meta?.label?.text ?? node.attributes.name}
        </button>
      ) : (
        <node.attributes.node_type
          type={node.attributes.type}
          name={node.attributes.name}
          defaultValue={node.attributes.value ?? undefined}
          placeholder={node.meta?.label?.text ?? undefined}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete={node.attributes.autocomplete ?? undefined}
          disabled={node.attributes.disabled ?? undefined}
          required={node.attributes.required ?? undefined}
          onClick={
            node.attributes.onclickTrigger
              ? () => {
                  const fn = (window as any)[
                    (node.attributes as any).onclickTrigger
                  ];
                  fn();
                }
              : undefined
          }
          onChange={
            node.attributes.type === UiNodeInputAttributesTypeEnum.Checkbox
              ? (e) => {
                  const value = e.target.checked ? "true" : "false";
                  e.currentTarget.value = value;
                }
              : undefined
          }
        />
      )}
    </>
  );
}
