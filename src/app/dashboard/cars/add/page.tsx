"use client";
import Button from "@/components/elements/button";
import InputForm from "@/components/elements/input/InputForm";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddCar = () => {
  const { push } = useRouter();
  const [drivers, setDrivers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [driverChoice, setDriverChoice] = useState<User>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showProgramMenu, setShowProgramMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (driverChoice) {
      setErrorMessage("");
      setSubmitError("");
      setSubmitLoading(true);
      const res = await fetch("/api/cars", {
        method: "POST",
        body: JSON.stringify({
          licensePlate: e.target.licensePlate.value,
          brand: e.target.brand.value,
          type: e.target.type.value,
          initialBalance: Number(e.target.initialBalance.value),
          currentBalance: Number(e.target.currentBalance.value),
          fuelUsage: 0,
          fuelConsumption: Number(e.target.fuelConsumption.value),
          userId: driverChoice.id,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        e.target.reset();
        setSubmitLoading(false);
        push("/dashboard/cars");
      } else {
        setSubmitLoading(false);
        setSubmitError(data.message ? data.message : "Failed to add new car");
      }
    } else {
      setErrorMessage("Please choose driver!");
    }
  };

  return (
    <main>
      {isLoading ? (
        <Skeleton height="420px" className="w-full" />
      ) : (
        <>
          <h1 className=" mb-4 text-xl md:text-2xl font-semibold">Add Car</h1>
          <div className="w-full">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="text-xl text-gray-900 ">
                Please fill in vehicle data
              </h3>
              <div className="w-full flex flex-wrap mt-2">
                <div className="w-full md:w-1/2 md:pe-2">
                  <InputForm
                    id="brand"
                    title="Brand Name"
                    type="text"
                    placeholder="Toyota etc.."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:ps-2">
                  <InputForm
                    id="type"
                    title="Type Car"
                    type="text"
                    placeholder="MB Barang etc..."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pe-2 mt-4">
                  <InputForm
                    id="licensePlate"
                    title="Plat Number"
                    type="text"
                    placeholder="N 1234 ED..."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:ps-2 mt-4">
                  <InputForm
                    id="initialBalance"
                    title="Initial Balance"
                    type="number"
                    placeholder="12.."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pe-2 mt-4">
                  <InputForm
                    id="currentBalance"
                    title="Current Balance"
                    type="number"
                    placeholder="10.."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:ps-2 mt-4">
                  <InputForm
                    id="fuelConsumption"
                    title="Fuel Consumption"
                    type="number"
                    placeholder="15.."
                    required={true}
                  />
                </div>
                <div className="select-program flex relative">
                  <div
                    className="header flex items-center justify-between border px-4 py-3 mt-4 rounded-2xl w-[360px] max-w-[360px] cursor-pointer"
                    onClick={() => {
                      setShowProgramMenu(!showProgramMenu);
                    }}
                  >
                    <span>
                      {driverChoice ? driverChoice.name : "Choose Driver"}
                    </span>
                    {showProgramMenu ? (
                      <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <div
                    className={`menu max-w-[360px] max-h-40 overflow-hidden absolute top-[110%] left-0 right-0 bg-white rounded-xl shadow-[0_0_20px_-2px_rgb(0,0,0,.1)] ${
                      showProgramMenu ? "block" : "hidden"
                    } z-10 overflow-y-scroll`}
                  >
                    {drivers.map((driver, index) => {
                      return (
                        <div
                          className="option cursor-pointer px-4 py-2 hover:bg-[rgb(0,0,0,.1)]"
                          key={index}
                          onClick={() => {
                            setDriverChoice(driver);
                            setShowProgramMenu((prev) => !prev);
                          }}
                        >
                          {driver.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full mt-2">
                  {errorMessage && (
                    <p className="text-red-500 text-sm">* {errorMessage}</p>
                  )}
                </div>

                <div className="w-full flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
                  >
                    {submitLoading ? "Loading...." : "Submit"}
                  </Button>
                </div>
                <div className="w-full flex justify-end mt-3">
                  {submitError && (
                    <p className="text-red-500 text-sm">* {submitError}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default AddCar;
