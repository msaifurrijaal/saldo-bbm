import ActivityInfo from "@/components/fragments/activities/activity-info";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailActivity = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <h1 className=" mb-8 text-xl md:text-2xl font-semibold">
        Detail Activity
      </h1>
      <Suspense fallback={<Skeleton height="220px" className="w-full" />}>
        <ActivityInfo activityId={params.id} />
      </Suspense>
    </main>
  );
};

export default DetailActivity;
