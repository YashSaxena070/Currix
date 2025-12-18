import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI Resume Analyzer
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Build a resume that <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              wins interviews
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            Our AI analyzes your profile against job descriptions to create
            perfectly tailored resumes. Stop guessing, start getting hired.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
            >
              Build My Resume
            </Link>

            <Link
              to="/templates"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors backdrop-blur-sm"
            >
              View Samples
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" /> ATS Friendly
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" /> AI Powered
            </span>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <motion.div 
            initial={{ rotateY: -5, rotateX: 5 }}
            animate={{ rotateY: 0, rotateX: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="relative bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Scanning Effect */}
            <motion.div 
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 z-20"
            />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                  JD
                </div>
                <div>
                  <div className="h-4 w-32 bg-slate-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 w-24 bg-slate-800 rounded animate-pulse delay-75"></div>
                </div>
              </div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1"
              >
                <CheckCircle size={12} />
                Score: 92/100
              </motion.div>
            </div>

            {/* Simulated Content */}
            <div className="space-y-4 relative z-10">
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-800 rounded animate-pulse delay-100"></div>
                <div className="h-3 w-5/6 bg-slate-800 rounded animate-pulse delay-150"></div>
                <div className="h-3 w-4/6 bg-slate-800 rounded animate-pulse delay-200"></div>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['React', 'Node.js', 'Python', 'AWS'].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="h-20 bg-slate-800/50 rounded-lg border border-white/5 p-3">
                  <div className="h-2 w-12 bg-slate-700 rounded mb-2"></div>
                  <div className="h-10 w-full bg-slate-700/30 rounded"></div>
                </div>
                <div className="h-20 bg-slate-800/50 rounded-lg border border-white/5 p-3">
                  <div className="h-2 w-12 bg-slate-700 rounded mb-2"></div>
                  <div className="h-10 w-full bg-slate-700/30 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-4 bg-slate-800 border border-white/10 p-2 rounded-lg shadow-xl z-30"
            >
              <div className="flex items-center gap-2 text-xs text-blue-300">
                <CheckCircle size={14} />
                <span>ATS Optimized</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

