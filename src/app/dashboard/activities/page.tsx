"use client";
import AdminListActivities from "@/components/fragments/activities/admin-list-activities";
import DriverListActivities from "@/components/fragments/activities/driver-list-activities";
import RadioButton from "@/components/fragments/activities/radio-button";
import AdminListCars from "@/components/fragments/cars/admin-list-cars";
import DriverListCars from "@/components/fragments/cars/driver-list-cars";
import AdminListRequests from "@/components/fragments/requests/admin-list-requests";
import DriverListRequest from "@/components/fragments/requests/driver-list-request";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Activities = () => {
  const { data: session }: { data: any } = useSession();
  const [choice, setChoice] = useState("activities");

  if (session) {
    return (
      <main>
        <h1 className=" mb-4 text-xl md:text-2xl font-semibold">Activities</h1>
        <RadioButton isChoice={choice} choiceAnswer={setChoice} />
        {choice === "activities" ? (
          <div>
            {session.user.role === "admin" ? (
              <AdminListActivities />
            ) : (
              <DriverListActivities userId={session.user.id} />
            )}
          </div>
        ) : (
          <div>
            {session.user.role === "admin" ? (
              <AdminListRequests />
            ) : (
              <DriverListRequest userId={session.user.id} />
            )}
          </div>
        )}
      </main>
    );
  } else {
    return <Skeleton height="220px" className="w-full mt-8" />;
  }
};

export default Activities;
