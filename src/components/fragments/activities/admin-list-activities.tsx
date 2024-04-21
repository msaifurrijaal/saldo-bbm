"use client";
import Search from "@/components/elements/search/search";
import React, { useEffect, useState } from "react";
import TableActivities from "./table-activities";
import { useSession } from "next-auth/react";

const AdminListActivities = () => {
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
      const response = await fetch("/api/activities");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setActivities(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1 className="text-xl font-medium mb-4">List all activities</h1>
      <Search value={textInput} setTextInput={setTextInput} />
      <TableActivities
        activitiesData={activitiesFilters}
        isLoading={isLoading}
        role={user.role}
      />
    </section>
  );
};

export default AdminListActivities;
