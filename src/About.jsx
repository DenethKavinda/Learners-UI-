import React, { useState, useEffect } from "react";
import Header from "./Components/Header"; // Direct path mapping matching your operational routing template
import Footer from "./Components/Footer"; // Direct path mapping matching your operational routing template
import { t } from "./translations/index"; // Direct path mapping matching your operational routing template

export default function About() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Listen to storage changes to keep state synced cleanly across views
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);

    // Scroll reveal animation engine
    const reveals = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full m-0 p-0 overflow-x-hidden">
      <style>{`
                .bg-dot-pattern {
                    background-color: #fafbfc;
                    background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                }
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-on-scroll.active {
                    opacity: 1;
                    transform: translateY(0);
                }
                html[lang="si"] body {
                    line-height: 1.65 !important;
                }
            `}</style>

      {/* Header Wrapper stretching completely edge to edge */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow w-full m-0 pt-12 pb-24 px-6 sm:px-12 lg:px-24">
        {/* Max-width panel constraints applied safely to inner data matrices */}
        <div className="w-full mx-auto space-y-24">
          {/* Intro Section */}
          <section className="grid lg:grid-cols-12 gap-12 items-center reveal-on-scroll w-full">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-indigo-600 border border-slate-200 shadow-sm tracking-wide uppercase transform hover:scale-105 transition-transform duration-300">
                {translate("about.page_badge")}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {translate("about.page_title_part1")}{" "}
                <span className="text-indigo-600">
                  {translate("about.page_title_part2")}
                </span>
              </h1>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                {translate("about.page_desc")}
              </p>

              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  {translate("about.section_why")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 h-auto min-h-[140px]">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="text-indigo-500">✨</span>{" "}
                      {translate("about.card1_title")}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                      {translate("about.card1_desc")}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 h-auto min-h-[140px]">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="text-emerald-500">📈</span>{" "}
                      {translate("about.card2_title")}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                      {translate("about.card2_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative group w-full">
              <div className="absolute inset-0 bg-indigo-600/5 rounded-3xl blur-xl group-hover:bg-indigo-600/10 transition-all duration-500"></div>
              <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/60 relative transform group-hover:scale-[1.01] transition-all duration-500 ease-out w-full">
                <div className="w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt="Driving school training"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Methodology Section */}
          <section className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-12 shadow-md shadow-slate-100/60 grid lg:grid-cols-12 gap-8 items-center reveal-on-scroll hover:shadow-xl transition-all duration-500 w-full">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {translate("about.video_title")}
              </h2>
              <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                {translate("about.video_desc")}
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <span>▶</span> {translate("about.video_badge")}
              </div>
            </div>
            <div className="lg:col-span-7 w-full">
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative shadow-inner group">
                <iframe
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://www.youtube.com/embed/oskiEydAaok?si=YWiL2vHnMHNelp0e"
                  title="Learnerce Training Methodology"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          {/* HQ Location Section */}
          <section className="grid lg:grid-cols-12 gap-8 items-center border-t border-slate-200/60 pt-16 reveal-on-scroll w-full">
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {translate("about.map_title")}
              </h2>
              <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                {translate("about.map_desc")}
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1.5 inline-block text-left p-5 bg-white rounded-2xl border border-slate-100 shadow-inner w-full max-w-sm">
                <p className="text-slate-900 font-bold flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600"></span>{" "}
                  {translate("about.map_label")}
                </p>
                <p className="pl-3.5 notranslate text-slate-700 font-medium">
                  No 15, Udugampola Road, Naiwala
                </p>
                <p className="pt-1 pl-3.5 text-slate-400 font-medium italic">
                  {translate("about.map_hint")}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 w-full">
              <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-lg h-[380px] sm:h-[450px] overflow-hidden relative group w-full">
                <iframe
                  className="w-full h-full rounded-2xl border-0 transform transition-all duration-500 group-hover:scale-[1.005]"
                  src="https://maps.google.com/maps?q=Naiwala%20Udugampola&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Wrapper stretching completely edge to edge */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
