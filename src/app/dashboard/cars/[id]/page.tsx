import CarInfo from "@/components/fragments/cars/car-info";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailCar = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <h1 className=" mb-8 text-xl md:text-2xl font-semibold">Detail Car</h1>
      <Suspense fallback={<Skeleton height="220px" className="w-full" />}>
        <CarInfo carId={params.id} />
      </Suspense>
    </main>
  );
};

export default DetailCar;
