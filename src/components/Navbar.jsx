"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { userContext } from "@/context/userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useContext(userContext);
  const router = useRouter();

  const logOut = async (e) => {
    e.preventDefault();
    localStorage.removeItem("localUser");

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
  const deleteUser = async (e) => {
    e.preventDefault();
    if (user._id) {
      const id = user._id;
      try {
        const res = await fetch(`/api/users/deleteUser/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === true) {
          //console.log(data);
          router.refresh();
          toast.success("User deleted successfully");
        }
      } catch (error) {
        toast.error("error in delete Operation of user");
      }
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
        <h1 className="text-3xl">Work </h1>
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
            <form className="flex items-center gap-3 text-white">
              <h1 className="text-2xl font-semibold text-blue-900">
                {user.email}
              </h1>
              <button
                className="bg-red-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80"
                onClick={deleteUser}
              >
                Delete Account
              </button>
              <button
                className="bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80"
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
