export const metadata = {
    title: "Explore Ideas | IdeaVault",
};

const IdeaPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
            <h1 className="text-2xl font-black text-slate-900 mb-2">All Startup Ideas</h1>
            <p className="text-sm text-gray-500">Discover and search across all categories.</p>
            {/* এখানে সার্চ এবং ফিল্টারের কাজ পরে আসবে */}
        </div>
    );
};

export default IdeaPage;