import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1]);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing id parameter" },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.findUnique({
      where: { id: Number(id) },
    });

    if (!activity) {
      return NextResponse.json(
        {
          success: false,
          message: "Activity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Activity found",
        data: activity,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1]);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing id parameter" },
        { status: 400 }
      );
    }

    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Missing status parameter" },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.findUnique({
      where: { id: id },
    });

    const car = await prisma.car.findUnique({
      where: { id: activity.carId },
    });

    const updatedCar = await prisma.car.update({
      where: { id: car.id },
      data: {
        currentBalance:
          car.currentBalance - activity.distance / car.fuelConsumption,
        fuelUsage: car.fuelUsage + activity.distance / car.fuelConsumption,
      },
    });

    const updatedActivity = await prisma.activity.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Activity status updated successfully",
        data: updatedActivity,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
