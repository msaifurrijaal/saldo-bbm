import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/dashboard/cars",
  "/dashboard/cars/:id",
  "/dashboard/cars/add",
  "/dashboard/activities",
  "/dashboard/activities/:id",
  "/dashboard/activities/add",
  "/dashboard/drivers",
  "/dashboard/requests",
  "/dashboard/requests/:id",
  "/dashboard/requests/add",
  "/login",
  "/register",
]);
