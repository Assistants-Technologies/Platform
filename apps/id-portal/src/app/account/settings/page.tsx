import { Cog6ToothIcon, BellIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Preferences */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2" />
          Preferences
        </h2>

        <div className="space-y-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select defaultValue="en" className="select-base">
              <option value="en">English</option>
              <option value="pl">Polski</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select defaultValue="Europe/Warsaw" className="select-base">
              <option value="Europe/Warsaw">Europe / Warsaw</option>
              <option value="Europe/London">Europe / London</option>
              <option value="America/New_York">America / New York</option>
              <option value="Asia/Tokyo">Asia / Tokyo</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            Save Preferences
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <BellIcon className="w-5 h-5 mr-2" />
          Notifications
        </h2>

        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-gray-700">Email notifications</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-gray-700">SMS notifications</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-gray-700">Push notifications</span>
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            Save Notifications
          </button>
        </div>
      </section>
    </div>
  );
}
