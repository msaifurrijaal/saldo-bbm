import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TableActivitiesProps = {
  activitiesData: Activity[];
  isLoading: boolean;
  role: string;
};

const TableActivities = ({
  activitiesData,
  isLoading,
  role,
}: TableActivitiesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = activitiesData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(activitiesData.length / recordPerPage);
  const numbers = Array.from({ length: nPage }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (n: number) => {
    setCurrentPage(n);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      {isLoading ? (
        <Skeleton height="220px" className="w-full mt-8" />
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full mt-4 md:mt-8 ">
            <thead>
              <tr>
                <th className="text-start border-b border-slate-300 py-2">
                  No
                </th>
                <th className="border-b border-slate-300 py-2">ID User</th>
                <th className="border-b border-slate-300 py-2">ID Car</th>
                <th className="border-b border-slate-300 py-2">
                  Start Location
                </th>
                <th className="border-b border-slate-300 py-2">End Location</th>
                <th className="border-b border-slate-300 py-2">Distance</th>
                <th className="border-b border-slate-300 py-2">Status</th>
                <th
                  className={`${
                    role && role !== "admin" && "text-end"
                  } border-b border-slate-300 py-2`}
                >
                  Date
                </th>
                {role && role === "admin" && (
                  <th className="text-end border-b border-slate-300 py-2">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {records.map((activity: Activity, index) => (
                <tr key={activity.id}>
                  <td className="pe-4 py-4 text-start">{index + 1}</td>
                  <td className="p-4 text-center">{activity.userId}</td>
                  <td className="p-4 text-center">{activity.carId}</td>
                  <td className="p-4 text-center">{activity.startLocation}</td>
                  <td className="p-4 text-center">{activity.endLocation}</td>
                  <td className="p-4 text-center">{activity.distance}</td>
                  <td className="p-4 text-center">
                    <p
                      className={`p-1 ${
                        activity.status === "pending"
                          ? "bg-yellow-200 rounded-md"
                          : "bg-green-200 rounded-md"
                      }`}
                    >
                      {activity.status}
                    </p>
                  </td>
                  <td
                    className={`${
                      role && role !== "admin"
                        ? "text-end ps-4 py-4"
                        : "p-4 text-center"
                    }`}
                  >
                    {activity.date}
                  </td>
                  {role && role === "admin" && (
                    <td className="ps-4 py-4 text-end">
                      <Link
                        href={`/dashboard/activities/${activity.id}`}
                        className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-md text-white"
                      >
                        Edit
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {activitiesData && activitiesData.length > 0 && (
            <div className="flex justify-center mt-6">
              <div className="flex">
                <button
                  className="py-1 px-2 border rounded-l-md hover:bg-slate-200"
                  onClick={prevPage}
                >
                  Prev
                </button>
                {numbers.map((number, index) => (
                  <button
                    className={`py-1 px-4 border-y ${
                      currentPage === number
                        ? "bg-blue-600 hover:bg-blue-400 text-white"
                        : "hover:bg-slate-200"
                    }`}
                    key={index}
                    onClick={() => changeCurrentPage(number)}
                  >
                    {number}
                  </button>
                ))}
                <button
                  className="py-1 px-2 border rounded-r-md hover:bg-slate-200"
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableActivities;
