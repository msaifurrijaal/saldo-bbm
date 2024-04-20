"use client";
import Search from "@/components/elements/search/search";
import TableDrivers from "@/components/fragments/drivers/table-drivers";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [textInput, setTextInput] = useState("");
  const [drivers, setDrivers] = useState<User[]>([]);
  const [driversFilter, setDriversFilter] = useState<User[]>(drivers);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDriversFilter(drivers);
  }, [drivers]);

  useEffect(() => {
    let filteredProducts: User[] = [];

    filteredProducts = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(textInput.toLowerCase())
    );

    setDriversFilter(filteredProducts);
  }, [textInput]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/drivers");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setDrivers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <main>
      <h1 className=" mb-4 text-xl md:text-2xl">Drivers</h1>
      <Search value={textInput} setTextInput={setTextInput} />
      <TableDrivers driversData={driversFilter} isLoading={isLoading} />
    </main>
  );
};

export default Page;
