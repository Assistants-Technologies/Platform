import {
  UiNode,
  UiNodeInputAttributes,
  UiNodeInputAttributesTypeEnum,
} from "@ory/client";
import { useCallback } from "react";

interface InputProps {
  node: UiNode & { attributes: UiNodeInputAttributes };
}

export default function UiNodeInput({ node }: InputProps) {
  const { attributes, meta } = node;
  const isButton =
    attributes.type === UiNodeInputAttributesTypeEnum.Button ||
    attributes.type === UiNodeInputAttributesTypeEnum.Submit;
  const isCheckbox = attributes.type === UiNodeInputAttributesTypeEnum.Checkbox;

  const formatAttributeName = useCallback(() => {
    if (!attributes.name) return "";
    return attributes.name
      .replace("traits.", "")
      .split(".")
      .reverse()
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, [attributes.name]);

  const getPlaceholderText = useCallback(() => {
    if (attributes.type === UiNodeInputAttributesTypeEnum.Email) {
      return "hi@assts.tech";
    }
    if (attributes.name === "traits.name.first") {
      return "Assistants";
    }
    if (attributes.name === "traits.name.last") {
      return "Technologies";
    }
    if (attributes.type === UiNodeInputAttributesTypeEnum.Password) {
      return "••••••••";
    }
    if (attributes.type === UiNodeInputAttributesTypeEnum.Checkbox) {
      return "";
    }
    if (attributes.name?.includes("phone")) {
      return "+48 123 456 789";
    }
    if (attributes.name?.includes("address")) {
      return "123 Innovation Street";
    }
    if (attributes.name?.includes("company")) {
      return "Assistants Technologies";
    }
    if (attributes.name) {
      return `Enter ${meta.label?.text ?? formatAttributeName()}`;
    }
    return "";
  }, [attributes]);

  if (isButton) {
    return (
      <button
        name={attributes.name}
        value={attributes.value ?? undefined}
        type={attributes.type as "button" | "submit"}
        disabled={attributes.disabled ?? false}
        className="btn-primary"
        onClick={
          attributes.onclickTrigger
            ? () => {
                const fn = (window as any)[attributes.onclickTrigger!];
                if (typeof fn === "function") fn();
              }
            : undefined
        }
      >
        {meta?.label?.text ?? attributes.name}
      </button>
    );
  }

  if (isCheckbox) {
    return (
      <div className="flex items-center space-x-2">
        <input
          id={attributes.name}
          type="checkbox"
          name={attributes.name}
          defaultChecked={attributes.value === "true"}
          disabled={attributes.disabled ?? false}
          required={attributes.required ?? false}
          className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
          onChange={(e) => {
            const target = e.currentTarget as HTMLInputElement;
            target.value = target.checked ? "true" : "false";
          }}
        />
        {meta?.label?.text && (
          <label
            htmlFor={attributes.name}
            className="text-sm font-medium text-gray-700"
          >
            {meta.label.text}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {meta?.label?.text && (
        <label
          htmlFor={attributes.name}
          className="block text-sm font-medium text-gray-700"
        >
          {meta.label.text}
        </label>
      )}
      <input
        id={attributes.name}
        type={attributes.type}
        name={attributes.name}
        defaultValue={attributes.value ?? ""}
        placeholder={getPlaceholderText()}
        autoComplete={attributes.autocomplete ?? undefined}
        disabled={attributes.disabled ?? false}
        required={attributes.required ?? false}
        className="input-base"
        onClick={
          attributes.onclickTrigger
            ? () => {
                const fn = (window as any)[attributes.onclickTrigger!];
                if (typeof fn === "function") fn();
              }
            : undefined
        }
      />
    </div>
  );
}
