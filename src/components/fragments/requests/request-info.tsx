import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import ApproveRequest from "./approve-request";

const RequestInfo = async ({ requestId }: { requestId: string }) => {
  const data = await getDetailRequest(requestId);
  const session: any = await getServerSession(authOptions);
  const request: Request = data.data;

  return (
    <div>
      <p className="mb-2">
        <strong>User ID : </strong> {request.userId}
      </p>
      <p className="mb-2">
        <strong>Car ID : </strong> {request.carId}
      </p>
      <p className="mb-2">
        <strong>Fuel Amount : </strong> {request.fuelAmount}
      </p>
      <p className="mb-2">
        <strong>Status : </strong>{" "}
        <span
          className={`${
            request.status === "pending"
              ? "bg-yellow-200 p-1"
              : "bg-green-200 p-1"
          } rounded-md`}
        >
          {request.status}
        </span>
      </p>
      <p className="mb-2">
        <strong>Date : </strong> {request.date}
      </p>
      {session?.user?.role === "admin" ? (
        <div>
          <ApproveRequest request={request} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

async function getDetailRequest(params: string) {
  const res = await fetch(`http://localhost:3000/api/requests/${params}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default RequestInfo;
