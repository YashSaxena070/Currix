import React from "react";

const CopyrightFooter = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2025 Currix. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightFooter;
