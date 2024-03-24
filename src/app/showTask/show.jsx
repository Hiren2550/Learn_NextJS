"use client";
import { userContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";

const Show = () => {
  //console.log("show page");
  const [laod, setLoad] = useState(false);
  const [TaskData, setTaskData] = useState([]);
  const context = useContext(userContext);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoad(true);
        const res = await fetch(`/api/users/${context.user._id}/tasks`);
        const data = await res.json();
        console.log(data);
        setTaskData(data);
        setLoad(false);
      } catch (error) {
        console.log(error.message);
        setLoad(false);
      }
    };
    if (context.user) {
      fetchingData();
    }
  }, [context.user]);
  return (
    <main className=" flex flex-col py-10 px-4 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      {laod && (
        <div>
          <h1 className="text-red-600 text-3xl">Loading</h1>
        </div>
      )}
      <div className="flex gap-3 flex-wrap"></div>
    </main>
  );
};

export default Show;
