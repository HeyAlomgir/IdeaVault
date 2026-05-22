"use client";
import React, { useState, useEffect } from "react";
import Link from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaRegComment, FaArrowRight, FaHistory } from "react-icons/fa";

const MyInteractionsPage = () => {
    const { data: session } = authClient.useSession();
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          document.title = "My Interactions | IdeaVault";
        const realEmail = session?.user?.email;
        if (!realEmail) return;

        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments?email=${realEmail}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setInteractions(data);
                } else {
                    setInteractions([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [session])
    if (!session) {
        return <p className="text-center py-20 font-bold text-sm text-red-500">Please login to view your interactions.</p>;
    }

    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-screen text-slate-800">

            <div className="mb-8 border-b border-gray-50 pb-4">
                <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 select-none">
                    <FaHistory className="text-blue-600 text-lg" /> My Interactions ({interactions.length})
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track and review all startup concepts where you have contributed public validation feedback.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20 font-bold text-blue-600 animate-pulse text-xs">Compiling your activity logs...</div>
            ) : interactions.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    <p className="text-gray-400 text-xs font-semibold">You haven&apos;t commented on any startup ideas yet.</p>
                    <a href="/ideas" className="text-blue-600 font-bold text-xs hover:underline mt-2 inline-block">Explore ideas to start validating &rarr;</a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interactions.map((item) => (
                        <div key={item._id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-2xl p-5 flex flex-col justify-between h-full group">

                            {/* কন্টেন্ট হেডার */}
                            <div className="space-y-1">
                                <span className="inline-block text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    Activity Log
                                </span>
                                <span className="text-[9px] text-gray-400 font-bold block pt-1">
                                    Date: {item.timestamp || "Just now"}
                                </span>
                            </div>

                            <div className="my-4 p-3 bg-gray-50 rounded-xl border border-gray-100/70 relative">
                                <div className="absolute -top-2 left-3 bg-white px-1.5 text-[9px] font-bold text-gray-400 flex items-center gap-1">
                                    <FaRegComment size={8} /> My Feedback
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3 pt-1">
                                    &ldquo;{item.commentText}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyInteractionsPage;
