"use client";
import React, { useState } from "react";
import loginSVG from "../../../public/loginSVG.svg";
import TaskSVG from "../../../public/addTaskSVG.svg";
import Image from "next/image";
import { toast } from "react-toastify";

const Demo = () => {
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("pending");

  const formData = {
    title: title,
    content: content,
    status: status,
    userId: "65fc5e2e4bbbc6157a131b50",
  };
  const handleForm = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      setLoad(true);
      const res = await fetch("/api/Tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      toast.success("your task is added", { position: "top-center" });
      setTitle("");
      setContent("");
      setStatus("");
      setLoad(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Error on adding task", { position: "top-center" });
      setLoad(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    setStatus("");
  };
  return (
    <main className=" flex flex-col py-10 px-6 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      <div className="max-w-lg mx-auto py-3 gap-3">
        <div className="block sm:hidden">
          <Image src={loginSVG} width={200} alt="loginsvg" priority={true} />
        </div>
        <div className="hidden sm:block">
          <Image src={TaskSVG} width={300} alt="tasksvg" priority={true} />
        </div>
        <h1 className="text-2xl mt-4">Add your task here!!</h1>
      </div>
      <div>
        <form onSubmit={handleForm} className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg ">
            <input
              type="text"
              placeholder="Enter your task name"
              id="task_title"
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="flex flex-col justify-between  mx-auto w-full  max-w-lg ">
            <textarea
              type="text"
              placeholder="write content here!!"
              id="task_content"
              cols={2}
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="flex flex-col justify-between mx-auto w-full max-w-lg">
            <select
              className="rounded px-3 py-2 focus:outline-none w-full bg-transparent border border-black"
              placeholder="select the status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="none" disabled className="bg-gray-600 text-black">
                ---select status---
              </option>
              <option value="pending" className="bg-gray-600 text-black">
                pending
              </option>
              <option value="completed" className="bg-gray-600 text-black">
                completed
              </option>
            </select>
          </div>
          <div className="flex gap-3 justify-center mt-2 text-white">
            <button className="bg-blue-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase">
              {load ? "loading..." : "add Task"}
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 cursor-pointer px-3 py-2 rounded-lg hover:opacity-80 uppercase"
            >
              reset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Demo;
