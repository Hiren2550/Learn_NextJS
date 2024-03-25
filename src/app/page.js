import Image from "next/image";
import homeImage from "../../public/Dream.jpg";

export const metadata = {
  title: "Home : work manager",
};
export default function Home() {
  return (
    <main
      className={`bg-gradient-to-b from-gray-500 to-gray-700 min-h-screen flex flex-col items-center gap-3 p-10  text-white`}
    >
      <h1 className="text-center text-2xl sm:text-4xl ">
        Welcome to Home page
      </h1>
      <Image src={homeImage} width={1000} height={1000} />
    </main>
  );
}
