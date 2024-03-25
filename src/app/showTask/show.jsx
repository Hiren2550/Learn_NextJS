"use client";
import { userContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

const Show = () => {
  //console.log("show page");
  const [load, setLoad] = useState(true);
  const [Task, setTask] = useState([]);
  const TaskData = [...Task].reverse();
  //console.log(TaskData);

  const context = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoad(true);
        const res = await fetch(`/api/users/${context.user._id}/tasks`);
        const data = await res.json();
        //console.log(data.res);
        setTask(data.res);
        setLoad(false);
      } catch (error) {
        console.log(error.message);
        setLoad(false);
      }
    };
    if (context.user._id) {
      fetchingData();
    }
  }, [context.user]);

  const handleRemoveTask = async (e, id) => {
    //e.preventDefault();
    try {
      const res = await fetch(`/api/Tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      //console.log(data);
      toast.success("Task is deleted");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <main className="min-h-screen flex flex-col py-10 px-4 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      {load && (
        <div>
          <h1 className="text-red-600 text-3xl">Loading</h1>
        </div>
      )}
      {!load && TaskData.length === 0 && (
        <div>
          <h1>No Task is added</h1>
        </div>
      )}
      <div className=" flex flex-col gap-3">
        {TaskData &&
          TaskData.map((task) => (
            <div key={task._id} className="bg-gray-200 text-black p-5 relative">
              <FaDeleteLeft
                size={30}
                className="text-red-700 absolute top-0 right-0 m-3 cursor-pointer"
                onClick={(e) => handleRemoveTask(e, task._id)}
              />
              <h1 className="text-xl">
                <span className=" font-semibold text-blue-700"> Title : </span>
                {task.title}
              </h1>
              <p>
                <span className=" font-semibold text-blue-700">Content : </span>
                {task.content}
              </p>
              <p>
                <span className=" font-semibold text-blue-700">Status : </span>
                {task.status}
              </p>
              <p>
                <span className=" font-semibold text-blue-700">
                  Created Timestamp :{" "}
                </span>
                {task.createdAt}
              </p>
              <p className="float-end ">
                <span className=" font-semibold text-blue-700">
                  Created By :{" "}
                </span>
                {context.user._id}-{context.user.name}
              </p>
            </div>
          ))}
      </div>
      <div className="flex gap-3 flex-wrap"></div>
    </main>
  );
};

export default Show;
