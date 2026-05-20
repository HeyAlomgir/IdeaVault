"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-white text-slate-800">
      <div className="relative flex items-center justify-center">
 
        <Spinner size="lg" color="primary" />

        <div className="absolute w-16 h-16 bg-blue-500/10 rounded-full animate-ping pointer-events-none" />
      </div>
      
      <div className="text-center flex flex-col gap-1 select-none">
        <p className="text-base font-bold text-slate-800 tracking-tight">
          Loading Vault...
        </p>
        <p className="text-xs font-semibold text-blue-600 animate-pulse tracking-wide">
          Securing connections and fetching latest insights
        </p>
      </div>
    </div>
  );
}
