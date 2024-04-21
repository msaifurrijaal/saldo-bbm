"use client";
import Button from "@/components/elements/button";
import InputForm from "@/components/elements/input/InputForm";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddActivity = () => {
  const { data: session } = useSession();
  const user: any = session?.user;
  const { push } = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [carChoice, setCarChoice] = useState<Car>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showProgramMenu, setShowProgramMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const queryParams = user.id ? `?user_id=${user.id}` : "";
        const response = await fetch(`/api/cars/${queryParams}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCars(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (carChoice) {
      setErrorMessage("");
      setSubmitError("");
      setSubmitLoading(true);
      const res = await fetch("/api/activities", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          carId: carChoice.id,
          startLocation: e.target.startLocation.value,
          endLocation: e.target.endLocation.value,
          distance: Number(e.target.distance.value),
          status: "pending",
          date: e.target.date.value,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      console.log("sudah disini");
      if (res.status === 201) {
        e.target.reset();
        setSubmitLoading(false);
        push("/dashboard/activities");
      } else {
        setSubmitLoading(false);
        setSubmitError(
          data.message ? data.message : "Failed to add new activity"
        );
      }
    } else {
      setErrorMessage("Please choose car!");
    }
  };

  return (
    <main>
      {isLoading ? (
        <Skeleton height="420px" className="w-full" />
      ) : (
        <div>
          <h1 className=" mb-4 text-xl md:text-2xl font-semibold">
            Add Activity
          </h1>
          <div className="w-full">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="text-xl text-gray-900 ">
                Please fill in activity data
              </h3>
              <div className="w-full flex flex-wrap mt-2">
                <div className="w-full md:w-1/2 md:pe-2">
                  <InputForm
                    id="startLocation"
                    title="Start Location"
                    type="text"
                    placeholder="Malang..."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:ps-2">
                  <InputForm
                    id="endLocation"
                    title="End Location"
                    type="text"
                    placeholder="Surabaya..."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pe-2 mt-4">
                  <InputForm
                    id="distance"
                    title="Distance (Km)"
                    type="number"
                    placeholder="60.."
                    required={true}
                  />
                </div>
                <div className="w-full md:w-1/2 md:ps-2 mt-4">
                  <InputForm
                    id="date"
                    title="Date"
                    type="date"
                    placeholder="12 Sep 2023"
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
                    <span>{carChoice ? carChoice.brand : "Choose Car"}</span>
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
                    {cars.map((car, index) => {
                      return (
                        <div
                          className="option cursor-pointer px-4 py-2 hover:bg-[rgb(0,0,0,.1)]"
                          key={index}
                          onClick={() => {
                            setCarChoice(car);
                            setShowProgramMenu((prev) => !prev);
                          }}
                        >
                          {car.brand}
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
        </div>
      )}
    </main>
  );
};

export default AddActivity;
