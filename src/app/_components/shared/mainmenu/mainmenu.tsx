"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import Link from "next/link";

const menuItems = [
  {
    name: "Academics",
    options: [
      { label: "Academics Management", href: "/admin/academics" },
      { label: "Session Management", href: "/admin/academics/annualSession/sessionalDetails" },
      { label: "Class Management", href: "/admin/academics/classwiseDetail" },
      { label: "Reports", href: "/admin/analytics" },
    ],
  },
  {
    name: "Alumni",
    options: [
      { label: "Faculty", href: "/alumni/faculty" },
      { label: "Tasks", href: "/alumni/tasks" },
      { label: "Attendance", href: "/alumni/attendance" },
      { label: "Salary", href: "/alumni/salary" },
    ],
  },
  {
    name: "Registration",
    options: [
      { label: "Online Portal", href: "/registration/portal" },
      { label: "Student", href: "/registration/student/view" },
      { label: "Faculty", href: "/registration/faculty/view" },
      { label: "Case Studies", href: "/registration" },
    ],
  },
  {
    name: "Revenue",
    options: [
      { label: "Fee Management", href: "/revenue/fee" },
      { label: "Salary", href: "/revenue/salary" },
      { label: "Finance", href: "/revenue/finance" },
      { label: "Contact", href: "/about" },
    ],
  },
];

export default function MainMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMenuClick = (menuName: string) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRefs.current.some((ref) => ref?.contains(e.target as Node))) {
      return;
    }
    setOpenDropdown(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-300 via-yellow-200 to-green-800 shadow-md">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="hover:bg-white/60 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
        >
          <Link href="/admin/dashboard">Dashboard</Link>
        </Button>

        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className="relative"
            ref={(el) => {
              menuRefs.current[index] = el;
            }}
          >
            <Button
              variant="ghost"
              className="flex items-center hover:bg-green-400/60 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
              onMouseOver={() => handleMenuClick(item.name)}
              aria-expanded={openDropdown === item.name}
              aria-haspopup="menu"
              aria-controls={`dropdown-${item.name}`}
            >
              {item.name}{" "}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-300 ease-in-out ${
                  openDropdown === item.name ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>

            {openDropdown === item.name && (
              <div
                id={`dropdown-${item.name}`}
                className="absolute z-50 left-0 mt-2 w-65 rounded-md shadow-lg bg-green-100 opacity-90 ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform"
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {item.options.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2 text-base font-medium text-green-900 hover:bg-purple-100 focus:bg-purple-200 transition-all duration-300 ease-in-out"
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
          <Input
            className="pl-8 text-green-900 placeholder-gray-400 bg-white rounded-full shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-300 ease-in-out"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
}
