"use client";
import { useEffect, useState, useCallback } from "react";
import { getSession } from "@/lib/ory/session/getSession";
import { createBrowserLogoutFlow } from "@/lib/ory/logout/createBrowserLogoutFlow";
import Link from "next/link";
import { GenericError } from "@ory/client";

export default function HomePage() {
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<GenericError | null>(null);

  useEffect(() => {
    async function load() {
      const res = await getSession();
      if (res.ok) setSession(res.data);
      else setError(res.error);
    }
    load();
  }, []);

  const handleLogout = useCallback(async () => {
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

  // errors
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">❌ No session</p>
        <p className="mt-2 text-gray-700">
          You are not logged in. Please{" "}
          <Link href="/login" className="text-blue-600 underline">
            login
          </Link>{" "}
          or{" "}
          <Link href="/registration" className="text-blue-600 underline">
            register
          </Link>
          .
        </p>
        <p className="mt-4 text-sm text-gray-500">
            {error.message}
        </p>
      </div>
    );
  }

  // spinner
  if (!session) {
    return <p className="p-6 text-gray-600">Loading session...</p>;
  }

  // dashboard
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Logged in as{" "}
          <span className="font-medium">
            {session.identity?.traits?.email ?? "unknown"}
          </span>
        </p>
      </header>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium transition hover:bg-red-600"
      >
        Logout
      </button>

      <section>
        <h2 className="text-lg font-semibold">Session JSON</h2>
        <pre className="text-xs bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </section>
    </div>
  );
}
