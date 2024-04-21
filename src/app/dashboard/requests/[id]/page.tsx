import RequestInfo from "@/components/fragments/requests/request-info";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailRequest = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <h1 className=" mb-8 text-xl md:text-2xl font-semibold">
        Detail Request
      </h1>
      <Suspense fallback={<Skeleton height="220px" className="w-full" />}>
        <RequestInfo requestId={params.id} />
      </Suspense>
    </main>
  );
};

export default DetailRequest;
