import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      '"I applied to 50 jobs with my old resume and heard nothing. After using Currix to optimize keywords, I got 3 interviews in one week!"',
    name: "Alex Johnson",
    role: "Software Engineer @ Google",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote:
      '"The AI analysis is scary good. It pointed out exactly what was missing in my experience section. The templates are also super clean."',
    name: "Sarah Miller",
    role: "Product Manager @ Stripe",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote:
      '"As a fresh grad, I didn\'t know how to structure my CV. Currix guided me step by step, and I landed my first internship!"',
    name: "David Chen",
    role: "Junior Analyst @ Deloitte",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full bg-slate-900 py-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Loved by Job Seekers</h2>
          <p className="text-slate-400">
            Join thousands of professionals who found their dream jobs with
            Currix.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-slate-950 p-8 rounded-2xl border border-white/5 relative"
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {item.quote}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

