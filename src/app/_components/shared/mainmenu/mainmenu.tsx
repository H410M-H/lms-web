'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
]

export default function MainMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRefs = useRef<Array<HTMLDivElement | null>>([])

  const handleMenuClick = (menuName: string) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName))
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRefs.current.some((ref) => ref?.contains(e.target as Node))) {
      return
    }
    setOpenDropdown(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, menuName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuClick(menuName)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <nav className="bg-gradient-to-r from-emerald-300 via-yellow-200 to-green-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="hover:bg-white/60 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
            >
              <Link href="/admin/dashboard">Dashboard</Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  ref={(el) => {
                    menuRefs.current[index] = el
                  }}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center hover:bg-green-400/60 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
                    onMouseEnter={() => handleMenuClick(item.name)}
                    onClick={() => handleMenuClick(item.name)}
                    onKeyDown={(e) => handleKeyDown(e, item.name)}
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

                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        id={`dropdown-${item.name}`}
                        className="absolute z-50 left-0 mt-2 w-65 rounded-md shadow-lg bg-green-100 opacity-90 ring-1 ring-black ring-opacity-5"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-green-900 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full text-left flex items-center justify-between hover:bg-green-400/60 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
                    onClick={() => handleMenuClick(item.name)}
                    aria-expanded={openDropdown === item.name}
                    aria-haspopup="menu"
                    aria-controls={`mobile-dropdown-${item.name}`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ease-in-out ${
                        openDropdown === item.name ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Button>
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        id={`mobile-dropdown-${item.name}`}
                        className="pl-4 space-y-1"
                      >
                        {item.options.map((option) => (
                          <Link
                            key={option.label}
                            href={option.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-green-900 hover:bg-purple-100 focus:bg-purple-200 transition-all duration-300 ease-in-out"
                            onClick={() => {
                              setOpenDropdown(null)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            {option.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}