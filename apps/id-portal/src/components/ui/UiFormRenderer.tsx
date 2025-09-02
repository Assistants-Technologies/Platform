import { groupOrder } from "@/lib/ui/groupOrder";
import { UiNodeRenderer } from "./UiNodeRenderer";
import { useCallback } from "react";

import { JSX } from "react";
import Link from "next/link";

interface UiFormRendererProps<T> {
  flow: T & {
    ui: {
      action: string;
      method: string;
      nodes: any[];
      messages?: { text: string; type: string }[];
    };
  };
}

type FlowType = "login" | "registration" | "unknown";

export default function UiFormRenderer<T>({ flow }: UiFormRendererProps<T>) {
  const getFlowType = useCallback<() => FlowType>(() => {
    if (flow.ui.action.includes("login")) return "login";
    if (flow.ui.action.includes("registration")) return "registration";
    return "unknown";
  }, [flow]);

  const flowType = getFlowType();

  const titles: Record<
    FlowType,
    { heading: string; subtext: string; footer: JSX.Element | null }
  > = {
    login: {
      heading: "Welcome Back",
      subtext: "Sign in to your account",
      footer: (
        <p className="text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            href="/registration"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      ),
    },
    registration: {
      heading: "Create Your Account",
      subtext: "Sign up to get started",
      footer: (
        <p className="text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      ),
    },
    unknown: {
      heading: "Authentication",
      subtext: "Continue below",
      footer: null,
    },
  };

  return (
    <div className="form-container">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-1.105.895-2 2-2h2m-6 5h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {titles[flowType].heading}
        </h1>
        <p className="text-gray-600 mt-2">{titles[flowType].subtext}</p>
      </div>

      {/* Messages */}
      {flow.ui.messages?.length ? (
        <div className="space-y-2 mb-4">
          {flow.ui.messages.map((msg, i) => (
            <div key={`msg-${i}`} className="text-red-600 text-sm" role="alert">
              {msg.text}
            </div>
          ))}
        </div>
      ) : null}

      {/* Form */}
      <form
        method={flow.ui.method}
        action={flow.ui.action}
        className="space-y-6"
      >
        {groupOrder.map((group) => (
          <div key={group} className="space-y-4">
            {flow.ui.nodes
              .filter((node) => node.group === group)
              .map((node, i) => UiNodeRenderer(node, `${group}-${i}`))}
          </div>
        ))}
      </form>

      {/* Footer text */}
      {titles[flowType].footer}

      {/* JSON for debugging */}
      {/* <pre className="mt-6 p-4 bg-gray-100 rounded-md">
        {JSON.stringify(flow, null, 2)}
      </pre> */}
    </div>
  );
}
