"use client";
import Search from "@/components/elements/search/search";
import React, { useEffect, useState } from "react";
import TableCars from "./table-cars";
import Link from "next/link";

const AdminListCars = () => {
  const [textInput, setTextInput] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [carsFilters, setCarsFilters] = useState<Car[]>(cars);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCarsFilters(cars);
  }, [cars]);

  useEffect(() => {
    let filteredCars: Car[] = [];

    filteredCars = cars.filter((car) =>
      car.brand.toLowerCase().includes(textInput.toLowerCase())
    );

    setCarsFilters(filteredCars);
  }, [textInput]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/cars");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCars(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-medium mb-4">List all cars</h1>
      <div className="flex items-center">
        <Search value={textInput} setTextInput={setTextInput} />
        <div className="w-1/12 ps-2">
          <Link
            href=""
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-[8px] sm:text-sm px-4 py-2 w-full"
          >
            + Car
          </Link>
        </div>
      </div>
      <TableCars carsData={carsFilters} isLoading={isLoading} />
    </div>
  );
};

export default AdminListCars;
