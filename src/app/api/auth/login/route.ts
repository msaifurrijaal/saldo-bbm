import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        {
          status: 401,
        }
      );
    }

    const token = generateToken(user.id);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token: token,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
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
