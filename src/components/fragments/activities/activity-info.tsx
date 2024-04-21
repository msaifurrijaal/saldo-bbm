import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import ApproveActivity from "./approve-activity";
const ActivityInfo = async ({ activityId }: { activityId: string }) => {
  const data = await getDetailActivity(activityId);
  const session: any = await getServerSession(authOptions);
  const activity: Activity = data.data;

  return (
    <div>
      <p className="mb-2">
        <strong>User ID : </strong> {activity.userId}
      </p>
      <p className="mb-2">
        <strong>Car ID : </strong> {activity.carId}
      </p>
      <p className="mb-2">
        <strong>Start Location : </strong> {activity.startLocation}
      </p>
      <p className="mb-2">
        <strong>End Location : </strong> {activity.endLocation}
      </p>
      <p className="mb-2">
        <strong>Distance : </strong> {activity.distance} Km
      </p>
      <p className="mb-2">
        <strong>Status : </strong>{" "}
        <span
          className={`${
            activity.status === "pending"
              ? "bg-yellow-200 p-1"
              : "bg-green-200 p-1"
          } rounded-md`}
        >
          {activity.status}
        </span>
      </p>
      <p className="mb-2">
        <strong>Date : </strong> {activity.date}
      </p>
      {session?.user?.role === "admin" ? (
        <div>
          <ApproveActivity activity={activity} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

async function getDetailActivity(params: string) {
  const res = await fetch(`http://localhost:3000/api/activities/${params}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default ActivityInfo;
