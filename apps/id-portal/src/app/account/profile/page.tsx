import { UserIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue="Assistants"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Technologies"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="hi@assts.tech"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
            Save Changes
          </button>
        </div>
      </section>

      {/* Profile Picture */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
          Profile Picture
        </h2>

        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <UserIcon className="w-10 h-10 text-gray-400" />
          </div>
          <div className="space-x-3">
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition">
              Upload New
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
              Remove
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
