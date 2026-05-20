"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome, FaArrowLeft, FaLightbulb } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-white text-slate-800 px-6 py-12 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
       <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md mx-auto text-center flex flex-col items-center z-10">

        <div className="relative mb-6 select-none">

          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
            4<span className="text-blue-600 animate-pulse">0</span>4
          </h1>
     
          <div className="absolute -top-6 -right-6 bg-amber-100 p-2.5 rounded-2xl border border-amber-200 shadow-sm animate-bounce duration-3000">
            <span className="text-2xl"><FaLightbulb className="text-amber-500"/></span>
          </div>
        </div>

        {/* error msg */}
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-3">
          Idea Lost in Space!
        </h2>

        <p className="text-gray-500 text-xs md:text-sm font-medium mb-8 max-w-sm leading-relaxed">
          The startup concept or page you are looking for doesn&apos;t exist. It might have been moved, deleted, or never pitched to the vault.
        </p>

       
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
         
          
            <Link href={'/'}>
             <Button
              color="primary"
              variant="solid"
              size="md"
              startContent={<FaHome size={14} />}
              className="font-bold px-8 rounded-xl w-full sm:w-auto  shadow-md shadow-blue-500/10 bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm"
            >
              Back to Home
            </Button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
