import { Link } from "react-router-dom";

const Showcase = () => {
  return (
    <section id="showcase" className="w-full bg-slate-950 py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Designs
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose from our collection of ATS-optimized templates designed to
            highlight your strengths.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Resume 1 */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/406/persistent-resource/vienna-resume-templates.jpg?v=1656070334"
                alt="Resume Template 1"
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                The Professional
              </h3>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              >
                Use Template
              </Link>
            </div>
          </div>
          {/* Resume 2 */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 hover:border-blue-500/50 transition-all duration-300 mt-0 md:-mt-8">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg"
                alt="Resume Template 2"
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                The Minimalist
              </h3>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              >
                Use Template
              </Link>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
              Popular
            </div>
          </div>
          {/* Resume 3 */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/389/persistent-resource/new-york-resume-templates.jpg?v=1651656959"
                alt="Resume Template 3"
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                The Creative
              </h3>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              >
                Use Template
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            View all templates <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;

