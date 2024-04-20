import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Rahman Solihin",
        email: "rahman@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Roni Hermanto",
        email: "roni@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Angga Tejo",
        email: "angga@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    ],
  });

  await prisma.car.createMany({
    data: [
      {
        licensePlate: "AB 1234 CD",
        brand: "Toyota",
        type: "MB Barang",
        initialBalance: 10,
        currentBalance: 10,
        fuelUsage: 0,
        fuelConsumption: 15,
        userId: 2,
      },
      {
        licensePlate: "CD 5678 EF",
        brand: "Honda",
        type: "MB Barang",
        initialBalance: 15,
        currentBalance: 15,
        fuelUsage: 0,
        fuelConsumption: 15,
        userId: 3,
      },
      {
        licensePlate: "N 8291 OR",
        brand: "Nissan",
        type: "MB Transport",
        initialBalance: 15,
        currentBalance: 15,
        fuelUsage: 0,
        fuelConsumption: 10,
        userId: 4,
      },
      {
        licensePlate: "N 9862 GA",
        brand: "Suzuki",
        type: "MB Barang",
        initialBalance: 20,
        currentBalance: 20,
        fuelUsage: 0,
        fuelConsumption: 18,
        userId: 5,
      },
    ],
  });

  await prisma.activity.createMany({
    data: [
      {
        userId: 2,
        carId: 1,
        startLocation: "Malang",
        endLocation: "Blitar",
        distance: 60,
        status: "approve",
        date: "20 Maret 2024",
      },
      {
        userId: 3,
        carId: 2,
        startLocation: "Malang",
        endLocation: "Pasuruan",
        distance: 50,
        status: "pending",
        date: "21 April 2024",
      },
      {
        userId: 4,
        carId: 3,
        startLocation: "Kediri",
        endLocation: "Malang",
        distance: 60,
        status: "pending",
        date: "18 April 2024",
      },
      {
        userId: 5,
        carId: 4,
        startLocation: "Sidoarjo",
        endLocation: "Surabaya",
        distance: 40,
        status: "pending",
        date: "19 April 2024",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
