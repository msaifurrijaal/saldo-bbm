import CardHome from "@/components/elements/card/card-home";
import { CardSkeleton } from "@/components/elements/skeleton/skeletons";
import {
  ClockIcon,
  MapIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <main>
      <h1 className=" mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardHome title="Drivers" value="100" icon={UserGroupIcon} />
          <CardHome title="Cars" value="100" icon={TruckIcon} />
          <CardHome title="Activity" value="15" icon={MapIcon} />
          <CardHome title="Pending" value="100" icon={ClockIcon} />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
