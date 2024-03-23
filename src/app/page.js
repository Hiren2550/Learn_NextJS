import { cookies } from "next/headers";

export const metadata = {
  title: "Home : work manager",
};
export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col items-center justify-between p-10 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      Welcome to Home page
    </main>
  );
}
