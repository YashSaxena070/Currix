import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Target, Award, ArrowRight, Linkedin, Twitter, Github } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 mb-6"
          >
            Empowering Careers with AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Currix is more than just a resume builder. It's your intelligent career companion, designed to decode the hiring process and put your best foot forward.
          </motion.p>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How Currix Helps You Win</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Bridging the gap between talent and opportunity with advanced AI technology.</p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: Beat the ATS (Text Left, Image Right) */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Beat the ATS Algorithms</h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Our AI ensures your resume is formatted, structured, and keyword-optimized to pass these digital gatekeepers with flying colors.
                </p>
                <ul className="space-y-4">
                  {['Keyword Optimization', 'Smart Formatting', 'Parsing Friendly'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <CheckCircle size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative group"
              >
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data Analysis" 
                  className="relative rounded-2xl shadow-2xl border border-slate-800 w-full object-cover h-[400px]"
                />
              </motion.div>
            </div>

            {/* Feature 2: Professional Impact (Image Left, Text Right) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-8 text-purple-400">
                  <Award size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Professional Impact</h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  We analyze thousands of successful resumes to understand what works. Our templates are designed to highlight your achievements and quantify your impact, making you stand out to recruiters instantly.
                </p>
                <ul className="space-y-4">
                  {['Modern Designs', 'Impact-Driven Content', 'Recruiter Approved'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <CheckCircle size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative group"
              >
                <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                  alt="Professional Office" 
                  className="relative rounded-2xl shadow-2xl border border-slate-800 w-full object-cover h-[400px]"
                />
              </motion.div>
            </div>

            {/* Feature 3: Instant Feedback (Text Left, Image Right) */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 text-emerald-400">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Instant AI Feedback</h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  Get real-time scoring and actionable suggestions. No more guessing if your resume is "good enough." We tell you exactly what to improve to increase your interview chances significantly.
                </p>
                <ul className="space-y-4">
                  {['Real-time Scoring', 'Actionable Tips', 'Grammar Checks'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative group"
              >
                <div className="absolute inset-0 bg-emerald-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Performance Feedback" 
                  className="relative rounded-2xl shadow-2xl border border-slate-800 w-full object-cover h-[400px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative w-48 h-48 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-pulse opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Sparsh Saxena" 
                className="w-full h-full rounded-full object-cover border-4 border-slate-800 relative z-10"
              />
            </div>

            <div className="text-center md:text-left relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Meet the Founder</h2>
              <h3 className="text-xl text-blue-400 font-medium mb-4">Sparsh Saxena</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                "I built Currix with a simple mission: to democratize career success. I realized that many talented individuals were being overlooked simply because their resumes didn't speak the language of modern hiring systems. Currix is the bridge between your potential and your next big opportunity."
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors text-slate-400">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition-colors text-slate-400">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white transition-colors text-slate-400">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of professionals who have already landed their dream jobs with Currix.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            Build Your Resume Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
