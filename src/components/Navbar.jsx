"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { userContext } from "@/context/userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useContext(userContext);
  const router = useRouter();

  if (user) {
    //console.log(user);
  }
  const logOut = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === true) {
        router.refresh();
        toast.success("log out successfully");
      }
    } catch (error) {
      toast.error("Error in log out");
    }
  };

  return (
    <nav className="flex justify-between items-center bg-black text-white h-20 px-5 py-3">
      <div className="flex items-center gap-2">
        <Link href="/">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465_640.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        {user ? (
          <h1 className="text-3xl font-semibold">{user.name}</h1>
        ) : (
          <h1 className="text-3xl font-semibold">User</h1>
        )}
      </div>
      {user && (
        <div className="hidden lg:flex">
          <ul className="flex gap-5">
            <Link href="/">
              <li className="capitalize cursor-pointer hover:underline hover:scale-105">
                home
              </li>
            </Link>
            <Link href="/addTask">
              <li className="capitalize cursor-pointer hover:underline hover:scale-105">
                Add Tasks
              </li>
            </Link>
            <Link href="/showTask">
              <li className="capitalize cursor-pointer hover:underline hover:scale-105">
                show tasks
              </li>
            </Link>
            <Link href="/about">
              <li className="capitalize cursor-pointer hover:underline hover:scale-105">
                about
              </li>
            </Link>
          </ul>
        </div>
      )}

      <div>
        {!user && (
          <ul className="flex items-center gap-3 justify-between">
            <li>
              <Link
                href={"/login"}
                className="bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase"
              >
                login
              </Link>
            </li>
            <li>
              <Link
                href={"/signUp"}
                className="bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase"
              >
                SignUp
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <div>
            <form className="flex items-center gap-2 text-white">
              <input
                type="text"
                placeholder="Search..."
                name="searchbox"
                className="w-40 px-2 py-1 rounded-lg focus:outline-none border border-gray-500 bg-transparent"
              />
              <button className="bg-green-600 cursor-pointer px-2 py-1 rounded-lg hover:opacity-80">
                Search
              </button>
              <button
                className="bg-blue-600 cursor-pointer px-2 py-1 rounded-lg hover:opacity-80"
                onClick={logOut}
              >
                log Out
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
