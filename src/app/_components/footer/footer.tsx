"use client"

import { CldImage } from "next-cloudinary";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-200 to-pink-200 shadow-inner rounded-t-xl p-10">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
      <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
        <CldImage src="Official_LOGO_grn_ic9ldd" alt="Company Logo" width={100} height={100}/>
        <p className="text-green-800 font-serif font-medium pt-4">
          Transforming ideas into digital solutions with innovative technologies and creative strategies.
        </p>
      </div>
      <div className="w-full sm:w-2/3 flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h5 className="text-green-800 font-bold mb-3">Quick Links</h5>
          <ul className="space-y-2">
            <li><a href="/home" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Home</a></li>
            <li><a href="/about" className="text-green-600 hover:text-pink-600 transition-colors duration-300">About Us</a></li>
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Services</a></li>
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h5 className="text-gray-800 font-bold mb-3">Services</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Web Development</a></li>
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Mobile Apps</a></li>
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">UI/UX Design</a></li>
            <li><a href="#" className="text-green-600 hover:text-pink-600 transition-colors duration-300">Consulting</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h4 className="text-gray-800 font-bold mb-3">Contact Us</h4>
          <p className="text-gray-600">123 Digital Street, Suite 456<br />City, Country</p>
          <p className="text-gray-600 mt-2">Email: msns.edu.pk</p>
          <p className="text-gray-600">Phone: +923187625415</p>
        </div>
      </div>
    </div>
    <section className="rounded-md border-gray-300 mt-12 pt-5 text-center text-pink-800 text-md font-bold bg-transparent">
      &copy; {new Date().getFullYear()} MSNS-DEV | M.S. NAZ HIGH SCHOOL® | HH_STUDIOS™ |  All rights reserved.
    </section>
  </footer>
  
);
}