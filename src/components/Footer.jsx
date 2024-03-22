"use client";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const link = [
    {
      id: 1,
      link: "http://linkedin.com",
      name: <FaLinkedin size={30} className="text-blue-700 bg-white" />,
    },
    {
      id: 2,
      link: "http://youtube.com",
      name: <FaYoutube size={30} className="text-red-700" />,
    },
    {
      id: 3,
      link: "http://github.com",
      name: <FaGithub size={30} />,
    },
    {
      id: 4,
      link: "http://instagram.com",
      name: <FaInstagram size={30} className="text-pink-800" />,
    },
  ];
  return (
    <footer className="flex flex-col sm:flex-row gap-4 justify-around items-center bg-black text-white h-auto sm:h-40 px-5 py-3">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-md sm:text-3xl text-center">
          Welcome to work manager
        </h1>
        <p className="text-xs sm:text-xl text-center">
          This is website for manager who want to add and show tasks
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-md sm:text-3xl text-center">Important links</h1>
        <ul className="flex gap-5">
          {link.map(({ id, name, link }) => (
            <li key={id} className="hover:scale-110">
              <Link href={`${link}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
