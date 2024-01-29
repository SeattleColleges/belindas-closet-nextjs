'use client';

import Profile from "@/app/profile/page";
import Link from "next/link";
import React, { useState } from "react";
import AuthProfileMenu from "./AuthProfileMenu";
import Image from 'next/image';
import logo from '../app/logo.png';

export default function Navbar() {

  const [showCategories, setShowCategories] = useState(false);

  const toggleCategoriesMenu = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav className="flex items-center max-w-screen-lg mx-auto px-5 py-2 shadow-md justify-between mt-2 mb-2 rounded">
      <a href="/"><Image src={logo} alt="logo" width={40} height={40}/></a>
      <Link href="/">Home</Link>
      <Link href="/auth/sign-in">Sign in</Link>

      <div className="relative">
        <span onClick={toggleCategoriesMenu} className="cursor-pointer">Products <span className="text-xs"> &#9660;</span></span>
        {showCategories && (
          <div className="absolute bg-black p-3 rounded-b shadow-md text-center left-1/2 transform -translate-x-1/2 top-12">
            <ul>
              <li className="p-2"><Link href="">Shirts</Link></li>
              <li className="p-2"><Link href="">Shoes</Link></li>
              <li className="p-2"><Link href="">Pants</Link></li>
              <li className="p-2"><Link href="">Skirts</Link></li>
              <li className="p-2"><Link href="">Suits</Link></li>
              <li className="p-2"><Link href="">Dress</Link></li>
              <li className="p-2"><Link href="">Casual Wear</Link></li>
              <li className="p-2"><Link href="">Accessories</Link></li>
              <li className="p-2"><Link href="">Jackets and Blazers</Link></li>
            </ul>
          </div>
        )}
      </div>

      <Link href="/donation-info">Donation Info</Link>
      <AuthProfileMenu />      
    </nav>
  )
};
