import { getSession } from "@/lib/ory/kratos.session"

export default async function HomePage() {
 const res = await getSession()

  if (!res.ok) {
    switch (res.status) {
      case 401:
      case 403:
        return <p>❌ No session</p>
      case 404:
        return <p>❌ Not found</p>
      case 500:
        return <p>❌ Server error</p>
      default:
        return (
          <div>
            <p>❌ Other error: {res.status}</p>
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(res.error, null, 2)}
            </pre>
          </div>
        )
    }
  }

  const session = res.data
  const email = session.identity?.traits?.email ?? "unknown"

  return (
    <div className="p-6 space-y-2">
      <p className="font-bold">✅ Session active</p>
      <p>Logged in user: {email}</p>
      <pre className="text-xs bg-gray-100 p-2 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}