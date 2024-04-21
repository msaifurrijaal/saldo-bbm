import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");

    if (user_id) {
      const activities: Activity[] = await prisma.activity.findMany({
        where: {
          userId: Number(user_id),
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "List of Activities for user_id: " + user_id,
          data: activities,
        },
        {
          status: 200,
        }
      );
    } else {
      const activities: Activity[] = await prisma.activity.findMany();

      return NextResponse.json(
        {
          success: true,
          message: "List of All Activities",
          data: activities,
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
      userId,
      carId,
      startLocation,
      endLocation,
      distance,
      status,
      date,
    } = await req.json();

    const newActivity = await prisma.activity.create({
      data: {
        userId: Number(userId),
        carId: Number(carId),
        startLocation,
        endLocation,
        distance: Number(distance),
        status,
        date,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Activity created successfully",
        data: newActivity,
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
