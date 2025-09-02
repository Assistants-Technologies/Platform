import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      {/* Active Sessions */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <ComputerDesktopIcon className="w-5 h-5 mr-2" />
          Active Sessions
        </h2>

        <div className="space-y-4">
          {/* Current session */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ComputerDesktopIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">MacBook Pro</h3>
                  <p className="text-sm text-gray-500">
                    Chrome • San Francisco, CA
                  </p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">
                Current Session
              </span>
            </div>
          </div>

          {/* Example iPhone */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">iPhone 14</h3>
                  <p className="text-sm text-gray-500">Safari • Warsaw, PL</p>
                </div>
              </div>
              <button className="text-sm text-red-600 font-medium hover:underline">
                Revoke
              </button>
            </div>
          </div>

          {/* Example iPad */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <DeviceTabletIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">iPad Pro</h3>
                  <p className="text-sm text-gray-500">
                    Safari • Last active 2 weeks ago
                  </p>
                </div>
              </div>
              <button className="text-sm text-red-600 font-medium hover:underline">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
