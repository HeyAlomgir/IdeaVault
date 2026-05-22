import { FaLightbulb } from "react-icons/fa";

const FaqSection = () => {
  const faqs = [
    { q: "What is IdeaVault?", a: "IdeaVault is a collaborative platform where tech creators share, explore, and collectively validate early-stage startup concepts before development." },
    { q: "Can I edit or delete my ideas later?", a: "Yes, fully. From your 'My Ideas' private dashboard, you can open an update modal to modify details or delete the pitch permanently." },
    { q: "How do I secure my ideas?", a: "The community helps refine your concepts. If you need confidential validation, look out for our upcoming private bookmark features." },
  ];

  return (
    <section className="container mx-auto rounded-2xl shadow-2xl py-12 bg-white my-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Got Questions?</h3>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100/80">
              <h4 className="text-sm md:text-base font-bold text-slate-800 mb-2"> <FaLightbulb className="text-amber-500"/> {faq.q}</h4>
              <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
