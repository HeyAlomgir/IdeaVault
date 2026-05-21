"use client";
import Link from "next/link";
import Image from "next/image"; // Next.js Image ইমপোর্ট
import { Card, CardHeader, Button, Chip } from "@heroui/react";
import { FaArrowRight, FaUserAlt, FaDollarSign } from "react-icons/fa";

const IdyaCard = ({ idya }) => {
  const { _id, ideaTitle, category, shortDescription, targetAudience, estimatedBudget, tags, imageUrl } = idya;

  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between bg-white rounded-2xl p-2 group overflow-hidden">

      <div className="relative w-full h-99 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || "https://unsplash.com"}
          alt={ideaTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 z-10">
          <Chip size="sm" color="primary" variant="solid" className="font-bold text-[10px] uppercase shadow-sm">
            {category || "Tech"}
          </Chip>
        </div>
      </div>

      <CardHeader className="flex flex-col items-start gap-1 pt-3 px-3">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
          {ideaTitle}
        </h3>
      </CardHeader>

      <div className="py-1 px-3 text-gray-500 text-xs md:text-sm font-medium leading-relaxed flex-grow">
        <p className="line-clamp-2 mb-3 text-gray-500">{shortDescription}</p>

        {tags && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.split(",").map((tag, index) => (
              <span key={index} className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}


        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
          <div className="flex items-center gap-1">
            <FaUserAlt className="text-[10px] text-slate-400" />
            <span>Target: <strong className="text-slate-700 font-bold">{targetAudience}</strong></span>
          </div>
          <div className="text-right flex items-center justify-end gap-0.5">
            <FaDollarSign className="text-[10px] text-green-500" />
            <span>Budget: <strong className="text-green-600 font-bold">{estimatedBudget || "N/A"}</strong></span>
          </div>
        </div>
      </div>


      <div className="pt-2 pb-2 px-3 flex items-center justify-end border-t border-gray-50/50 mt-2">
        <Link href={`/ideas/${_id}`}>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="font-bold rounded-md text-xs px-4 gap-1.5 w-full sm:w-auto bg-blue-600 text-white skew-3"
          >
            View Details <FaArrowRight className="text-[10px]" />
          </Button>
        </Link>
      </div>

    </Card>
  );
};

export default IdyaCard;
