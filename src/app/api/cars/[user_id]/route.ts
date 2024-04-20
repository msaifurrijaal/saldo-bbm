import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const userId = parseInt(urlParts[urlParts.length - 1]);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const cars = await prisma.car.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "List of Cars Data for User",
        data: cars,
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
