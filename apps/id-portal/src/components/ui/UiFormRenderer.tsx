import { groupOrder } from "@/lib/ui/groupOrder";
import { UiNodeRenderer } from "./UiNodeRenderer";
import Link from "next/link";
import Image from "next/image";
import { JSX, useCallback } from "react";

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
      {/* Logo + heading */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/logos/light_purple_violet_full_transparent.svg"
            alt="Assistants Identity"
            width={60}
            height={60}
            priority
          />
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

      {/* Footer */}
      {titles[flowType].footer}
    </div>
  );
}
