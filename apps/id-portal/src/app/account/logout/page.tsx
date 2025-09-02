"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/ory/session/getSession";
import { createBrowserLogoutFlow } from "@/lib/ory/logout/createBrowserLogoutFlow";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GenericError, Session } from "@ory/client";

export default function LogoutPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<GenericError | null>(null);

  // check if user is logged in
  useEffect(() => {
    async function load() {
      const res = await getSession();
      if (res.ok) setSession(res.data);
      else setError(res.error);
    }
    load();
  }, []);

  // logout handler
  const handleLogout = useCallback(async (global = false) => {
    const result = await createBrowserLogoutFlow(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    );

    if (result.ok && result.data.logout_url) {
      window.location.href = result.data.logout_url;
    } else if (!result.ok && "redirectTo" in result) {
      window.location.href = result.redirectTo!;
    } else {
      console.error("Logout error:", result);
    }
  }, []);

  // not logged in
  if (error) {
    return (
      <div className="h-full flex flex-col justify-center">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            No active session
          </h1>
          <p className="text-gray-600">
            You are not logged in. Please{" "}
            <Link href="/login" className="text-blue-600 underline">
              log in
            </Link>{" "}
            or{" "}
            <Link href="/registration" className="text-blue-600 underline">
              create an account
            </Link>
            .
          </p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  // loading state
  if (!session) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600">Loading session...</p>
      </div>
    );
  }

  // logout confirmation
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Icon + title */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
            <ArrowRightEndOnRectangleIcon className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Log out</h1>
          <p className="text-gray-600">
            Log out only from this account here,
            <br />
            or from all connected apps on this device.
          </p>
        </div>

        {/* Buttons */}
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => handleLogout(false)}
            className="w-full py-3 rounded-lg font-medium bg-black text-white hover:bg-gray-900 transition"
          >
            Logout here
          </button>
          <button
            onClick={() => handleLogout(true)}
            className="w-full py-3 rounded-lg font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
          >
            Logout everywhere
          </button>
        </div>

        {/* Cancel */}
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
