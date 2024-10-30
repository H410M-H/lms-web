"use client";

import { CldImage } from 'next-cloudinary';
import { useState } from 'react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <header className="top-5 z-50 bg-gradient-to-r from-green-400 to-emerald-100 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CldImage src="Official_LOGO_grn_ic9ldd" width={36} height={16} alt="Company Logo" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/landing" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Home</a>
              <a href="/about" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">About</a>
              <a href="/login" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Services</a>
              <a href="/about" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Contact</a>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="/signup" className="button-3d bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg font-bold">Get Started</a>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-green-800 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-400 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/home" className="block nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Home</a>
            <a href="/about" className="block nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">About</a>
            <a href="/login" className="block nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Services</a>
            <a href="#" className="block nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Contact</a>
            <a href="/signup" className="block w-full text-center mt-4 button-3d bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg font-bold">Get Started</a>
          </div>
        </div>
      )}
    </header>
  )
}