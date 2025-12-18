import { Briefcase, TrendingUp } from "lucide-react";

const Marquee = ({ items }) => {
  return (
    <section className="bg-slate-950 border-t border-b border-white/5 py-12 overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-[200%] animate-scroll">
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item.text}-${index}`}
              className="flex-shrink-0 w-72 mx-4 p-6 bg-slate-900 rounded-xl border border-white/5 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full bg-slate-800 ${item.color}`}>
                  {index % 2 === 0 ? (
                    <Briefcase size={18} />
                  ) : (
                    <TrendingUp size={18} />
                  )}
                </div>
                <p className={`font-bold text-sm ${item.color}`}>{item.text}</p>
              </div>
              <p className="text-xs text-slate-500">Placed as {item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;

