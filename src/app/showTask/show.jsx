"use client";
import React, { useEffect, useState } from "react";

const Show = () => {
  //console.log("show page");
  const [laod, setLoad] = useState(false);
  const [TaskData, setTaskData] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoad(true);
        const res = await fetch("/api/Tasks");
        const data = await res.json();
        //console.log(data);
        setTaskData(data);
        setLoad(false);
      } catch (error) {
        console.log(error.message);
        setLoad(false);
      }
    };
    fetchingData();
  }, []);
  return (
    <main className="min-h-screen flex flex-col py-10 px-4 bg-gradient-to-b from-gray-500 to-gray-700 text-white">
      {laod && (
        <div>
          <h1 className="text-red-600 text-3xl">Loading</h1>
        </div>
      )}
      <div className="flex gap-3 flex-wrap">
        {TaskData.map((Task) => (
          <div
            key={Task._id}
            className="bg-gray-300 text-black p-3 rounded-lg w-full max-w-sm"
          >
            <h1>Task is to {Task.title}</h1>
            <p>{Task._id}</p>
            <p>description{Task.content}</p>
            <p> status: {Task.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Show;
