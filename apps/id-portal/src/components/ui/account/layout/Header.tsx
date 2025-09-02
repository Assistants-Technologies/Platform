"use client";

import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Hamburger menu (mobile only) */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="text-xl font-semibold">Account Management</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <UserCircleIcon className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
