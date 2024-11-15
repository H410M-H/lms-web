'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary';
import { Button } from "~/components/ui/button"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { User } from 'lucide-react'

export default function Component() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'bg-transparent backdrop-blur-md h-14'
          : 'bg-green-100/40 h-20'
        }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/landing"
          className="flex items-center">
          <CldImage
            src="Official_LOGO_grn_ic9ldd" // Add the image path in the public folder
            alt="Logo"
            width={50}
            height={50}
            className="transition-all duration-300 ease-in-out hover:size-max"
          />
        </Link>

        <nav>
          <ul className="flex space-x-4 text-black font-bold">
            <li>
              <Link href="/admin/dashboard">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/registration">
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
              >
                <User className="h-5 w-5 text-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-in-out"
            >
              <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
