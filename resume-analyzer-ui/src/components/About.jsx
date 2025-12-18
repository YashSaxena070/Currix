const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-slate-950 px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 border border-white transform rotate-45" />
            </div>
            <span className="text-lg font-bold text-white">Currix</span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed">
            AI-powered resume builder helping candidates land their dream jobs
            with optimized, ATS-friendly resumes.
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-1 text-xs">
          <div className="flex gap-4 mb-2">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p>© {new Date().getFullYear()} Currix Inc. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default About;

