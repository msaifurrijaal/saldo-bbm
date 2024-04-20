"use client";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TableDriversProps = {
  driversData: User[];
  isLoading: boolean;
};

const TableDrivers = ({ driversData, isLoading }: TableDriversProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 8;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = driversData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(driversData.length / recordPerPage);
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
        <div>
          <table className="table-auto w-full mt-4 md:mt-8 ">
            <thead>
              <tr>
                <th className="text-start border-b border-slate-300 py-2">
                  No
                </th>
                <th className="border-b border-slate-300 px-4 py-2">Nama</th>
                <th className="border-b border-slate-300 px-4 py-2">Email</th>
                <th className="text-end border-b border-slate-300 py-2">
                  Posisi
                </th>
              </tr>
            </thead>
            <tbody>
              {driversData.map((driver: User, index) => (
                <tr key={driver.id}>
                  <td className="pe-4 py-4 text-start">{index + 1}</td>
                  <td className="p-4 text-center">{driver.name}</td>
                  <td className="p-4 text-center">{driver.email}</td>
                  <td className="ps-4 py-4 text-end">Driver</td>
                </tr>
              ))}
            </tbody>
          </table>
          {driversData && driversData.length > 0 && (
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

export default TableDrivers;
