import {
  LockClosedIcon,
  ShieldCheckIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Change Password */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <LockClosedIcon className="w-5 h-5 mr-2" />
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            Update Password
          </button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          Two-Factor Authentication
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Status: <span className="text-gray-600">Disabled</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-900 transition">
            Enable 2FA
          </button>
        </div>
      </section>

      {/* Passkeys */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <KeyIcon className="w-5 h-5 mr-2" />
          Passkeys
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
            <div>
              <h3 className="font-medium">MacBook Pro</h3>
              <p className="text-sm text-gray-500">Added on Jan 5, 2025</p>
            </div>
            <button className="text-sm text-red-600 hover:underline">
              Remove
            </button>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            Add New Passkey
          </button>
        </div>
      </section>
    </div>
  );
}
