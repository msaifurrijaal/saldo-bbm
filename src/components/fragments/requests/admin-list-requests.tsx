"use client";
import Search from "@/components/elements/search/search";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TableRequests from "./table-requests";

const AdminListRequests = () => {
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
      const response = await fetch("/api/requests");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRequests(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1 className="text-xl font-medium mb-4">List all requests</h1>
      <Search value={textInput} setTextInput={setTextInput} />
      <TableRequests
        isLoading={isLoading}
        requestsData={requestsFilters}
        role={user.role}
      />
    </section>
  );
};

export default AdminListRequests;
