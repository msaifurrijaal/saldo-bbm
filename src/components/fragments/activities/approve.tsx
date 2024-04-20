"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Approve = ({ activity }: { activity: Activity }) => {
  const router = useRouter();
  const [errorApprove, setErrorApprove] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const approveActivity = async (activityId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) {
        setIsLoading(false);
        setErrorApprove("Failed to approve activity");
      }
      router.push("/dashboard/activities");
    } catch (error) {
      setErrorApprove("Error: " + error);
    }
  };
  return (
    <div>
      <button
        onClick={() => approveActivity(activity.id)}
        disabled={activity.status !== "pending"}
        className={
          activity.status === "pending"
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
            : "text-white bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
        }
      >
        {isLoading ? "Loading..." : "Approve"}
      </button>
      {errorApprove && (
        <p className="mt-2 text-sm text-red-500">* {errorApprove}</p>
      )}
    </div>
  );
};

export default Approve;
