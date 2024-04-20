"use client";
import Button from "@/components/elements/button";
import InputForm from "@/components/elements/input/InputForm";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = ({ searchParams }: any) => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.callbackUrl || "/dashboard";
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callbackUrl,
      });
      if (!res?.error) {
        e.target.reset();
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setError("Email or password invalid");
        }
      }
    } catch (error) {
      console.log();
    }
  };
  return (
    <div className="h-screen w-100 flex justify-center items-center flex-col">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg w-96 p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
          <h3 className="text-xl font-medium text-gray-900">
            Sign in to our platform
          </h3>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading...." : "Login to your account"}
          </Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
        {error !== "" && (
          <div className="text-red-600 mt-3 text-sm text-center">* {error}</div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
