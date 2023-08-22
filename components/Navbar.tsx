import Link from "next/link";
import React from "react";
import Image from 'next/image';
import logo from '../app/logo.png';

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center max-w-screen-lg justify-between mx-auto p-4 bg-">
      <a href="/"><Image src={logo} alt="logo" width={40} height={40}/></a>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/api/auth/product-page">Add Product</Link>
      </div>
    </nav>
  )
};