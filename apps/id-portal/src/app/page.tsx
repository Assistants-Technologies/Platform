"use client"
import { useEffect, useState } from "react"
import { getSession } from "@/lib/ory/session/getSession"

export default function HomePage() {
  const [session, setSession] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const res = await getSession()
      if (res.ok) setSession(res.data)
      else setError(res.error)
    }
    load()
  }, [])

  if (error) {
    return <p>❌ No session: {JSON.stringify(error, null, 2)}</p>
  }

  if (!session) {
    return <p>Loading session...</p>
  }

  return (
    <div className="p-6 space-y-2">
        <p className="font-bold">✅ Session active</p>
        <p>Logged in user: {session.identity?.traits?.email ?? "unknown"}</p>

        <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(session, null, 2)}
        </pre>
    </div>
  )
}