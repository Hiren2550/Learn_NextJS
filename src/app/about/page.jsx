import Image from "next/image";
import AboutImage from "../../../public/About.jpg";
export const metadata = {
  title: "About : work manager",
};

export default async function About() {
  return (
    <main className="min-h-screen flex flex-col p-10  gap-3 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      <h1 className="text-center text-2xl sm:text-4xl ">
        Welcome to About page
      </h1>
      <Image src={AboutImage} width={1000} height={1000} />
    </main>
  );
}
