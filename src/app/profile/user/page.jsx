"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <main className=" min-h-screen flex flex-col py-10 px-6 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      This is normal user
    </main>
  );
}
