import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "../../redux/userSlice";
import { resumeTemplates } from "../../utils/data";
import { Lock } from "lucide-react";

const templatesDetails = [
  {
    id: 1,
    name: "Developer Focused",
    badge: "Most Popular",
    description:
      "Clean, ATS-friendly layout optimized for software engineers and developers.",
    highlights: ["Tech stack first", "Project impact bullets", "GitHub ready"],
  },
  {
    id: 2,
    name: "Product & Management",
    badge: "Premium",
    description:
      "Showcases ownership, outcomes, and cross‑functional collaboration for PMs and leads.",
    highlights: ["Outcome driven", "Roadmap ownership", "Stakeholder impact"],
  },
  {
    id: 3,
    name: "Student / Fresher",
    badge: "Starter",
    description:
      "Turns academics, projects, and internships into a compelling early‑career story.",
    highlights: ["Academics first", "Projects spotlight", "Simple & clear"],
  },
  {
    id: 4,
    name: "Executive",
    badge: "Premium",
    description:
      "Sophisticated layout for senior roles, emphasizing leadership and strategic impact.",
    highlights: ["Leadership focus", "Clean typography", "Executive summary"],
  },
  {
    id: 5,
    name: "Minimalist",
    badge: "Premium",
    description:
      "Less is more. A distraction-free design that lets your experience speak for itself.",
    highlights: ["Whitespace heavy", "Modern font", "Content focused"],
  },
  {
    id: 6,
    name: "Tech Lead",
    badge: "Premium",
    description:
      "Designed for technical leaders to showcase both coding expertise and team management.",
    highlights: ["Tech stack grid", "Team size metrics", "Architecture focus"],
  },
  {
    id: 7,
    name: "Designer",
    badge: "Premium",
    description:
      "A creative yet professional layout perfect for UI/UX designers and artists.",
    highlights: ["Visual hierarchy", "Portfolio links", "Creative flair"],
  },
  {
    id: 8,
    name: "Startup",
    badge: "Premium",
    description:
      "Versatile and energetic design suitable for dynamic startup environments.",
    highlights: ["Impact driven", "Versatile sections", "Bold headers"],
  },
];


const Templates = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // Merge static details with data.js templates
  const allTemplates = resumeTemplates.map(t => {
    const details = templatesDetails.find(d => d.id === parseInt(t.id));
    return { ...t, ...details };
  });

  const isLocked = (templateId) => {
    if (templateId === "01") return false;
    return user?.subscriptionPlan !== "premium";
  };

  const handleTemplateClick = (templateId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isLocked(templateId)) {
      navigate("/pricing");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
    <div 
      className="min-h-screen relative text-white px-4 sm:px-6 lg:px-8 pt-28 pb-10"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-2">
            Templates
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Choose a resume template
          </h1>
          {isAuthenticated && user?.subscriptionPlan === "premium" ? (
            <p className="text-sm text-gray-300 max-w-2xl">
              You&apos;re a Premium member! All templates are unlocked and ready for you.
            </p>
          ) : (
            <p className="text-sm text-gray-300 max-w-2xl">
              Explore our professional templates. Upgrade to <span className="text-blue-400 font-semibold">Premium</span> to unlock exclusive designs.
            </p>
          )}
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTemplates.map((tpl) => {
            const locked = isLocked(tpl.id);
            return (
              <div
                key={tpl.id}
                className={`rounded-2xl border ${locked ? 'border-white/10 bg-black/60' : 'border-blue-500/30 bg-blue-900/10'} p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all hover:border-blue-500/50`}
              >
                <div>
                  <div className="relative aspect-[210/297] mb-4 rounded-xl overflow-hidden group-hover:shadow-lg transition-all bg-slate-800">
                    <img 
                      src={tpl.thumbnailImg} 
                      alt={tpl.name} 
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      {locked ? (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 backdrop-blur-sm">
                          <Lock size={10} /> Premium
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                          {tpl.badge || "Free"}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold">{tpl.name}</h2>
                  </div>
                  <p className="text-xs text-gray-300 mb-3 line-clamp-2">
                    {tpl.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
                    {tpl.highlights?.map((h) => (
                      <li key={h} className="flex items-start gap-1.5">
                        <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${locked ? 'bg-gray-600' : 'bg-blue-400'}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => handleTemplateClick(tpl.id)}
                  className={`mt-2 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all ${
                    locked 
                      ? "bg-slate-800 hover:bg-slate-700 text-white border border-white/10" 
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                  }`}
                >
                  {locked ? "Upgrade to Unlock" : "Use this template"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Templates;


