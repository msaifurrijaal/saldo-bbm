import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const carId = parseInt(urlParts[urlParts.length - 1]);

    if (!carId) {
      return NextResponse.json(
        { success: false, message: "Missing carId parameter" },
        { status: 400 }
      );
    }

    const car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Car data found",
        data: car,
      },
      {
        status: 200,
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
