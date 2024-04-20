"use client";
import Button from "@/components/elements/button";
import InputForm from "@/components/elements/input/InputForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeAdmin, setShowCodeAdmin] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (showCodeAdmin) {
      if (e.target.unique_code.value === "stok_bbm") {
        setIsLoading(true);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: "admin",
          }),
        });
        const data = await res.json();
        if (res.status === 201) {
          e.target.reset();
          setIsLoading(false);
          push("/login");
        } else {
          setIsLoading(false);
          setError(
            data.message ? data.message : "Failed to register an account"
          );
        }
      } else {
        setError("Wrong unique code");
      }
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: e.target.fullname.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        e.target.reset();
        setIsLoading(false);
        push("/login");
      } else {
        setIsLoading(false);
        setError(data.message ? data.message : "Failed to register an account");
      }
    }
  };

  return (
    <div className="h-screen w-100 flex justify-center items-center flex-col">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg w-96 p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl font-medium text-gray-900 ">
            Sign up to our platform
          </h3>
          <InputForm
            id="fullname"
            title="Your fullname"
            type="text"
            placeholder="John Doe"
            required={true}
          />
          <InputForm
            id="email"
            title="Your email"
            type="email"
            placeholder="name@company.com"
            required={true}
          />
          <InputForm
            id="password"
            title="Your password"
            type="password"
            placeholder="*****"
            required={true}
          />
          {showCodeAdmin && (
            <InputForm
              id="unique_code"
              title="Unique code for admin"
              type="password"
              placeholder="*****"
              required={true}
            />
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading...." : "Login to your account"}
          </Button>
          <div className="text-sm font-medium text-gray-500">
            Have registered?{" "}
            <Link href="/login" className="text-blue-700 hover:underline">
              Sign in here
            </Link>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {showCodeAdmin ? "Register for driver? " : "Register for admin? "}
            <button
              type="button"
              onClick={() => setShowCodeAdmin((prev) => !prev)}
              className="text-blue-700 hover:underline"
            >
              Register here
            </button>
          </div>
        </form>
        {error !== "" && (
          <div className="text-red-600 mt-3 text-sm text-center">* {error}</div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
