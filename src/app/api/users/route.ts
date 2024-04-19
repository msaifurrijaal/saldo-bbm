import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { verifyToken } from "@/app/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "List Data Users",
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
