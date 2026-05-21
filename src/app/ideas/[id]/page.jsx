import Image from 'next/image';
import { Button, Avatar } from "@heroui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const IdeyaDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/idya/${id}`, { cache: "no-store" });
    const idya = await res.json();
    const { ideaTitle, category, shortDescription, targetAudience, estimatedBudget, tags, imageUrl, problemStatement, proposedSolution } = idya;

    return (
        <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white text-slate-800 min-h-screen'>

            <div className="md:col-span-2 space-y-5">
                <span className="text-[11px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{category}</span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{ideaTitle}</h1>

                <div className="relative w-full h-1/2 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image src={imageUrl || "https://unsplash.com"} fill className="object-cover" alt={ideaTitle} />
                </div>

                <div className="space-y-4 pt-2 text-sm text-gray-600 font-medium leading-relaxed">
                    <p><strong>Target Audience:</strong> {targetAudience}</p>
                    <p><strong>Estimated Budget:</strong> <span className="text-green-600 font-bold">{estimatedBudget || "N/A"}</span></p>
                    <p><strong>Summary:</strong> {shortDescription}</p>
                    <p className="bg-red-50/50 p-4 rounded-xl border border-red-50 text-slate-700"><strong>⚠️ Problem:</strong> {problemStatement}</p>
                    <p className="bg-green-50/50 p-4 rounded-xl border border-green-50 text-slate-700"><strong>✅ Solution:</strong> {proposedSolution}</p>
                </div>
            </div>

            <div className="md:col-span-1 bg-gray-50 p-5 rounded-2xl border border-gray-100 h-fit space-y-5">
                <h3 className="font-black text-slate-900 text-base">Public Discussions</h3>


                <form className="space-y-2.5">
                    <textarea
                        placeholder="Write your feedback..."
                        rows={3}
                        required
                        className="w-full bg-white text-sm font-medium text-slate-800 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors shadow-sm placeholder:text-gray-400"
                    />
                    <Button color="primary" className="w-full font-bold rounded-xl bg-blue-600 text-white text-xs h-10 shadow-sm shadow-blue-500/10">
                        Post Comment
                    </Button>
                </form>


                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar src="https://pravatar.cc" size="sm" className="w-6 h-6" />
                                <h4 className="text-xs font-bold text-slate-800 leading-none">Ahsan Habib</h4>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                                <button type="button" className="hover:text-blue-600 p-0.5"><FaEdit size={11} /></button>
                                <button type="button" className="hover:text-red-500 p-0.5"><FaTrash size={11} /></button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 pl-0.5 font-medium">This is an amazing startup idea! The market needs this.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default IdeyaDetailsPage;
