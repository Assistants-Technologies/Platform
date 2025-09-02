"use client";
import { createBrowserLoginFlow } from "@/lib/ory/login/createBrowserLoginFlow";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { isRedirect, isSuccess, isError } from "@/lib/ory/result";
import { LoginFlow } from "@ory/client";
import { getLoginFlow } from "@/lib/ory/login/getLoginFlow";

import UiFormRenderer from "@/components/ui/UiFormRenderer";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [flow, setFlow] = useState<LoginFlow | null>(null);

  useEffect(() => {
    async function init() {
      const query = searchParams.get("flow");
      if (query) {
        console.log("Using existing flow from query:", query);
        const flowData = await getLoginFlow(query);
        if (isSuccess(flowData)) {
          setFlow(flowData.data);
        } else {
          console.error("Error fetching login flow:", flowData.error);
        }
        return;
      }

      console.log("Initializing login flow...");
      const result = await createBrowserLoginFlow();
      if (isSuccess(result)) {
        console.log("Login flow created:", result.data);
        setFlow(result.data);
        router.replace(`/login?flow=${result.data.id}`);
      } else if (isRedirect(result)) {
        console.log("Redirecting to:", result.redirectTo);
        redirect(result.redirectTo);
      } else if (isError(result)) {
        console.error("Error creating login flow:", result.error);
      } else {
        console.error("Unexpected result:", result);
      }
    }
    init();
  }, [router, searchParams]);

  if (!flow) {
    return <>Loading login flow...</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <UiFormRenderer flow={flow} />
    </div>
  );
}
