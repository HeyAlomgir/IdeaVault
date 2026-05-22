
import { Button } from "@heroui/react";
import Link from "next/link";

import { FaArrowRight, FaFire } from "react-icons/fa";
import IdyaCard from "./IdyaCard";


const TrendigIdeas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas`)
    const trendigIdyas = await res.json();
    return (
        <div className="mt-10 container mx-auto">

            {/* title */}
            <div className="flex m-4  justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs tracking-wider uppercase mb-1">
                        <FaFire className="text-orange-500 animate-pulse" /> Hot Concepts
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight ">
                        Trending Startup Ideas
                    </h2>
                </div>
                <Link href={"/ideas"}>
                    <Button
                        variant="light"
                        color="primary"
                        className="font-bold gap-2 p-5 min-w-0 bg-blue-600  text-white text-xs  rounded-md shadow-2xl "
                    >
                        View All Ideas <FaArrowRight className="text-[10px]" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {trendigIdyas.map(trending => <IdyaCard key={trending._id} idya={trending}></IdyaCard>)}
            </div>




        </div>
    );
};

export default TrendigIdeas;