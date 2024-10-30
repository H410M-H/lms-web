"use client"

import React from 'react';
import Link from "next/link";
import { CldImage } from 'next-cloudinary';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[url('https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267627/FrontView1_alaabu.jpg')] bg-cover py-6 flex flex-col justify-center sm:py-12 animate-fade-in">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto animate-slide-in-up">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-75 transition duration-700 ease-in-out hover:rotate-0 hover:skew-y-0 hover:scale-105">
        </div>
        <div className="relative px-2 py-10 bg-white/80 backdrop-blur-sm shadow-lg sm:rounded-3xl sm:p-20 animate-fade-in-up">
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <CldImage
                src="Official_LOGO_grn_ic9ldd"
                alt="logo"
                width={250}
                height={250}
                className="animate-bounce"
              />
              <h5 className="text-2xl font-serif font-medium text-emerald-600 transition duration-300 transform hover:scale-105">
                Welcome Back Cheif!
              </h5>
              <h1 className="text-5xl font-serif font-semibold text-amber-600 mt-4 transition duration-300 transform hover:scale-105">
                MSNS-LMS
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h5 className="text-xl font-serif font-medium text-emerald-600 mt-4 transition duration-300 transform hover:scale-105">
                MSNS-Learning Management System
              </h5>
                <div className="relative">
                  <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out" placeholder="Email address" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <button className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300 transform hover:scale-105">
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <Link href="/signup">
                <button className="bg-yellow-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
                  Register
                </button>
              </Link>
              <Link href="/admin/dashboard">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                  Admin Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
