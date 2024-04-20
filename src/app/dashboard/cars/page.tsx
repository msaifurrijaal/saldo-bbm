"use client";
import AdminListCars from "@/components/fragments/cars/admin-list-cars";
import DriverListCars from "@/components/fragments/cars/driver-list-cars";
import { useSession } from "next-auth/react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Page = () => {
  const { data: session }: { data: any } = useSession();
  console.log(session);

  if (session) {
    return (
      <main>
        <h1 className=" mb-4 text-xl md:text-2xl font-semibold">Cars</h1>
        {session.user.role === "admin" ? (
          <AdminListCars />
        ) : (
          <DriverListCars userId={session.user.id} />
        )}
      </main>
    );
  } else {
    return <Skeleton height="220px" className="w-full mt-8" />;
  }
};

export default Page;
