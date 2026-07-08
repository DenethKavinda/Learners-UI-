import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { t } from "./translations/index";

export default function Packages() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);
    return () => window.removeEventListener("storage", handleLangChange);
  }, []);

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full m-0 p-0 overflow-x-hidden">
      <style>{`
                .bg-dot-pattern {
                    background-color: #fafbfc;
                    background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                }
                html[lang="si"] body {
                    line-height: 1.5 !important;
                }
            `}</style>

      <div className="w-full px-6 sm:px-12 lg:px-24 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow w-full m-0 pt-10 pb-16 px-6 sm:px-12 lg:px-24">
        {/* Max-width container prevents the cards from blowing up too large on ultra-widescreens */}
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-white text-indigo-600 border border-slate-200 shadow-sm tracking-wide uppercase">
              {translate("packages.page_badge")}
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {translate("packages.page_title_part1")}{" "}
              <span className="text-indigo-600">
                {translate("packages.page_title_part2")}
              </span>
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-normal max-w-xl mx-auto">
              {translate("packages.page_desc")}
            </p>
          </div>

          {/* Packages Stack */}
          <div className="space-y-6">
            {/* PACKAGE 1: PREMIUM DUAL-VEHICLE COMBO */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group w-full">
              {/* Left Side: Adjusted from 40% down to 32% to make it less bulky */}
              <div className="md:w-[32%] bg-slate-50/40 p-5 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col justify-between relative">
                <div className="absolute top-3 right-3 bg-emerald-500 text-white font-extrabold text-[9px] uppercase tracking-wider py-0.5 px-2 rounded-md shadow-sm z-20">
                  {translate("packages.badge_popular")}
                </div>
                <div className="space-y-3">
                  <div className="w-full aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/40 shadow-inner z-10">
                    <img
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600"
                      alt="Premium Combo"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {translate("packages.p1_title")}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {translate("packages.p1_subtitle")}
                    </p>
                  </div>
                </div>
                <div className="pt-4 space-y-2.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-slate-400 text-xs font-bold notranslate">
                      LKR
                    </span>
                    <span className="text-2xl font-black text-slate-900 tracking-tight notranslate">
                      45,500
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold ml-1">
                      {translate("packages.price_suffix")}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="block w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm active:scale-98"
                  >
                    {translate("packages.btn_register")}
                  </a>
                </div>
              </div>

              {/* Right Side: Info Panel (Tightened Padding from p-10 to p-6) */}
              <div className="md:w-[68%] p-6 flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {translate("packages.section_arch")}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {translate("packages.p1_desc")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      🚗
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                        {translate("packages.metrics_label")}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-500">
                        {translate("packages.p1_metrics_val")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      🛣️
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                        {translate("packages.class_label")}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-500">
                        {translate("packages.p1_class_val")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {translate("packages.p1_perk")}
                </div>
              </div>
            </div>

            {/* PACKAGE 2: STANDARD LIGHT VEHICLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group w-full">
              {/* Left Side */}
              <div className="md:w-[32%] bg-slate-50/40 p-5 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col justify-between relative">
                <div className="absolute top-3 right-3 bg-indigo-600 text-white font-extrabold text-[9px] uppercase tracking-wider py-0.5 px-2 rounded-md shadow-sm z-20">
                  {translate("packages.badge_value")}
                </div>
                <div className="space-y-3">
                  <div className="w-full aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/40 shadow-inner z-10">
                    <img
                      src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600"
                      alt="Standard Car"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {translate("packages.p2_title")}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {translate("packages.p2_subtitle")}
                    </p>
                  </div>
                </div>
                <div className="pt-4 space-y-2.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-slate-400 text-xs font-bold notranslate">
                      LKR
                    </span>
                    <span className="text-2xl font-black text-slate-900 tracking-tight notranslate">
                      32,000
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold ml-1">
                      {translate("packages.price_suffix")}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="block w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm active:scale-98"
                  >
                    {translate("packages.btn_register")}
                  </a>
                </div>
              </div>

              {/* Right Side */}
              <div className="md:w-[68%] p-6 flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {translate("packages.section_arch")}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {translate("packages.p2_desc")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      🚗
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                        {translate("packages.metrics_label")}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-500">
                        {translate("packages.p2_metrics_val")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      ⚙️
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                        {translate("packages.method_label")}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-500">
                        {translate("packages.p2_method_val")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {translate("packages.p2_perk")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
