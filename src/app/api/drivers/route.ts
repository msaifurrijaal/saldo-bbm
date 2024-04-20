import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "user",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "List of Drivers Data",
        data: users,
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
