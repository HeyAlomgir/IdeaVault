export const metadata = {
    title: "My Dashboard | IdeaVault",
};

const MyIdeaPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 bg-white min-h-[60vh]">
            <h1 className="text-2xl font-black text-slate-900 mb-2">My Pitched Ideas</h1>
            <p className="text-sm text-gray-500">Manage and update your published concepts.</p>
        </div>
    );
};

export default MyIdeaPage;