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

    const request = await prisma.request.findUnique({
      where: { id: Number(id) },
    });

    if (!request) {
      return NextResponse.json(
        {
          success: false,
          message: "Request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Request found",
        data: request,
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

    const request = await prisma.request.findUnique({
      where: { id: id },
    });

    const car = await prisma.car.findUnique({
      where: { id: request.carId },
    });

    const updatedCar = await prisma.car.update({
      where: { id: car.id },
      data: {
        currentBalance: car.currentBalance + request.fuelAmount,
      },
    });

    const updatedRequest = await prisma.request.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Request status updated successfully",
        data: updatedRequest,
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
