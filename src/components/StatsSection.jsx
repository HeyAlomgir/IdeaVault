
const StatsSection = () => {
  const stats = [
    { number: "1,200+", label: "Ideas Pitched" },
    { number: "4,500+", label: "Active Builders" },
    { number: "180+", label: "Validated Concepts" },
    { number: "$2.5M+", label: "Estimated Budgets" },
  ];

  return (
    <section className="w-full py-12 bg-gray-50/50 rounded-3xl border border-gray-100 my-8">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Our Impact</h3>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 tracking-tight">IdeaVault by the Numbers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((state, i) => (
            <div key={i} className="flex flex-col gap-1 p-4 bg-white rounded-2xl shadow-sm border border-gray-100/50">
              <span className="text-3xl md:text-4xl font-black text-blue-600 tracking-tight">{state.number}</span>
              <span className="text-xs md:text-sm font-semibold text-slate-500">{state.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
