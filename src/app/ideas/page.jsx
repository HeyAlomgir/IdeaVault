import IdyaCard from "@/components/IdyaCard";

export const metadata = {
    title: "Explore Ideas | IdeaVault",
};

const IdeaPage = async() => {
    const res = await fetch(`http://localhost:5000/idya`);
    const idyas = await res.json();
    // console.log(idyas);
    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
            <h1 className="text-2xl font-black text-slate-900 mb-2">All Startup Ideas</h1>
            <p className="text-sm text-gray-500">Discover and search across all categories.</p>
            {/* এখানে সার্চ এবং ফিল্টারের কাজ পরে আসবে */}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {idyas.length === 0 ? (
                    <p className="text-gray-400 font-medium text-sm md:col-span-3 text-center py-12">
                        No startup ideas found in the vault yet.
                    </p>
                ) : (
                    idyas.map((idya) => (
                        <IdyaCard key={idya._id} idya={idya} />
                    ))
                )}
            </div>

        </div>
    );
};

export default IdeaPage;