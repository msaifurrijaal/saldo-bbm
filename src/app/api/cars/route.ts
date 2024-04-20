import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const cars = await prisma.car.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "List Data Cars",
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
