"use client";
import React, { useEffect, useState } from "react";
import TableActivities from "./table-activities";
import { useSession } from "next-auth/react";

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
    setActivitiesFilters(activities);
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

    setActivitiesFilters(filteredActivities);
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
      <TableActivities
        activitiesData={activitiesFilters}
        isLoading={isLoading}
        role={user.role}
      />
    </section>
  );
};

export default DriverListActivities;
