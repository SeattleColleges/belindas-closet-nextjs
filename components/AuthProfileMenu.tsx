"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

// AuthProfileMenu will change UI according to user's authentication status
export default function AuthProfileMenu() {
  
  // within a session, destructure the user data and determine user status (authenticated or not?)
  const { data, status } = useSession();

  // if user is authenticated, render the user's profile name and the logout button
  // pressing the logout button will sign user out using the signOut import from next-auth react
  const isAuth = status === "authenticated";

  if (isAuth) 
  return (
    <p>
      { data?.user?.name} <button onClick={() => signOut()}>Logout</button>
    </p>
  );

  return (
    <ul className="flex items-center space-x-6">
      <li>
        <Link href="/auth/sign-in">Login</Link>
      </li>
      <li>
        <Link className="bg-blue-500 text-white rounded p-3 inline-block shadow-sm"
        href="/auth/sign-in"/>
      </li>
    </ul>
  )
};