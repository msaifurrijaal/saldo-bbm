"use client";
import Search from "@/components/elements/search/search";
import React, { useEffect, useState } from "react";
import TableCars from "./table-cars";

const DriverListCars = ({ userId }: { userId: number }) => {
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
      const response = await fetch(`/api/cars/${userId}`);
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
      <h1 className="text-xl font-medium mb-4">List your cars</h1>
      <Search value={textInput} setTextInput={setTextInput} />
      <TableCars carsData={carsFilters} isLoading={isLoading} />
    </div>
  );
};

export default DriverListCars;
