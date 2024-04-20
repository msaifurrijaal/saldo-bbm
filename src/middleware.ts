import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/dashboard/cars",
  "/dashboard/cars/add",
  "/dashboard/drivers",
  "/login",
  "/register",
]);
