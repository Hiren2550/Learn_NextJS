"use client";
import React, { useState } from "react";
import welcomeSVG from "../../../public/welcomSVG.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpComponent() {
  //console.log("Sign-up");
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const formData = {
    name: name,
    email: email,
    password: password,
    about: about,
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    //console.log(formData);
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.about.trim() === ""
    ) {
      toast.warning("Please enter valid field", {
        position: "top-center",
      });
    } else {
      try {
        setLoad(true);
        const res = await fetch("/api/users/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setName("");
        setEmail("");
        setPassword("");
        setAbout("");
        setLoad(false);
        if (data.success === true) {
          toast.success("user is registered Successfully");
          router.push("/login");
          setLoad(false);
        } else {
          toast.error(data.message);
          //console.log(data.message)
          setLoad(false);
        }
      } catch (error) {
        //console.log(error);
        toast.error(error.message);
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
        <h1 className="text-3xl mt-4 text-center">Sign Up</h1>
      </div>
      <div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg ">
            <input
              type="text"
              placeholder="Enter your name"
              id="name"
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
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
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg ">
            <textarea
              type="text"
              placeholder="Enter your about"
              id="about"
              cols={2}
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
          </div>

          <div className="flex flex-col gap-3 items-center mt-2 text-white">
            <button className="w-full max-w-lg bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase">
              {load ? "loading" : "Sign Up"}
            </button>
            <p>
              Have an account?
              <Link href="/login">
                <span className="text-blue-500 cursor-pointer m-1">Log In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUpComponent;
