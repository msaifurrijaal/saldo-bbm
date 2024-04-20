"use client";
import Link from "next/link";
import React from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(session);
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-2 flex items-end justify-start rounded-md bg-blue-600 p-4"
      >
        <div className="w-32 text-white md:w-40">
          <h1 className="text-2xl md:text-3xl font-bold">Saldo BBM</h1>
        </div>
      </Link>
      <Link href="/dashboard" className="mb-2  rounded-md bg-gray-50 p-4">
        <div className="w-32 flex items-center justify-start text-white md:w-40 ">
          <Image
            src="/user_profile.png"
            width={24}
            height={24}
            alt="Profile Picture"
          />
          <h3 className="text-black ms-2">{session && session.user.name}</h3>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={() => signOut()}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
};

export default Nav;
