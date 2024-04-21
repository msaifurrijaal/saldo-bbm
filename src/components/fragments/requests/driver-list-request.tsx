"use client";
import Search from "@/components/elements/search/search";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TableRequests from "./table-requests";

const DriverListRequest = ({ userId }: { userId: number }) => {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [textInput, setTextInput] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestsFilters, setRequestsFilters] = useState<Request[]>(requests);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const reversedRequests = [...requests].reverse();
    setRequestsFilters(reversedRequests);
  }, [requests]);

  useEffect(() => {
    let filteredRequests: Request[] = [];

    filteredRequests = requests.filter(
      (request: Request) =>
        request.userId
          .toString()
          .toLowerCase()
          .includes(textInput.toLowerCase()) ||
        request.carId
          .toString()
          .toLowerCase()
          .includes(textInput.toLowerCase()) ||
        request.status.toLowerCase().includes(textInput.toLowerCase()) ||
        request.date.toLowerCase().includes(textInput.toLowerCase())
    );
    const filteredRequestsReversed = [...filteredRequests].reverse();
    setRequestsFilters(filteredRequestsReversed);
  }, [textInput]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const queryParams = userId ? `?user_id=${userId}` : "";

      const response = await fetch(`/api/requests${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setRequests(data.data);
        setRequestsFilters(data.data);
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
      <h1 className="text-xl font-medium mb-4">List your requests</h1>
      <div className="flex items-center">
        <Search value={textInput} setTextInput={setTextInput} />
        <div className="w-1/12 ps-2">
          <Link
            href="/dashboard/requests/add"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-[8px] sm:text-[12px] p-2 w-full"
          >
            + Request
          </Link>
        </div>
      </div>
      <TableRequests
        requestsData={requestsFilters}
        isLoading={isLoading}
        role={user.role}
      />
    </section>
  );
};

export default DriverListRequest;
