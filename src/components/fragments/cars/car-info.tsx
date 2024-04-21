import React from "react";

const CarInfo = async ({ carId }: { carId: string }) => {
  const data = await getDetailCar(carId);
  const car: Car = data.data;
  return (
    <div>
      <p className="mb-2">
        <strong>User ID : </strong> {car.userId}
      </p>
      <p className="mb-2">
        <strong>License Plate : </strong> {car.licensePlate}
      </p>
      <p className="mb-2">
        <strong>Brand : </strong> {car.brand}
      </p>
      <p className="mb-2">
        <strong>Type : </strong> {car.type}
      </p>
      <p className="mb-2">
        <strong>Initial Balance : </strong> {car.initialBalance} L
      </p>
      <p className="mb-2">
        <strong>Current Balance : </strong> {car.currentBalance.toFixed(1)} L
      </p>
      <p className="mb-2">
        <strong>Fuel Usage : </strong> {car.fuelUsage.toFixed(1)} L
      </p>
      <p className="mb-2">
        <strong>Fuel Consumption : </strong> {car.fuelConsumption} L
      </p>
    </div>
  );
};

async function getDetailCar(params: string) {
  const res = await fetch(`http://localhost:3000/api/cars/${params}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default CarInfo;
