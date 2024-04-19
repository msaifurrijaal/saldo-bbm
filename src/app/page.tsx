"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
    </main>
  );
}
