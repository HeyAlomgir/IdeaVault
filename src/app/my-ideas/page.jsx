import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export const metadata = {
    title: "My Dashboard | IdeaVault",
};

const MyIdeaPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    // console.log(user);

    const res = await fetch(`http://localhost:5000/idya/user/${user?.id}`)
    const idyas = await res.json();
    console.log(idyas);
    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
            <h1 className="text-2xl font-black text-slate-900 mb-2">My Pitched Ideas</h1>
            <p className="text-sm text-gray-500">Manage and update your published concepts.</p>

                        {/* 🎯 শিক্ষকদের পছন্দের ৩-কলাম রেসপনসিভ ড্যাশবোর্ড কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {idyas && idyas.map(ida => (
                    <div 
                        key={ida._id} 
                        className="border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl p-5 flex flex-col justify-between relative max-w-sm h-full group"
                    >
                        
                        {/* 🛠️ ১. কার্ডের ওপরের কোণায় থাকা প্রফেশনাল Edit এবং Delete বাটন অ্যাকশন গ্রুপ */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                            <a 
                                href={`/ideas/edit/${ida._id}`} 
                                className="px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-gray-300 bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                            >
                                Edit
                            </a>
                            <form action={async () => {
                                "use server";
                                await fetch(`http://localhost:5000/idya/${ida._id}`, { method: "DELETE" });
                                const { revalidatePath } = require("next/cache");
                                revalidatePath("/my-ideas");
                            }} className="inline">
                                <button 
                                    type="submit"
                                    className="px-2.5 py-1 text-[11px] font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm focus:outline-none"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>

                        {/* 📸 ২. ডাইনামিক ইমেজ কন্টেইনার (Next.js Whitelist ঝামেলা এড়াতে img ট্যাগ ব্যবহার করা হয়েছে) */}
                        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-850 border border-gray-100/50 dark:border-slate-800">
                            <img 
                                src={ida.imageUrl || "https://unsplash.com"} 
                                alt={ida.ideaTitle || "Startup Pitch"} 
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                        </div>

                        {/* 📄 ৩. কন্টেন্ট এরিয়া */}
                        <div className="pt-4 flex-grow space-y-2">
                            <span className="inline-block text-[9px] font-black uppercase text-blue-600 bg-blue-50 dark:bg-slate-800 dark:text-blue-400 px-2 py-0.5 rounded">
                                {ida.category || "Tech"}
                            </span>
                            
                            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-1">
                                {ida.ideaTitle}
                            </h3>
                            
                            <p className="text-xs text-gray-500 dark:text-gray-450 font-medium line-clamp-2 leading-relaxed">
                                {ida.shortDescription}
                            </p>
                        </div>

                        {/* 🔗 ৪. নিচে থাকা ফুল-উইডথ ভিউ ডিটেইলস অ্যাকশন বাটন */}
                        <div className="pt-4 mt-3 border-t border-gray-50/50 dark:border-slate-800/60">
                            <a 
                                href={`/ideas/${ida._id}`}
                                className="w-full h-9 flex items-center justify-center font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs transition-colors shadow-sm shadow-blue-500/10 text-center"
                            >
                                View Details
                            </a>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};
 
export default MyIdeaPage;