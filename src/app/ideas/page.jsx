
"use client";
import React, { useEffect, useState } from "react";
import IdyaCard from "@/components/IdyaCard";
import { FaSearch } from "react-icons/fa";

const IdeaPage = () => {
    const [idyas, setIdyas] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading,setLoading]=useState(true)

    const categories = ["Tech", "Health", "AI", "Education", "FinTech", "AgriTech"];

    useEffect(() => {
        document.title = "Explore Ideas | IdeaVault";
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idya`)
            .then((res) => res.json())
            .then((data) => {
                setIdyas(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    const filteredIdeas = idyas.filter((idya) => {
        const matchesSearch = !search || idya.ideaTitle?.toLowerCase().includes(search.toLowerCase());
    
        const ideaCat = idya.category ? idya.category.trim().toLowerCase() : "";
        const selectedCat = category ? category.trim().toLowerCase() : "";
        const matchesCategory = selectedCat === "" || ideaCat === selectedCat;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh] text-slate-800">
            <div className="mb-6">
                <h1 className="text-xl font-black text-slate-900 mb-1">All Startup Ideas</h1>
                <p className="text-xs text-gray-400">Discover and search across all categories inside the vault.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100 max-w-4xl shadow-sm">
                <div className="w-full relative flex items-center">
                    <FaSearch className="absolute left-3 text-gray-400 text-xs" />
                    <input
                        type="text"
                        placeholder="Search by idea title..."
                        className="w-full h-10 bg-white border border-gray-200 rounded-xl pl-9 pr-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm placeholder:text-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="w-full sm:w-64">
                    <select
                        className="w-full h-10 bg-white border border-gray-200 rounded-xl px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-xs font-bold text-blue-600 animate-pulse py-12">Loading vault database...</p>
            ) : filteredIdeas.length === 0 ? (
                <p className="text-gray-400 font-semibold text-xs text-center py-16 w-full col-span-full">
                    No startup ideas found matching your search.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIdeas.map((idya) => (
                        <IdyaCard key={idya._id} idya={idya} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IdeaPage;
