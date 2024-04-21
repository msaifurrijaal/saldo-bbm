import CardHome from "@/components/elements/card/card-home";
import { CardSkeleton } from "@/components/elements/skeleton/skeletons";
import TableCars from "@/components/fragments/cars/table-cars";
import {
  MapIcon,
  QueueListIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Page = async () => {
  const drivers = await getDrivers();
  const cars = await getCars();
  const activitites = await getActivities();
  const request = await getRequests();
  return (
    <main>
      <h1 className=" mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardHome
            title="Drivers"
            value={drivers.data.length}
            icon={UserGroupIcon}
          />
          <CardHome title="Cars" value={cars.data.length} icon={TruckIcon} />
          <CardHome
            title="Activity"
            value={activitites.data.length}
            icon={MapIcon}
          />
          <CardHome
            title="Request"
            value={request.data.length}
            icon={QueueListIcon}
          />
        </Suspense>
      </div>
      <div className="w-full mt-6">
        <h3 className="font-medium text-xl">List All Cars</h3>
        <Suspense
          fallback={<Skeleton height="220px" className="w-full mt-8" />}
        >
          <TableCars carsData={cars.data} isLoading={cars.data.length === 0} />
        </Suspense>
      </div>
    </main>
  );
};

async function getDrivers() {
  const res = await fetch("http://localhost:3000/api/drivers", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCars() {
  const res = await fetch("http://localhost:3000/api/cars", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getActivities() {
  const res = await fetch("http://localhost:3000/api/activities", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getRequests() {
  const res = await fetch("http://localhost:3000/api/requests", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default Page;
