import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");

    if (user_id) {
      const cars = await prisma.car.findMany({
        where: {
          userId: Number(user_id),
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "List of Cars for user_id: " + user_id,
          data: cars,
        },
        {
          status: 200,
        }
      );
    } else {
      const cars = await prisma.car.findMany();

      return NextResponse.json(
        {
          success: true,
          message: "List of All Cars",
          data: cars,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      licensePlate,
      brand,
      type,
      initialBalance,
      currentBalance,
      fuelUsage,
      fuelConsumption,
      userId,
    } = await req.json();

    const newCar = await prisma.car.create({
      data: {
        licensePlate,
        brand,
        type,
        initialBalance,
        currentBalance,
        fuelUsage,
        fuelConsumption,
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Car created successfully",
        data: newCar,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
