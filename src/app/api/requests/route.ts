import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");

    if (user_id) {
      const requests = await prisma.request.findMany({
        where: {
          userId: Number(user_id),
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "List of Requests for user_id: " + user_id,
          data: requests,
        },
        {
          status: 200,
        }
      );
    } else {
      const requests = await prisma.request.findMany();

      return NextResponse.json(
        {
          success: true,
          message: "List of All Requests",
          data: requests,
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
    const { userId, carId, fuelAmount, date, status } = await req.json();

    const newRequest = await prisma.request.create({
      data: {
        userId: Number(userId),
        carId: Number(carId),
        fuelAmount: Number(fuelAmount),
        date,
        status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Request created successfully",
        data: newRequest,
      },
      { status: 201 }
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
