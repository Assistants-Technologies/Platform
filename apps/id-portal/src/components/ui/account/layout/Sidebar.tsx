"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  UserIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  ArrowRightEndOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "/account/profile", label: "Profile", icon: UserIcon },
  { href: "/account/security", label: "Security", icon: LockClosedIcon },
  { href: "/account/sessions", label: "Sessions", icon: ComputerDesktopIcon },
  { href: "/account/settings", label: "Settings", icon: Cog6ToothIcon },
  { href: "/account/billing", label: "Billing", icon: CreditCardIcon },
  {
    href: "/account/logout",
    label: "Logout",
    icon: ArrowRightEndOnRectangleIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white w-64 flex-shrink-0 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/account/profile" className="flex items-center space-x-3">
          <Image
            src="/logos/light_purple_violet_full_transparent.svg"
            alt="Assistants Identity"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="text-lg font-semibold text-gray-900">Account</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium ${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">Assistants Identity</div>
      </div>
    </div>
  );
}
