"use client";

import { useState } from "react";
import {
  Home,
  User,
  Settings,
  Lock,
  Monitor,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const navItems = [
  { name: "Profile", icon: User, href: "/account/profile" },
  { name: "Settings", icon: Settings, href: "/account/settings" },
  { name: "Security", icon: Lock, href: "/account/security" },
  { name: "Sessions", icon: Monitor, href: "/account/sessions" },
  { name: "Logout", icon: LogOut, href: "/logout" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Profile");

  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0 h-screen hidden md:flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <User className="text-white w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold">Account</h2>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={clsx(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    active === item.name
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        v2.4.1
      </div>
    </aside>
  );
}