"use client";
import React, { useEffect, useState } from "react";
import TableActivities from "./table-activities";
import { useSession } from "next-auth/react";
import Search from "@/components/elements/search/search";
import Link from "next/link";

const DriverListActivities = ({ userId }: { userId: number }) => {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [textInput, setTextInput] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesFilters, setActivitiesFilters] =
    useState<Activity[]>(activities);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const reversedActivities = [...activities].reverse();
    setActivitiesFilters(reversedActivities);
  }, [activities]);

  useEffect(() => {
    let filteredActivities: Activity[] = [];

    filteredActivities = activities.filter(
      (activity) =>
        activity.startLocation
          .toLowerCase()
          .includes(textInput.toLowerCase()) ||
        activity.endLocation.toLowerCase().includes(textInput.toLowerCase()) ||
        activity.userId
          .toString()
          .toLowerCase()
          .includes(textInput.toLowerCase()) ||
        activity.carId
          .toString()
          .toLowerCase()
          .includes(textInput.toLowerCase()) ||
        activity.status.toLowerCase().includes(textInput.toLowerCase())
    );
    const filteredActivitiesReversed = [...filteredActivities].reverse();
    setActivitiesFilters(filteredActivitiesReversed);
  }, [textInput]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const queryParams = userId ? `?user_id=${userId}` : "";

      const response = await fetch(`/api/activities${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setActivities(data.data);
        setActivitiesFilters(data.data);
      } else {
        console.error("Failed to fetch activities:", data.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-xl font-medium mb-4">List your activities</h1>
      <div className="flex items-center">
        <Search value={textInput} setTextInput={setTextInput} />
        <div className="w-1/12 ps-2">
          <Link
            href="/dashboard/activities/add"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-[8px] sm:text-[12px] p-2 w-full"
          >
            + Activity
          </Link>
        </div>
      </div>
      <TableActivities
        activitiesData={activitiesFilters.reverse()}
        isLoading={isLoading}
        role={user.role}
      />
    </section>
  );
};

export default DriverListActivities;
