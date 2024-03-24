"use client";
import React, { useState } from "react";
import welcomeSVG from "../../../public/welcomSVG.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LoginComponent() {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log("login");
  const formData = {
    email: email,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.warning("Please enter field", {
        position: "top-center",
        theme: "dark",
      });
    } else {
      try {
        setLoad(true);
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        //console.log(data);
        setLoad(false);
        if (data.success === true) {
          router.push("/profile/user");
          toast.success("logged In");
        } else {
          toast.error(data.message);
          setLoad(false);
        }
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
        setLoad(false);
      }
    }
  };
  return (
    <main className=" flex flex-col py-10 px-6 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      <div className="max-w-lg mx-auto py-3 gap-3">
        <div className="block sm:hidden">
          <Image src={welcomeSVG} width={200} alt="welcome" priority={true} />
        </div>
        <div className="hidden sm:block">
          <Image src={welcomeSVG} width={300} alt="welcome" priority={true} />
        </div>
        <h1 className="text-3xl mt-4 text-center">Log In</h1>
      </div>
      <div>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg ">
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg ">
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex gap-3 mt-2 justify-center text-white">
            <div className="w-full max-w-lg gap-3 flex">
              <input
                type="checkbox"
                name="verify"
                className="w-4 bg-transparent border border-black"
              />
              <p>above details are correct</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center mt-2 text-white">
            <button className="w-full max-w-lg bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase">
              {load ? "loading" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginComponent;
